export interface Fornecedor {
  id?: string;
  nome: string;
  estado: string;
  prazo_medio_dias: number;
  frete_incluso: boolean;
  custo_frete?: number;
  user_id?: string;
  total_insumos?: number;
  ultima_atualizacao?: string;
}

export interface PrecoInsumo {
  id?: string;
  fornecedor_id: string;
  insumo_id: string;
  preco_base: number;
  ipi: number;
  icms: number;
  data_atualizacao: Date;
}

export interface CustoOperacional {
  id?: string;
  user_id?: string;
  energia_kwh: number;
  consumo_medio_kwh: number;
  mao_de_obra_hora: number;
  producao_media_kg_hora: number;
  custos_adicionais_kg: number;
}