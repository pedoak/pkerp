import { Receita } from '../types/receita';
import { PrecoInsumo } from '../types/precoInsumo';
import { calcularPrecoBase, calcularPrecoFinal } from '../utils/impostos';

export interface CustoReceita {
  custoTotal: number;
  custoPorInsumo: {
    insumoId: string;
    nome: string;
    tipo: string;
    grade: string;
    percentual: number;
    precoBase: number;
    precoFinal: number;
    quantidade: number;
    custoTotal: number;
    custoSemImpostos: number;
    ipi: number;
    icms: number;
  }[];
}

export const receitaCustoService = {
  calcularCustoReceita(
    receita: Receita,
    precosInsumos: PrecoInsumo[],
    quantidade: number
  ): CustoReceita {
    const custoPorInsumo = receita.itens.map(item => {
      const precoInsumo = precosInsumos.find(p => p.insumo_id === item.insumoId);
      
      if (!precoInsumo?.insumo) {
        return {
          insumoId: item.insumoId,
          nome: 'Preço não encontrado',
          tipo: '-',
          grade: '-',
          percentual: item.percentual,
          precoBase: 0,
          precoFinal: 0,
          quantidade: (quantidade * item.percentual) / 100,
          custoTotal: 0,
          custoSemImpostos: 0,
          ipi: 0,
          icms: 0
        };
      }

      const precoBase = calcularPrecoBase(
        precoInsumo.preco_base,
        precoInsumo.fornecedor?.frete_incluso || false,
        precoInsumo.fornecedor?.custo_frete || 0
      );

      const precoFinal = calcularPrecoFinal(
        precoInsumo.preco_base,
        precoInsumo.ipi || 0,
        precoInsumo.icms || 0,
        precoInsumo.fornecedor?.frete_incluso || false,
        precoInsumo.fornecedor?.custo_frete || 0
      );

      const quantidadeInsumo = (quantidade * item.percentual) / 100;
      const custoTotal = precoFinal * quantidadeInsumo;
      const custoSemImpostos = precoBase * quantidadeInsumo;

      return {
        insumoId: item.insumoId,
        nome: precoInsumo.insumo.nome,
        tipo: precoInsumo.insumo.tipo || '-',
        grade: precoInsumo.insumo.grade || '-',
        percentual: item.percentual,
        precoBase,
        precoFinal,
        quantidade: quantidadeInsumo,
        custoTotal,
        custoSemImpostos,
        ipi: precoInsumo.ipi || 0,
        icms: precoInsumo.icms || 0
      };
    });

    const custoTotal = custoPorInsumo.reduce((total, item) => total + item.custoTotal, 0);

    return {
      custoTotal,
      custoPorInsumo
    };
  }
};