import { useState, useCallback } from 'react';
import { Receita } from '../../../types/receita';
import { PrecoInsumo } from '../../../types/precoInsumo';
import { ResultadoCustoProducao } from '../../../types/producaoCustos';
import { receitaCustoService } from '../../../services/receitaCustoService';
import { QuantityInput } from './QuantityInput';
import { CustoTables } from './CustoTables';
import { ProducaoCustos } from './ProducaoCustos';
import { CustosSummary } from './CustosSummary';
import { IOSToggle } from '../../common/IOSToggle';

interface CustoCalculatorProps {
  receita: Receita;
  precosInsumos: PrecoInsumo[];
  maquina: {
    capacidade_producao: number;
    potencia_instalada: number;
    potencia_producao: number;
    tempo_aquecimento: number;
  };
}

export const CustoCalculator = ({ 
  receita, 
  precosInsumos, 
  maquina 
}: CustoCalculatorProps) => {
  const [quantidade, setQuantidade] = useState<number>(100);
  const [custosProducao, setCustosProducao] = useState<ResultadoCustoProducao | null>(null);
  const [incluirImpostos, setIncluirImpostos] = useState(true);

  const custosMateriasPrimas = receitaCustoService.calcularCustoReceita(
    receita, 
    precosInsumos,
    quantidade
  );

  const handleCustoProducaoCalculado = useCallback((resultado: ResultadoCustoProducao) => {
    setCustosProducao(resultado);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Custos de Produção</h3>
            <IOSToggle
              checked={incluirImpostos}
              onChange={setIncluirImpostos}
              label="Incluir Impostos"
            />
          </div>
        </div>

        <QuantityInput quantidade={quantidade} onChange={setQuantidade} />
      </div>

      <CustoTables 
        items={custosMateriasPrimas.custoPorInsumo}
        incluirImpostos={incluirImpostos}
      />

      <ProducaoCustos
        quantidade={quantidade}
        maquina={maquina}
        onCustoCalculado={handleCustoProducaoCalculado}
      />

      {custosProducao && (
        <CustosSummary 
          quantidade={quantidade}
          custoTotal={custosMateriasPrimas.custoTotal + custosProducao.custoTotal}
          custoTotalSemImpostos={custosMateriasPrimas.custoPorInsumo.reduce(
            (sum, item) => sum + item.custoSemImpostos, 0
          ) + custosProducao.custoTotal}
          detalhamento={{
            materiaPrima: {
              total: custosMateriasPrimas.custoTotal,
              totalSemImpostos: custosMateriasPrimas.custoPorInsumo.reduce(
                (sum, item) => sum + item.custoSemImpostos, 0
              ),
              porKg: custosMateriasPrimas.custoTotal / quantidade,
              porKgSemImpostos: custosMateriasPrimas.custoPorInsumo.reduce(
                (sum, item) => sum + item.custoSemImpostos, 0
              ) / quantidade
            },
            producao: {
              energia: custosProducao.custoEnergia,
              maoDeObra: custosProducao.custoMaoDeObra,
              manutencao: custosProducao.custoManutencao,
              outros: custosProducao.outrosCustos,
              total: custosProducao.custoTotal,
              porKg: custosProducao.custoKg
            }
          }}
          incluirImpostos={incluirImpostos}
        />
      )}
    </div>
  );
};