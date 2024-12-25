/*
  # Set Initial Admin User
  
  1. Changes
    - Atualiza o primeiro usuário registrado para ser administrador
    - Atualiza a view materializada de administradores
*/

-- Atualiza o primeiro usuário para ser admin
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

-- Atualiza a view materializada
REFRESH MATERIALIZED VIEW admin_users;