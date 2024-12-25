/*
  # Add energy-related columns to machines table

  1. Changes
    - Add tempo_aquecimento column for heating time
    - Add potencia_producao column for production power
    - Set default values and constraints
    - Update existing records
*/

-- Add new columns with constraints
ALTER TABLE maquinas
ADD COLUMN IF NOT EXISTS tempo_aquecimento numeric NOT NULL DEFAULT 1.0
  CHECK (tempo_aquecimento > 0),
ADD COLUMN IF NOT EXISTS potencia_producao numeric
  GENERATED ALWAYS AS (potencia_instalada * 0.4) STORED;

-- Update existing records to have default heating time
UPDATE maquinas 
SET tempo_aquecimento = 1.0 
WHERE tempo_aquecimento IS NULL;

-- Add index for commonly queried columns
CREATE INDEX IF NOT EXISTS idx_maquinas_status 
ON maquinas(status) 
WHERE status = 'ATIVA';