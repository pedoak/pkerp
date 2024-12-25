-- Drop unused tables
DROP TABLE IF EXISTS custos_operacionais CASCADE;
DROP TABLE IF EXISTS fornecedores_insumos_precos CASCADE;

-- Drop unused columns from precos_insumos
ALTER TABLE precos_insumos 
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS updated_at;

-- Clean up indexes
DROP INDEX IF EXISTS idx_fornecedores_insumos_precos_fornecedor;
DROP INDEX IF EXISTS idx_fornecedores_insumos_precos_insumo;

-- Optimize existing indexes
DROP INDEX IF EXISTS idx_precos_insumos_count;
CREATE INDEX IF NOT EXISTS idx_precos_insumos_efficient 
ON precos_insumos(fornecedor_id, insumo_id, data_atualizacao);