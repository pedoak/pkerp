-- Add indexes to improve performance of supplier information queries
CREATE INDEX IF NOT EXISTS idx_precos_insumos_data_atualizacao 
ON precos_insumos(fornecedor_id, data_atualizacao DESC);

CREATE INDEX IF NOT EXISTS idx_precos_insumos_count 
ON precos_insumos(fornecedor_id);