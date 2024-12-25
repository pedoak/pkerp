export interface PrecoInsumo {
  id?: string;
  fornecedor_id: string;
  insumo_id: string;
  preco_base: number;
  ipi: number;
  icms: number;
  data_atualizacao?: Date;
  fornecedor?: {
    id: string;
    nome: string;
    estado: string;
    frete_incluso: boolean;
    custo_frete?: number;
  };
  insumo?: {
    id: string;
    nome: string;
    grade: string;
    tipo: string;
  };
}