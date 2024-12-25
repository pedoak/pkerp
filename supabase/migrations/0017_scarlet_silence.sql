/*
  # Set Admin Privileges
  
  1. Changes
    - Set admin privileges for admin@admin.com
    - Create profile if missing
    - Refresh admin users view
*/

-- First check if user profile exists and create if needed
DO $$ 
DECLARE
  admin_user_id uuid;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'admin@admin.com';

  -- Create profile if it doesn't exist
  IF admin_user_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM user_profiles WHERE user_id = admin_user_id
  ) THEN
    INSERT INTO user_profiles (user_id, is_approved, is_admin, created_at, updated_at)
    VALUES (admin_user_id, true, true, NOW(), NOW());
  END IF;

  -- Update existing profile if it exists
  UPDATE user_profiles
  SET 
    is_admin = true,
    is_approved = true,
    updated_at = NOW()
  WHERE user_id = admin_user_id;
END $$;

-- Refresh the admin users view
REFRESH MATERIALIZED VIEW admin_users;