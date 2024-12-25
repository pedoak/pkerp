/*
  # Create insumos table

  1. New Tables
    - `insumos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `nome` (text)
      - `grade` (text)
      - `tipo` (text)
      - `origem` (text)
      - `densidade` (numeric)
      - `indice_fluidez` (numeric)
      - `comonomero` (text)
      - `catalisador` (text)
      - `deslizante` (text)
      - `auxiliar_fluxo` (text)
      - `antibloqueio` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `insumos` table
    - Add policies for CRUD operations
*/

CREATE TABLE insumos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  nome text NOT NULL,
  grade text,
  tipo text,
  origem text,
  densidade numeric,
  indice_fluidez numeric,
  comonomero text,
  catalisador text,
  deslizante text,
  auxiliar_fluxo text,
  antibloqueio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE insumos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own insumos"
  ON insumos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insumos"
  ON insumos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insumos"
  ON insumos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insumos"
  ON insumos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);