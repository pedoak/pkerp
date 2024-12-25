import { CustoProducao, ResultadoCustoProducao } from '../../../../types/producaoCustos';
import { EnergyCostExplanation } from '../CustoExplanation/EnergyCostExplanation';
import { LaborCostExplanation } from '../CustoExplanation/LaborCostExplanation';

interface ProductionCostExplanationProps {
  resultado: ResultadoCustoProducao;
  custos: CustoProducao;
}

export const ProductionCostExplanation = ({ 
  resultado,
  custos
}: ProductionCostExplanationProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <EnergyCostExplanation 
        detalhamento={resultado.detalhamentoEnergia}
      />
      <LaborCostExplanation 
        horasProducao={resultado.detalhamentoEnergia.horasProducao}
        custoDiaria={custos.custoDiaria}
        numeroOperadores={custos.numeroOperadores}
        custoTotal={resultado.custoMaoDeObra}
      />
    </div>
  );
};