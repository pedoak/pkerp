-- Adiciona o tipo enum
CREATE TYPE tipo_maquina AS ENUM (
  'EXTRUSORA',
  'CHILLER',
  'TORRE_RESFRIAMENTO',
  'GRAVIMETRICO',
  'RECUPERADOR_REFILE',
  'OUTRO'
);

-- Adiciona a coluna tipo na tabela maquinas
ALTER TABLE maquinas 
ADD COLUMN tipo tipo_maquina NOT NULL DEFAULT 'EXTRUSORA';

-- Atualiza as máquinas existentes para terem tipo EXTRUSORA
UPDATE maquinas SET tipo = 'EXTRUSORA' WHERE tipo IS NULL;
