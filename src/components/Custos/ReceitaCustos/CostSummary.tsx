import { DollarSign, Package, Cog } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface CostSummaryProps {
  quantidade: number;
  custoTotal: number;
  detalhamento: {
    materiaPrima: number;
    producao: number;
    custoKg: number;
  };
}

export const CostSummary = ({ quantidade, custoTotal, detalhamento }: CostSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <DollarSign className="w-6 h-6 text-green-600 mr-2" />
        <h3 className="text-xl font-semibold">Resumo de Custos</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Package className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Matéria-Prima</span>
          </div>
          <p className="text-xl font-bold text-blue-600">
            R$ {formatCurrency(detalhamento.materiaPrima)}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Cog className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Produção</span>
          </div>
          <p className="text-xl font-bold text-blue-600">
            R$ {formatCurrency(detalhamento.producao)}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-600">Custo por kg</span>
          <p className="text-xl font-bold text-blue-600 mt-2">
            R$ {formatCurrency(detalhamento.custoKg)}/kg
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Custo Total:</span>
          <span className="text-2xl font-bold text-green-600">
            R$ {formatCurrency(custoTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};