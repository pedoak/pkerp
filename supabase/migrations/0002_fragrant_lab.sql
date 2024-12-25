/*
  # Add PPM fields to insumos table

  1. Changes
    - Add deslizante_ppm column (numeric)
    - Add auxiliar_fluxo_ppm column (numeric) 
    - Add antibloqueio_ppm column (numeric)

  2. Notes
    - All new fields are nullable since they're only required when their respective flags are set to 'SIM'
    - Using numeric type to store precise PPM values
*/

DO $$ 
BEGIN
  -- Add deslizante_ppm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'insumos' AND column_name = 'deslizante_ppm'
  ) THEN
    ALTER TABLE insumos ADD COLUMN deslizante_ppm numeric;
  END IF;

  -- Add auxiliar_fluxo_ppm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'insumos' AND column_name = 'auxiliar_fluxo_ppm'
  ) THEN
    ALTER TABLE insumos ADD COLUMN auxiliar_fluxo_ppm numeric;
  END IF;

  -- Add antibloqueio_ppm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'insumos' AND column_name = 'antibloqueio_ppm'
  ) THEN
    ALTER TABLE insumos ADD COLUMN antibloqueio_ppm numeric;
  END IF;
END $$;