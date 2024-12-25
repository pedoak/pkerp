import { Zap, Info } from 'lucide-react';
import { formatCurrency } from '../../../../utils/format';

interface EnergyCostExplanationProps {
  detalhamento: {
    horasProducao: number;
    consumoProducao: number;
    custoKwh: number;
    potenciaProducao: number;
  };
}

export const EnergyCostExplanation = ({ detalhamento }: EnergyCostExplanationProps) => {
  const custoTotal = detalhamento.consumoProducao * detalhamento.custoKwh;

  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Zap className="w-5 h-5 text-blue-600 mr-2" />
        <h4 className="text-lg font-semibold text-blue-900">Como é calculado o custo de energia?</h4>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            O custo de energia é calculado com base no consumo durante a produção
          </p>
        </div>

        <div className="bg-white rounded p-4 space-y-3">
          <h5 className="font-medium text-gray-900">Fase de Produção</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Potência: {detalhamento.potenciaProducao} kW</li>
            <li>• Tempo de produção: {detalhamento.horasProducao.toFixed(2)} horas</li>
            <li>• Consumo total: {detalhamento.consumoProducao.toFixed(2)} kWh</li>
          </ul>
        </div>

        <div className="bg-white rounded p-4 space-y-3">
          <h5 className="font-medium text-gray-900">Custo Total de Energia</h5>
          <div className="space-y-2 text-sm">
            <p>• Consumo total: {detalhamento.consumoProducao.toFixed(2)} kWh</p>
            <p>• Custo por kWh: {formatCurrency(detalhamento.custoKwh)}</p>
            <p className="text-lg font-semibold text-blue-600 mt-2">
              Total: {formatCurrency(custoTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};