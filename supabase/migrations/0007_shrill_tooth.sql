/*
  # Create First Admin User
  
  1. Updates
    - Set the first user as admin in user_profiles table
    - Approve the admin user automatically
  
  2. Security
    - Only runs once for initial setup
    - Uses DO block for safety
*/

DO $$ 
BEGIN
  -- Update the first user to be an admin and approved
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
END $$;