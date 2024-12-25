import { CustoOperacional } from '../types/fornecedor';

// Constantes para impostos e margens
export const IMPOSTOS = {
  PIS: 1.65, // %
  COFINS: 7.6, // %
  ICMS: 18, // % (pode variar por estado)
  IPI: 5, // % (pode variar por produto)
  IR: 15, // %
  CSLL: 9, // %
} as const;

// Função para calcular custos de produção
export const calcularCustosProducao = (
  custoMP: number, // Custo da matéria-prima por kg
  custoOperacional: CustoOperacional,
  perdaProcesso: number = 3 // % de perda padrão
): number => {
  // Custos diretos
  const custoEnergia = custoOperacional.energia_kwh * custoOperacional.consumo_medio_kwh;
  const custoMaoDeObra = custoOperacional.mao_de_obra_hora / custoOperacional.producao_media_kg_hora;
  
  // Adiciona perda do processo
  const fatorPerda = 1 + (perdaProcesso / 100);
  const custoMPComPerda = custoMP * fatorPerda;

  // Soma todos os custos
  return custoMPComPerda + custoEnergia + custoMaoDeObra + custoOperacional.custos_adicionais_kg;
};

// Função para calcular preço de venda considerando Lucro Real
export const calcularPrecoVenda = (
  custoProducao: number,
  margemLucro: number, // % desejada
  icmsEstado: number = IMPOSTOS.ICMS,
  ipi: number = IMPOSTOS.IPI
): {
  precoVenda: number;
  detalhamento: {
    custoProducao: number;
    margemLucro: number;
    impostos: {
      pis: number;
      cofins: number;
      icms: number;
      ipi: number;
      ir: number;
      csll: number;
    };
    creditosImpostos: {
      pis: number;
      cofins: number;
      icms: number;
      ipi: number;
    };
    precoFinal: number;
  }
} => {
  // Cálculo dos impostos sobre vendas
  const baseCalculo = custoProducao / (1 - (margemLucro / 100));
  
  // Cálculo dos impostos
  const pis = baseCalculo * (IMPOSTOS.PIS / 100);
  const cofins = baseCalculo * (IMPOSTOS.COFINS / 100);
  const icms = baseCalculo * (icmsEstado / 100);
  const ipiValor = baseCalculo * (ipi / 100);
  
  // Cálculo dos créditos tributários (Lucro Real)
  const creditoPis = custoProducao * (IMPOSTOS.PIS / 100);
  const creditoCofins = custoProducao * (IMPOSTOS.COFINS / 100);
  const creditoIcms = custoProducao * (icmsEstado / 100);
  const creditoIpi = custoProducao * (ipi / 100);

  // Impostos sobre o lucro
  const lucroOperacional = baseCalculo - custoProducao;
  const ir = lucroOperacional * (IMPOSTOS.IR / 100);
  const csll = lucroOperacional * (IMPOSTOS.CSLL / 100);

  // Preço final considerando impostos e créditos
  const precoVenda = baseCalculo + ipiValor;

  return {
    precoVenda,
    detalhamento: {
      custoProducao,
      margemLucro: lucroOperacional,
      impostos: {
        pis,
        cofins,
        icms,
        ipi: ipiValor,
        ir,
        csll
      },
      creditosImpostos: {
        pis: creditoPis,
        cofins: creditoCofins,
        icms: creditoIcms,
        ipi: creditoIpi
      },
      precoFinal: precoVenda
    }
  };
};