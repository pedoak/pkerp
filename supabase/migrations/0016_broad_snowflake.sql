/*
  # Set Admin User
  
  1. Changes
    - Set admin@admin.com as administrator
    - Ensure user has proper permissions
*/

-- Set admin@admin.com as administrator
UPDATE user_profiles
SET 
  is_admin = true,
  is_approved = true
WHERE user_id IN (
  SELECT id 
  FROM auth.users 
  WHERE email = 'admin@admin.com'
);

-- Refresh admin users view to reflect changes
REFRESH MATERIALIZED VIEW admin_users;