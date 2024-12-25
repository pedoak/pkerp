export type TipoMaquina = 
  | 'EXTRUSORA'
  | 'CHILLER'
  | 'TORRE_RESFRIAMENTO'
  | 'GRAVIMETRICO'
  | 'RECUPERADOR_REFILE'
  | 'OUTRO';

export interface Maquina {
  id?: string;
  nome: string;
  modelo: string;
  fabricante: string;
  ano_fabricacao: number;
  tipo: TipoMaquina;
  potencia_instalada: number;
  potencia_producao?: number; // Only for extrusoras
  capacidade_producao?: number; // Only for extrusoras
  tempo_aquecimento?: number; // Only for extrusoras
  status: 'ATIVA' | 'MANUTENCAO' | 'INATIVA';
  user_id?: string;
}