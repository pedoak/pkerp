export interface Insumo {
  id?: string;
  nome: string;
  grade: string;
  tipo: string;
  origem: string;
  densidade: number;
  indiceFluidez: number;
  comonomero: string;
  catalisador: string;
  deslizante: string;
  deslizantePPM?: number;
  auxiliarFluxo: string;
  auxiliarFluxoPPM?: number;
  antibloqueio: string;
  antibloqueioPPM?: number;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}