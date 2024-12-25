/*
  # Add ICMS column to precos_insumos table

  1. Changes
    - Add ICMS column to precos_insumos table with default value and constraint
    - Update existing records to have a default ICMS value
*/

-- Add ICMS column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'precos_insumos' AND column_name = 'icms'
  ) THEN
    ALTER TABLE precos_insumos 
    ADD COLUMN icms numeric NOT NULL DEFAULT 12
    CHECK (icms >= 0 AND icms <= 100);
  END IF;
END $$;

-- Update existing records to have the default ICMS value if they don't have one
UPDATE precos_insumos 
SET icms = 12 
WHERE icms IS NULL;