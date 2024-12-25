/*
  # Fix schema issues and add missing columns

  1. Changes
    - Fix column names in fornecedores table
    - Add missing columns for custos_operacionais
    - Add constraints and default values
  
  2. Security
    - Maintain existing RLS policies
*/

-- Fix fornecedores table
ALTER TABLE fornecedores
RENAME COLUMN prazo_medio TO prazo_medio_dias;

-- Fix custos_operacionais table
ALTER TABLE custos_operacionais
ADD COLUMN IF NOT EXISTS energia_kwh numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS consumo_medio_kwh numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS mao_de_obra_hora numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS producao_media_kg_hora numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS custos_adicionais_kg numeric NOT NULL DEFAULT 0;

-- Add constraints
ALTER TABLE fornecedores
ADD CONSTRAINT fornecedores_prazo_medio_dias_check CHECK (prazo_medio_dias >= 0),
ADD CONSTRAINT fornecedores_custo_frete_check CHECK (custo_frete >= 0);

ALTER TABLE custos_operacionais
ADD CONSTRAINT custos_operacionais_energia_kwh_check CHECK (energia_kwh >= 0),
ADD CONSTRAINT custos_operacionais_consumo_medio_kwh_check CHECK (consumo_medio_kwh >= 0),
ADD CONSTRAINT custos_operacionais_mao_de_obra_hora_check CHECK (mao_de_obra_hora >= 0),
ADD CONSTRAINT custos_operacionais_producao_media_kg_hora_check CHECK (producao_media_kg_hora >= 0),
ADD CONSTRAINT custos_operacionais_custos_adicionais_kg_check CHECK (custos_adicionais_kg >= 0);