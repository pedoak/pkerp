export interface CustoProducao {
  custoDiaria: number;
  numeroOperadores: number;
  custoManutencaoKg: number;
  outrosCustosKg: number;
  custoKwh: number;
}

export interface DetalhamentoMaquina {
  nome: string;
  tipo: string;
  potenciaInstalada: number;
  potenciaTrabalho: number;
  consumoTotal: number;
  tempoAquecimento?: number;
  consumoAquecimento?: number;
}

export interface ResultadoCustoProducao {
  custoEnergia: number;
  custoMaoDeObra: number;
  custoManutencao: number;
  outrosCustos: number;
  custoTotal: number;
  custoKg: number;
  detalhamentoEnergia: {
    horasProducao: number;
    custoKwh: number;
    consumoPrincipal: number;
    consumoAuxiliares: number;
    consumoTotal: number;
    custoTotalEnergia: number;
    custoEnergiaKg: number;
    maquinaPrincipal: DetalhamentoMaquina;
    maquinasAuxiliares: DetalhamentoMaquina[];
  };
}