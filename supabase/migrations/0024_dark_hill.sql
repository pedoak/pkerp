-- Create machines table
CREATE TABLE maquinas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  nome text NOT NULL,
  modelo text NOT NULL,
  fabricante text NOT NULL,
  ano_fabricacao integer NOT NULL,
  capacidade_producao numeric NOT NULL,
  potencia_instalada numeric NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE maquinas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own machines"
  ON maquinas FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own machines"
  ON maquinas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own machines"
  ON maquinas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own machines"
  ON maquinas FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_maquinas_user_id ON maquinas(user_id);