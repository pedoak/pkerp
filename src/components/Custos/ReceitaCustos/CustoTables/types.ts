export interface CustoTableItem {
  insumoId: string;
  nome: string;
  tipo: string;
  grade: string;
  percentual: number;
  quantidade: number;
  precoBase: number;
  precoFinal: number;
  custoTotal: number;
  custoSemImpostos: number;
  ipi: number;
  icms: number;
}