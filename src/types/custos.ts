export interface CustosFixos {
  id?: string;
  user_id?: string;
  aluguel: number;
  seguro: number;
  manutencao_preventiva: number;
  outros_custos_fixos: number;
}

export interface CustosVariaveis {
  id?: string;
  user_id?: string;
  embalagem_kg: number;
  manutencao_kg: number;
  outros_custos_kg: number;
}

export interface CustosDepreciacao {
  id?: string;
  user_id?: string;
  equipamento_id: string;
  valor_inicial: number;
  valor_residual: number;
  vida_util_anos: number;
}

export interface CustosOverhead {
  id?: string;
  user_id?: string;
  administrativo_mes: number;
  comercial_mes: number;
  outros_overhead_mes: number;
}

export interface CustoTotal {
  custoMP: number;
  custoProcesso: number;
  custoFixo: number;
  custoVariavel: number;
  custoDepreciacao: number;
  custoOverhead: number;
  custoTotal: number;
}