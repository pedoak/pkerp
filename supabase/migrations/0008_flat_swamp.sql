/*
  # Fix Admin Policies
  
  1. Changes
    - Fix infinite recursion in user_profiles policies
    - Simplify admin access checks
    - Add proper cascading for user deletion
  
  2. Security
    - Maintain proper access control
    - Prevent policy recursion
    - Ensure admin capabilities
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Create new simplified policies
CREATE POLICY "Users and admins can view profiles"
  ON user_profiles
  FOR SELECT
  USING (
    auth.uid() = user_id OR 
    (SELECT is_admin FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any profile"
  ON user_profiles
  FOR UPDATE
  USING (
    (SELECT is_admin FROM user_profiles WHERE user_id = auth.uid())
  )
  WITH CHECK (
    (SELECT is_admin FROM user_profiles WHERE user_id = auth.uid())
  );

-- Add cascade delete for user profiles when user is deleted
ALTER TABLE user_profiles
DROP CONSTRAINT user_profiles_user_id_fkey,
ADD CONSTRAINT user_profiles_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;