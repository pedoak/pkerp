/*
  # Final Fix for User Profile Policies
  
  1. Changes
    - Create materialized view for admin lookup
    - Simplify policies using materialized view
    - Remove all recursive policy checks
    
  2. Security
    - Maintain proper access control
    - Eliminate recursion completely
    - Optimize performance
*/

-- Drop existing policies
DROP POLICY IF EXISTS "user_profiles_select_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_update_policy" ON user_profiles;

-- Create materialized view for admin lookup
DROP MATERIALIZED VIEW IF EXISTS admin_lookup;
CREATE MATERIALIZED VIEW admin_lookup AS
SELECT user_id
FROM user_profiles
WHERE is_admin = true;

-- Create index on materialized view
CREATE UNIQUE INDEX admin_lookup_user_id_idx ON admin_lookup (user_id);

-- Create function to refresh admin lookup
CREATE OR REPLACE FUNCTION refresh_admin_lookup()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY admin_lookup;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh admin lookup
DROP TRIGGER IF EXISTS refresh_admin_lookup_trigger ON user_profiles;
CREATE TRIGGER refresh_admin_lookup_trigger
AFTER INSERT OR UPDATE OR DELETE ON user_profiles
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_admin_lookup();

-- Create new non-recursive policies using materialized view
CREATE POLICY "user_profiles_select_policy"
ON user_profiles FOR SELECT TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM admin_lookup WHERE user_id = auth.uid())
);

CREATE POLICY "user_profiles_update_policy"
ON user_profiles FOR UPDATE TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM admin_lookup WHERE user_id = auth.uid())
)
WITH CHECK (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM admin_lookup WHERE user_id = auth.uid())
);

-- Initial refresh of materialized view
REFRESH MATERIALIZED VIEW admin_lookup;