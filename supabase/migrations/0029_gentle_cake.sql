/*
  # Add supplier pricing tables

  1. New Tables
    - `fornecedores_insumos_precos` - Links suppliers with products and their prices
      - `id` (uuid, primary key)
      - `fornecedor_id` (uuid, references fornecedores)
      - `insumo_id` (uuid, references insumos)
      - `preco_base` (numeric, base price without taxes)
      - `ipi` (numeric, IPI tax percentage)
      - `data_atualizacao` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create supplier product prices table
CREATE TABLE fornecedores_insumos_precos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fornecedor_id uuid REFERENCES fornecedores ON DELETE CASCADE NOT NULL,
  insumo_id uuid REFERENCES insumos ON DELETE CASCADE NOT NULL,
  preco_base numeric NOT NULL CHECK (preco_base >= 0),
  ipi numeric NOT NULL CHECK (ipi >= 0),
  data_atualizacao timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(fornecedor_id, insumo_id)
);

-- Enable RLS
ALTER TABLE fornecedores_insumos_precos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view prices from their suppliers"
  ON fornecedores_insumos_precos FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create prices for their suppliers"
  ON fornecedores_insumos_precos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update prices from their suppliers"
  ON fornecedores_insumos_precos FOR UPDATE
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
  ON fornecedores_insumos_precos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fornecedores
      WHERE fornecedores.id = fornecedor_id
      AND fornecedores.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_fornecedores_insumos_precos_fornecedor ON fornecedores_insumos_precos(fornecedor_id);
CREATE INDEX idx_fornecedores_insumos_precos_insumo ON fornecedores_insumos_precos(insumo_id);