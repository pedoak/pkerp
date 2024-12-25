import { Maquina } from '../../types/maquina';

interface EnergyCalculationParams {
  quantidade: number;
  maquina: Maquina;
  custoKwh: number;
}

export const calcularCustoEnergia = ({
  quantidade,
  maquina,
  custoKwh
}: EnergyCalculationParams) => {
  // Tempo de produção em horas
  const horasProducao = quantidade / maquina.capacidade_producao;
  
  // Consumo durante aquecimento (potência total)
  const consumoAquecimento = maquina.potencia_instalada * maquina.tempo_aquecimento;
  
  // Consumo durante produção (40% da potência)
  const consumoProducao = maquina.potencia_producao * horasProducao;
  
  // Consumo total em kWh
  const consumoTotal = consumoAquecimento + consumoProducao;
  
  return {
    custoTotal: consumoTotal * custoKwh,
    detalhamento: {
      horasProducao,
      consumoAquecimento,
      consumoProducao,
      consumoTotal,
      custoKwh
    }
  };
};