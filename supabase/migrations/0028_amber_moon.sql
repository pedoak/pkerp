/*
  # Pricing Structure Update

  1. New Tables
    - `custos_fixos` - Fixed costs like rent, insurance, etc.
    - `custos_variaveis` - Variable costs like packaging, maintenance, etc.
    - `custos_depreciacao` - Depreciation costs for equipment
    - `custos_overhead` - Overhead costs like administrative expenses

  2. Changes
    - Update custos_operacionais table with new fields
    - Add constraints and relationships
*/

-- Create custos_fixos table
CREATE TABLE custos_fixos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  aluguel numeric NOT NULL DEFAULT 0,
  seguro numeric NOT NULL DEFAULT 0,
  manutencao_preventiva numeric NOT NULL DEFAULT 0,
  outros_custos_fixos numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT custos_fixos_positive_values CHECK (
    aluguel >= 0 AND
    seguro >= 0 AND
    manutencao_preventiva >= 0 AND
    outros_custos_fixos >= 0
  )
);

-- Create custos_variaveis table
CREATE TABLE custos_variaveis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  embalagem_kg numeric NOT NULL DEFAULT 0,
  manutencao_kg numeric NOT NULL DEFAULT 0,
  outros_custos_kg numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT custos_variaveis_positive_values CHECK (
    embalagem_kg >= 0 AND
    manutencao_kg >= 0 AND
    outros_custos_kg >= 0
  )
);

-- Create custos_depreciacao table
CREATE TABLE custos_depreciacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  equipamento_id uuid REFERENCES maquinas ON DELETE CASCADE,
  valor_inicial numeric NOT NULL,
  valor_residual numeric NOT NULL DEFAULT 0,
  vida_util_anos integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT custos_depreciacao_positive_values CHECK (
    valor_inicial > 0 AND
    valor_residual >= 0 AND
    vida_util_anos > 0 AND
    valor_residual <= valor_inicial
  )
);

-- Create custos_overhead table
CREATE TABLE custos_overhead (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  administrativo_mes numeric NOT NULL DEFAULT 0,
  comercial_mes numeric NOT NULL DEFAULT 0,
  outros_overhead_mes numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT custos_overhead_positive_values CHECK (
    administrativo_mes >= 0 AND
    comercial_mes >= 0 AND
    outros_overhead_mes >= 0
  )
);

-- Enable RLS for all new tables
ALTER TABLE custos_fixos ENABLE ROW LEVEL SECURITY;
ALTER TABLE custos_variaveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE custos_depreciacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE custos_overhead ENABLE ROW LEVEL SECURITY;

-- Create policies for custos_fixos
CREATE POLICY "Users can manage their own fixed costs"
  ON custos_fixos
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for custos_variaveis
CREATE POLICY "Users can manage their own variable costs"
  ON custos_variaveis
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for custos_depreciacao
CREATE POLICY "Users can manage their own depreciation costs"
  ON custos_depreciacao
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for custos_overhead
CREATE POLICY "Users can manage their own overhead costs"
  ON custos_overhead
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_custos_fixos_user_id ON custos_fixos(user_id);
CREATE INDEX idx_custos_variaveis_user_id ON custos_variaveis(user_id);
CREATE INDEX idx_custos_depreciacao_user_id ON custos_depreciacao(user_id);
CREATE INDEX idx_custos_overhead_user_id ON custos_overhead(user_id);