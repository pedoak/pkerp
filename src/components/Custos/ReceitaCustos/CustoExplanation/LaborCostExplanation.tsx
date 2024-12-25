import { Users, Info } from 'lucide-react';
import { formatCurrency } from '../../../../utils/format';

interface LaborCostExplanationProps {
  horasProducao: number;
  custoDiaria: number;
  numeroOperadores: number;
  custoTotal: number;
}

export const LaborCostExplanation = ({ 
  horasProducao,
  custoDiaria,
  numeroOperadores,
  custoTotal
}: LaborCostExplanationProps) => {
  const diasProducao = Math.ceil(horasProducao / 12); // 12 horas por diária

  return (
    <div className="bg-green-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-green-600 mr-2" />
        <h4 className="text-lg font-semibold text-green-900">Como é calculado o custo de mão de obra?</h4>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-green-800">
            O custo de mão de obra é calculado considerando diárias de 12 horas de trabalho
          </p>
        </div>

        <div className="bg-white rounded p-4 space-y-3">
          <h5 className="font-medium text-gray-900">Tempo de Trabalho</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Horas de produção: {horasProducao.toFixed(2)} horas</li>
            <li>• Dias necessários: {diasProducao} dias (12 horas/dia)</li>
          </ul>
        </div>

        <div className="bg-white rounded p-4 space-y-3">
          <h5 className="font-medium text-gray-900">Custo por Operador</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Custo por diária (12h): {formatCurrency(custoDiaria)}</li>
            <li>• Número de operadores: {numeroOperadores}</li>
          </ul>
        </div>

        <div className="bg-white rounded p-4 space-y-3">
          <h5 className="font-medium text-gray-900">Cálculo Final</h5>
          <div className="space-y-2 text-sm">
            <p>• Dias × Diária × Número de operadores</p>
            <p>• {diasProducao} dias × {formatCurrency(custoDiaria)} × {numeroOperadores} operadores</p>
            <p className="text-lg font-semibold text-green-600 mt-2">
              Total: {formatCurrency(custoTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};