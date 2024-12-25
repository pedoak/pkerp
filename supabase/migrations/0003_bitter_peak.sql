/*
  # Recipe Management Schema

  1. New Tables
    - `receitas` (recipes)
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `nome` (text, recipe name)
      - `descricao` (text, optional description)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `receitas_itens` (recipe items)
      - `id` (uuid, primary key)
      - `receita_id` (uuid, references receitas)
      - `insumo_id` (uuid, references insumos)
      - `percentual` (numeric, percentage)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own recipes
    - Add policies for recipe items linked to user's recipes

  3. Foreign Keys
    - Recipe items are automatically deleted when a recipe is deleted (CASCADE)
*/

-- Create recipes table
CREATE TABLE receitas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  nome text NOT NULL,
  descricao text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recipe items table
CREATE TABLE receitas_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receita_id uuid REFERENCES receitas ON DELETE CASCADE NOT NULL,
  insumo_id uuid REFERENCES insumos NOT NULL,
  percentual numeric NOT NULL CHECK (percentual >= 0 AND percentual <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE receitas_itens ENABLE ROW LEVEL SECURITY;

-- Policies for recipes
CREATE POLICY "Users can view their own recipes"
  ON receitas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recipes"
  ON receitas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes"
  ON receitas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes"
  ON receitas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for recipe items
CREATE POLICY "Users can view items from their recipes"
  ON receitas_itens
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM receitas
      WHERE receitas.id = receita_id
      AND receitas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create items for their recipes"
  ON receitas_itens
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM receitas
      WHERE receitas.id = receita_id
      AND receitas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items from their recipes"
  ON receitas_itens
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM receitas
      WHERE receitas.id = receita_id
      AND receitas.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM receitas
      WHERE receitas.id = receita_id
      AND receitas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their recipes"
  ON receitas_itens
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM receitas
      WHERE receitas.id = receita_id
      AND receitas.user_id = auth.uid()
    )
  );