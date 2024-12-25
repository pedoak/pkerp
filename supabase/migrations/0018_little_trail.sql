/*
  # Transfer User Data
  
  1. Changes
    - Transfer all insumos from pedro@teste.com to admin@admin.com
    - Transfer all receitas from pedro@teste.com to admin@admin.com
    - Update related records
*/

DO $$ 
DECLARE
  source_user_id uuid;
  target_user_id uuid;
BEGIN
  -- Get source and target user IDs
  SELECT id INTO source_user_id
  FROM auth.users
  WHERE email = 'pedro@teste.com';
  
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'admin@admin.com';

  -- Only proceed if both users exist
  IF source_user_id IS NOT NULL AND target_user_id IS NOT NULL THEN
    -- Update insumos ownership
    UPDATE insumos
    SET user_id = target_user_id
    WHERE user_id = source_user_id;

    -- Update receitas ownership
    UPDATE receitas
    SET user_id = target_user_id
    WHERE user_id = source_user_id;
    
    -- Delete source user profile (this will cascade to auth.users due to our foreign key)
    DELETE FROM user_profiles
    WHERE user_id = source_user_id;
  END IF;
END $$;