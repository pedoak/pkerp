import { Maquina } from '../types/maquina';

interface EnergyCalculationParams {
  quantidade: number;
  maquina: Required<Pick<Maquina, 'capacidade_producao' | 'potencia_instalada' | 'potencia_producao' | 'tempo_aquecimento'>>;
  custoKwh: number;
}

export const calcularCustoEnergia = ({
  quantidade,
  maquina,
  custoKwh
}: EnergyCalculationParams) => {
  // Tempo de produção em horas
  const horasProducao = quantidade / maquina.capacidade_producao;
  
  // Consumo durante aquecimento (100% da potência instalada)
  const consumoAquecimento = maquina.potencia_instalada * maquina.tempo_aquecimento;
  
  // Consumo durante produção (usando potência de trabalho)
  const consumoProducao = maquina.potencia_producao * horasProducao;
  
  // Consumo total em kWh
  const consumoTotal = consumoAquecimento + consumoProducao;
  
  // Custo total
  const custoTotal = consumoTotal * custoKwh;

  return {
    custoTotal,
    detalhamento: {
      horasProducao,
      consumoAquecimento,
      consumoProducao,
      consumoTotal,
      custoKwh
    }
  };
};