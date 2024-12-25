import { 
  CustosFixos, 
  CustosVariaveis, 
  CustosDepreciacao, 
  CustosOverhead,
  CustoTotal 
} from '../types/custos';

export const calcularCustoTotal = (
  producaoMensalKg: number,
  custoMP: number,
  custosFixos: CustosFixos,
  custosVariaveis: CustosVariaveis,
  custosDepreciacao: CustosDepreciacao[],
  custosOverhead: CustosOverhead
): CustoTotal => {
  // Calcula custo fixo por kg
  const custoFixoTotal = 
    custosFixos.aluguel + 
    custosFixos.seguro + 
    custosFixos.manutencao_preventiva + 
    custosFixos.outros_custos_fixos;
  const custoFixoPorKg = custoFixoTotal / producaoMensalKg;

  // Calcula custo variável por kg
  const custoVariavelPorKg = 
    custosVariaveis.embalagem_kg + 
    custosVariaveis.manutencao_kg + 
    custosVariaveis.outros_custos_kg;

  // Calcula depreciação mensal por kg
  const custoDepreciacaoMensal = custosDepreciacao.reduce((total, item) => {
    const depreciacaoAnual = (item.valor_inicial - item.valor_residual) / item.vida_util_anos;
    return total + (depreciacaoAnual / 12);
  }, 0);
  const custoDepreciacaoPorKg = custoDepreciacaoMensal / producaoMensalKg;

  // Calcula overhead por kg
  const custoOverheadMensal = 
    custosOverhead.administrativo_mes + 
    custosOverhead.comercial_mes + 
    custosOverhead.outros_overhead_mes;
  const custoOverheadPorKg = custoOverheadMensal / producaoMensalKg;

  // Calcula custo total por kg
  const custoTotal = 
    custoMP + 
    custoFixoPorKg + 
    custoVariavelPorKg + 
    custoDepreciacaoPorKg + 
    custoOverheadPorKg;

  return {
    custoMP,
    custoProcesso: custoFixoPorKg + custoVariavelPorKg,
    custoFixo: custoFixoPorKg,
    custoVariavel: custoVariavelPorKg,
    custoDepreciacao: custoDepreciacaoPorKg,
    custoOverhead: custoOverheadPorKg,
    custoTotal
  };
};