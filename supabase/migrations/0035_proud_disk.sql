-- Remove unused columns
ALTER TABLE precos_insumos
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS updated_at;

-- Optimize indexes
DROP INDEX IF EXISTS idx_precos_insumos_count;
CREATE INDEX IF NOT EXISTS idx_precos_insumos_efficient 
ON precos_insumos(fornecedor_id, insumo_id, data_atualizacao);

-- Add foreign key constraints if missing
ALTER TABLE precos_insumos
DROP CONSTRAINT IF EXISTS precos_insumos_fornecedor_id_fkey,
ADD CONSTRAINT precos_insumos_fornecedor_id_fkey
  FOREIGN KEY (fornecedor_id)
  REFERENCES fornecedores(id)
  ON DELETE CASCADE;

ALTER TABLE precos_insumos
DROP CONSTRAINT IF EXISTS precos_insumos_insumo_id_fkey,
ADD CONSTRAINT precos_insumos_insumo_id_fkey
  FOREIGN KEY (insumo_id) 
  REFERENCES insumos(id)
  ON DELETE CASCADE;