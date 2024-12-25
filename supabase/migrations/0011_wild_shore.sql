/*
  # Set Initial Admin User
  
  1. Changes
    - Creates a function to safely set admin status
    - Updates the first user to be an admin
    - Refreshes the admin users view
*/

-- Create a function to set admin status
CREATE OR REPLACE FUNCTION set_initial_admin()
RETURNS void AS $$
BEGIN
  -- Update the first user to be an admin
  UPDATE user_profiles
  SET 
    is_admin = true,
    is_approved = true
  WHERE id = (
    SELECT id 
    FROM user_profiles 
    ORDER BY created_at ASC 
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the function
SELECT set_initial_admin();

-- Refresh the admin users view
REFRESH MATERIALIZED VIEW admin_users;