import { CustoProducao, ResultadoCustoProducao, DetalhamentoMaquina } from '../types/producaoCustos';
import { Maquina } from '../types/maquina';

interface MaquinaConfig {
  id?: string;
  nome: string;
  tipo: string;
  capacidade_producao: number;
  potencia_instalada: number;
  potencia_producao: number;
  tempo_aquecimento: number;
}

const getNumberOrZero = (value: number | undefined | null): number => {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  return value;
};

export const calcularCustoProducao = (
  quantidade: number,
  maquinaPrincipal: MaquinaConfig,
  maquinasAuxiliares: Maquina[],
  custoKwh: number,
  custos: CustoProducao
): ResultadoCustoProducao => {
  // Garante que os valores são números válidos
  const qtd = getNumberOrZero(quantidade);
  const capProd = getNumberOrZero(maquinaPrincipal.capacidade_producao);
  const potInst = getNumberOrZero(maquinaPrincipal.potencia_instalada);
  const potTrab = getNumberOrZero(maquinaPrincipal.potencia_producao);
  const tempAquec = getNumberOrZero(maquinaPrincipal.tempo_aquecimento);
  
  // Calcula tempo de produção em horas baseado na capacidade da extrusora
  const horasProducao = capProd > 0 ? qtd / capProd : 0;
  
  // Cálculo da máquina principal
  const consumoAquecimentoPrincipal = potInst * tempAquec;
  const consumoProducaoPrincipal = potTrab * horasProducao;
  const consumoPrincipal = consumoAquecimentoPrincipal + consumoProducaoPrincipal;

  // Detalhamento da máquina principal
  const detalhamentoPrincipal: DetalhamentoMaquina = {
    nome: maquinaPrincipal.nome || 'Máquina Principal',
    tipo: maquinaPrincipal.tipo || 'Não especificado',
    potenciaInstalada: potInst,
    potenciaTrabalho: potTrab,
    consumoTotal: consumoPrincipal,
    tempoAquecimento: tempAquec,
    consumoAquecimento: consumoAquecimentoPrincipal
  };
  
  // Cálculo e detalhamento das máquinas auxiliares
  const detalhamentoAuxiliares: DetalhamentoMaquina[] = [];
  const consumoAuxiliares = (maquinasAuxiliares || [])
    .filter(maq => maq?.status === 'ATIVA')
    .reduce((total, maq) => {
      const potInst = getNumberOrZero(maq.potencia_instalada);
      const potTrab = getNumberOrZero(maq.potencia_producao);
      const potenciaTrabalho = potTrab || (potInst * 0.4);
      const consumoMaquina = potenciaTrabalho * horasProducao;
      
      if (maq.nome && consumoMaquina > 0) {
        detalhamentoAuxiliares.push({
          nome: maq.nome || 'Máquina Auxiliar',
          tipo: maq.tipo || 'Não especificado',
          potenciaInstalada: potInst,
          potenciaTrabalho: potenciaTrabalho,
          consumoTotal: consumoMaquina
        });
      }
      
      return total + consumoMaquina;
    }, 0);

  // Consumo total de todas as máquinas
  const consumoTotal = consumoPrincipal + consumoAuxiliares;
  
  // Custo total de energia
  const custoTotalEnergia = consumoTotal * getNumberOrZero(custoKwh);
  const custoEnergiaKg = qtd > 0 ? custoTotalEnergia / qtd : 0;

  // Calcula dias necessários (baseado em 12h/dia)
  const diasProducao = Math.ceil(horasProducao / 12);
  const custoMaoDeObra = diasProducao * getNumberOrZero(custos.custoDiaria) * getNumberOrZero(custos.numeroOperadores);

  // Custos variáveis
  const custoManutencao = qtd * getNumberOrZero(custos.custoManutencaoKg);
  const outrosCustos = qtd * getNumberOrZero(custos.outrosCustosKg);
  
  // Custo total
  const custoTotal = custoTotalEnergia + custoMaoDeObra + custoManutencao + outrosCustos;
  
  return {
    custoEnergia: custoTotalEnergia,
    custoMaoDeObra,
    custoManutencao,
    outrosCustos,
    custoTotal,
    custoKg: qtd > 0 ? custoTotal / qtd : 0,
    detalhamentoEnergia: {
      horasProducao,
      custoKwh: getNumberOrZero(custoKwh),
      consumoPrincipal,
      consumoAuxiliares,
      consumoTotal,
      custoTotalEnergia,
      custoEnergiaKg,
      maquinaPrincipal: detalhamentoPrincipal,
      maquinasAuxiliares: detalhamentoAuxiliares
    }
  };
};