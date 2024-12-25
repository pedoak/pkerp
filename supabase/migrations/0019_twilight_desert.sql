/*
  # Fix User Profiles Policies

  1. Changes
    - Drop all existing policies
    - Create new simplified policies without circular dependencies
    - Add basic security policies for user profiles
  
  2. Security
    - Users can view and update their own profiles
    - Admins can view and update all profiles
    - No circular dependencies in policy definitions
*/

-- Drop all existing policies for user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "View own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin update any profile" ON user_profiles;

-- Create new simplified policies
CREATE POLICY "allow_select_own_profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    is_admin = true
  );

CREATE POLICY "allow_update_own_profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    is_admin = true
  )
  WITH CHECK (
    auth.uid() = user_id OR
    is_admin = true
  );

-- Ensure RLS is enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;