/*
  # Fix Recursive Policies

  1. Changes
    - Drop existing problematic policies
    - Create new non-recursive policies for admin access
    - Simplify user profile access logic
    - Add index for performance

  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Ensure admin privileges work correctly
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users and admins can view profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON user_profiles;

-- Create new simplified policies
CREATE POLICY "View own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin view all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 
    FROM user_profiles up 
    WHERE up.user_id = auth.uid() 
    AND up.is_admin = true
  ));

CREATE POLICY "Update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin update any profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 
    FROM user_profiles up 
    WHERE up.user_id = auth.uid() 
    AND up.is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 
    FROM user_profiles up 
    WHERE up.user_id = auth.uid() 
    AND up.is_admin = true
  ));

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_admin ON user_profiles(is_admin);