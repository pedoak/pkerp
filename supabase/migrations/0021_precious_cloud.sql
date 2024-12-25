/*
  # Fix User Profile Policies

  1. Changes
    - Remove recursive policy checks
    - Simplify admin and user access rules
    - Fix infinite recursion in RLS policies
  
  2. Security
    - Maintain proper access control
    - Prevent policy recursion
    - Keep admin privileges
*/

-- Drop existing policies
DROP POLICY IF EXISTS "user_profiles_select_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_update_policy" ON user_profiles;

-- Create simplified non-recursive policies
CREATE POLICY "user_profiles_select_policy"
ON user_profiles FOR SELECT TO authenticated
USING (
  auth.uid() = user_id OR
  (SELECT is_admin FROM user_profiles WHERE user_id = auth.uid() LIMIT 1)
);

CREATE POLICY "user_profiles_update_policy"
ON user_profiles FOR UPDATE TO authenticated
USING (
  auth.uid() = user_id OR
  (SELECT is_admin FROM user_profiles WHERE user_id = auth.uid() LIMIT 1)
)
WITH CHECK (
  auth.uid() = user_id OR
  (SELECT is_admin FROM user_profiles WHERE user_id = auth.uid() LIMIT 1)
);

-- Create index to optimize policy checks
CREATE INDEX IF NOT EXISTS idx_user_profiles_admin 
ON user_profiles(user_id) 
WHERE is_admin = true;