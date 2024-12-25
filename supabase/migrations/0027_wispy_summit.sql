/*
  # Fix database structure for pricing system

  1. Changes
    - Add unique constraint to custos_operacionais to ensure one record per user
    - Add default values for numeric columns
    - Add check constraints for positive values
*/

-- Fix custos_operacionais table
DROP TABLE IF EXISTS custos_operacionais CASCADE;

CREATE TABLE custos_operacionais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  energia_kwh numeric NOT NULL DEFAULT 0,
  consumo_medio_kwh numeric NOT NULL DEFAULT 0,
  mao_de_obra_hora numeric NOT NULL DEFAULT 0,
  producao_media_kg_hora numeric NOT NULL DEFAULT 1,
  custos_adicionais_kg numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT custos_operacionais_energia_kwh_positive CHECK (energia_kwh >= 0),
  CONSTRAINT custos_operacionais_consumo_medio_kwh_positive CHECK (consumo_medio_kwh >= 0),
  CONSTRAINT custos_operacionais_mao_de_obra_hora_positive CHECK (mao_de_obra_hora >= 0),
  CONSTRAINT custos_operacionais_producao_media_kg_hora_positive CHECK (producao_media_kg_hora > 0),
  CONSTRAINT custos_operacionais_custos_adicionais_kg_positive CHECK (custos_adicionais_kg >= 0)
);

-- Enable RLS
ALTER TABLE custos_operacionais ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own operational costs"
  ON custos_operacionais FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own operational costs"
  ON custos_operacionais FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own operational costs"
  ON custos_operacionais FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own operational costs"
  ON custos_operacionais FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);