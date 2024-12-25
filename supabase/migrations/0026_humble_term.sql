/*
  # Fix database structure for pricing system

  1. Changes
    - Add unique constraint to custos_operacionais to ensure one record per user
    - Add default values for numeric columns
    - Add check constraints for positive values
*/

-- Fix custos_operacionais table
ALTER TABLE custos_operacionais
DROP CONSTRAINT IF EXISTS custos_operacionais_user_id_key;

-- Add unique constraint to ensure one record per user
ALTER TABLE custos_operacionais
ADD CONSTRAINT custos_operacionais_user_id_key UNIQUE (user_id);

-- Add check constraints for positive values
ALTER TABLE custos_operacionais
ADD CONSTRAINT custos_operacionais_energia_kwh_positive CHECK (energia_kwh >= 0),
ADD CONSTRAINT custos_operacionais_consumo_medio_kwh_positive CHECK (consumo_medio_kwh >= 0),
ADD CONSTRAINT custos_operacionais_mao_de_obra_hora_positive CHECK (mao_de_obra_hora >= 0),
ADD CONSTRAINT custos_operacionais_producao_media_kg_hora_positive CHECK (producao_media_kg_hora > 0),
ADD CONSTRAINT custos_operacionais_custos_adicionais_kg_positive CHECK (custos_adicionais_kg >= 0);

-- Add default values
ALTER TABLE custos_operacionais
ALTER COLUMN energia_kwh SET DEFAULT 0,
ALTER COLUMN consumo_medio_kwh SET DEFAULT 0,
ALTER COLUMN mao_de_obra_hora SET DEFAULT 0,
ALTER COLUMN producao_media_kg_hora SET DEFAULT 1,
ALTER COLUMN custos_adicionais_kg SET DEFAULT 0;