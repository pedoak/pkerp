/*
  # Update supplier prices table

  1. Changes
    - Add missing columns if they don't exist
    - Update or create policies
    - Add indexes for better performance

  2. Security
    - Ensure RLS is enabled
    - Update policies for proper access control
*/

-- Add new columns safely if they don't exist
DO $$ 
BEGIN
  -- Add data_atualizacao if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'precos_insumos' AND column_name = 'data_atualizacao'
  ) THEN
    ALTER TABLE precos_insumos ADD COLUMN data_atualizacao timestamptz DEFAULT now();
  END IF;

  -- Add created_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'precos_insumos' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE precos_insumos ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;

  -- Add updated_at if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'precos_insumos' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE precos_insumos ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE precos_insumos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can view prices from their suppliers" ON precos_insumos;
DROP POLICY IF EXISTS "Users can create prices for their suppliers" ON precos_insumos;
DROP POLICY IF EXISTS "Users can update prices from their suppliers" ON precos_insumos;
DROP POLICY IF EXISTS "Users can delete prices from their suppliers" ON precos_insumos;

-- Create updated policies
CREATE POLICY "Users can view prices from their suppliers"
  ON precos_insumos FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create prices for their suppliers"
  ON precos_insumos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update prices from their suppliers"
  ON precos_insumos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete prices from their suppliers"
  ON precos_insumos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

-- Create or recreate indexes for better performance
DROP INDEX IF EXISTS idx_precos_insumos_fornecedor;
DROP INDEX IF EXISTS idx_precos_insumos_insumo;

CREATE INDEX idx_precos_insumos_fornecedor ON precos_insumos(fornecedor_id);
CREATE INDEX idx_precos_insumos_insumo ON precos_insumos(insumo_id);