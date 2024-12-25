/*
  # Atualização da tabela de máquinas

  1. Alterações
    - Remove coluna tempo_aquecimento
    - Remove coluna potencia_producao gerada
    - Adiciona coluna potencia_producao como campo normal
  
  2. Dados
    - Mantém dados existentes
    - Adiciona nova coluna com valor padrão
*/

-- Remove colunas antigas
ALTER TABLE maquinas 
DROP COLUMN IF EXISTS tempo_aquecimento,
DROP COLUMN IF EXISTS potencia_producao;

-- Adiciona nova coluna
ALTER TABLE maquinas
ADD COLUMN potencia_producao numeric NOT NULL DEFAULT 0
CHECK (potencia_producao >= 0);

-- Atualiza registros existentes
UPDATE maquinas 
SET potencia_producao = potencia_instalada * 0.4 
WHERE potencia_producao = 0;