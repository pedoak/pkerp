export interface ItemReceita {
  insumoId: string;
  percentual: number;
}

export interface Receita {
  id?: string;
  nome: string;
  descricao?: string;
  itens: ItemReceita[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReceitaDetalhada extends Receita {
  densidadeMedia?: number;
  indiceFluidezMedio?: number;
}