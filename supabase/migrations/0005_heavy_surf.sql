/*
  # Admin System Setup

  1. Changes to user_profiles
    - Add is_admin column
    - Add policies for admin access
*/

-- Add admin column to user_profiles
ALTER TABLE user_profiles
ADD COLUMN is_admin boolean DEFAULT false;

-- Create admin policies
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid()
      AND is_admin = true
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid()
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid()
      AND is_admin = true
    )
  );

-- Create function to check if user is approved
CREATE OR REPLACE FUNCTION auth.check_user_approved()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = NEW.id
    AND is_approved = true
  ) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'User not approved';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to check approval on sign in
CREATE TRIGGER check_user_approved
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.check_user_approved();