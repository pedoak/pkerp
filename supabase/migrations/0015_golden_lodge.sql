/*
  # Fix User Accounts and Profiles
  
  1. Changes
    - Ensure user_profiles table is properly configured
    - Fix trigger for new user creation
    - Set default values for new accounts
*/

-- Drop and recreate the handle_new_user function with better error handling
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
    true,  -- Auto approve
    false, -- Not admin by default
    NOW(),
    NOW()
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error and continue
  RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure all existing users have profiles
INSERT INTO public.user_profiles (user_id, is_approved, created_at, updated_at)
SELECT id, true, NOW(), NOW()
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_profiles WHERE user_id = auth.users.id
);