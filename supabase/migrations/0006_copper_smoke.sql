/*
  # Add User Management System

  1. Changes
    - Add trigger for auto-creating user profiles
    - Add function to handle user registration approval
    - Add policies for admin management
*/

-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check if user is approved before sign in
CREATE OR REPLACE FUNCTION public.handle_user_signin()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = NEW.id
    AND (is_approved = true OR is_admin = true)
  ) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Conta pendente de aprovação';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to check approval status on sign in
CREATE OR REPLACE TRIGGER on_auth_user_signin
  BEFORE INSERT ON auth.sessions
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_signin();

-- Update existing policies for admin access
CREATE POLICY "Admins can view all users"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_id = auth.uid()
      AND is_admin = true
    )
  );