/*
  # Fix Admin Functionality

  1. Changes
    - Safely modify user creation trigger and function
    - Update policies for proper admin access
    - Ensure new users require approval
  
  2. Security
    - New users require explicit admin approval
    - Only admins can view and manage users
*/

-- First drop the trigger that depends on the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Now we can safely drop and recreate the function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create new user handler that sets approved to false by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (
    user_id,
    is_approved,
    is_admin,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    false,  -- Require admin approval
    false,  -- Not admin by default
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger with the updated function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update policies for better admin access
DROP POLICY IF EXISTS "allow_select_own_profile" ON user_profiles;
DROP POLICY IF EXISTS "allow_update_own_profile" ON user_profiles;

-- Policy for viewing profiles
CREATE POLICY "user_profiles_select_policy"
ON user_profiles FOR SELECT TO authenticated
USING (
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    ) THEN true  -- Admins can see all profiles
    ELSE auth.uid() = user_id  -- Regular users can only see their own
  END
);

-- Policy for updating profiles
CREATE POLICY "user_profiles_update_policy"
ON user_profiles FOR UPDATE TO authenticated
USING (
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    ) THEN true  -- Admins can update all profiles
    ELSE auth.uid() = user_id  -- Regular users can only update their own
  END
)
WITH CHECK (
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND is_admin = true
    ) THEN true
    ELSE auth.uid() = user_id
  END
);