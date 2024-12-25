/*
  # Fix Recursive Policies and Admin Management

  1. Changes
    - Drop all existing problematic policies
    - Create new non-recursive policies for admin and user access
    - Add materialized admin view for better performance
    - Simplify access control logic

  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Ensure admin privileges work correctly
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "View own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin update any profile" ON user_profiles;

-- Create materialized view for admin users
CREATE MATERIALIZED VIEW admin_users AS
SELECT user_id
FROM user_profiles
WHERE is_admin = true;

CREATE UNIQUE INDEX admin_users_user_id_idx ON admin_users (user_id);

-- Create function to refresh admin users view
CREATE OR REPLACE FUNCTION refresh_admin_users()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY admin_users;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh admin users view
CREATE TRIGGER refresh_admin_users_trigger
AFTER INSERT OR UPDATE OR DELETE ON user_profiles
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_admin_users();

-- Create new simplified policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update all profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW admin_users;