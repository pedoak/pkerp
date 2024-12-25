/*
  # Cost Analysis Tables

  1. New Tables
    - `fornecedores` - Suppliers information
    - `precos_insumos` - Product prices from suppliers
    - `custos_operacionais` - Operational costs

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create suppliers table
CREATE TABLE fornecedores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  nome text NOT NULL,
  estado text NOT NULL,
  prazo_medio integer NOT NULL,
  frete_incluso boolean DEFAULT false,
  custo_frete numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product prices table
CREATE TABLE precos_insumos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fornecedor_id uuid REFERENCES fornecedores ON DELETE CASCADE NOT NULL,
  insumo_id uuid REFERENCES insumos NOT NULL,
  preco_base numeric NOT NULL,
  ipi numeric NOT NULL,
  data_atualizacao timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create operational costs table
CREATE TABLE custos_operacionais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  energia_kwh numeric NOT NULL,
  consumo_medio_kwh numeric NOT NULL,
  mao_de_obra_hora numeric NOT NULL,
  producao_media_kg_hora numeric NOT NULL,
  custos_adicionais_kg numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE precos_insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE custos_operacionais ENABLE ROW LEVEL SECURITY;

-- Create policies for fornecedores
CREATE POLICY "Users can view their own suppliers"
  ON fornecedores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own suppliers"
  ON fornecedores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own suppliers"
  ON fornecedores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own suppliers"
  ON fornecedores FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for precos_insumos
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

-- Create policies for custos_operacionais
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

-- Create indexes for better performance
CREATE INDEX idx_fornecedores_user_id ON fornecedores(user_id);
CREATE INDEX idx_precos_insumos_fornecedor ON precos_insumos(fornecedor_id);
CREATE INDEX idx_precos_insumos_insumo ON precos_insumos(insumo_id);
CREATE INDEX idx_custos_operacionais_user_id ON custos_operacionais(user_id);