/*
  # Fix Authentication Issues
  
  1. Changes
    - Remove problematic triggers that block login
    - Simplify user approval process
    - Auto-approve new users
*/

-- Drop problematic triggers that are blocking authentication
DROP TRIGGER IF EXISTS on_auth_user_signin ON auth.sessions;
DROP TRIGGER IF EXISTS check_user_approved ON auth.users;

-- Drop problematic functions
DROP FUNCTION IF EXISTS public.handle_user_signin();
DROP FUNCTION IF EXISTS auth.check_user_approved();

-- Modify handle_new_user function to auto-approve users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, is_approved)
  VALUES (NEW.id, true);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure existing users are approved
UPDATE user_profiles
SET is_approved = true
WHERE is_approved = false;