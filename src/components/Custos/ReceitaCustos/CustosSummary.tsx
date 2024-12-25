import { DollarSign, Package, Cog } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface CustosSummaryProps {
  quantidade: number;
  custoTotal: number;
  custoTotalSemImpostos: number;
  detalhamento: {
    materiaPrima: {
      total: number;
      totalSemImpostos: number;
      porKg: number;
      porKgSemImpostos: number;
    };
    producao: {
      energia: number;
      maoDeObra: number;
      manutencao: number;
      outros: number;
      total: number;
      porKg: number;
    } | null;
  };
  incluirImpostos: boolean;
}

export const CustosSummary = ({ 
  quantidade, 
  custoTotal, 
  custoTotalSemImpostos,
  detalhamento,
  incluirImpostos
}: CustosSummaryProps) => {
  const custoTotalExibido = incluirImpostos ? custoTotal : custoTotalSemImpostos;
  const custoMPExibido = incluirImpostos 
    ? detalhamento.materiaPrima.total 
    : detalhamento.materiaPrima.totalSemImpostos;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <DollarSign className="w-6 h-6 text-green-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Resumo dos Custos</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matéria-Prima */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Package className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-medium text-gray-800">Matéria-Prima</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Base:</span>
              <span>{formatCurrency(detalhamento.materiaPrima.totalSemImpostos)}</span>
            </div>
            {incluirImpostos && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Impostos:</span>
                <span>{formatCurrency(detalhamento.materiaPrima.total - detalhamento.materiaPrima.totalSemImpostos)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span className="text-gray-900">{formatCurrency(custoMPExibido)}</span>
            </div>
          </div>
        </div>

        {/* Custos de Produção */}
        {detalhamento.producao && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Cog className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-gray-800">Custos de Produção</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Energia:</span>
                <span>{formatCurrency(detalhamento.producao.energia)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mão de Obra:</span>
                <span>{formatCurrency(detalhamento.producao.maoDeObra)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Manutenção:</span>
                <span>{formatCurrency(detalhamento.producao.manutencao)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-gray-900">{formatCurrency(detalhamento.producao.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Custo Total */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3">Custo Total</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Matéria-Prima:</span>
              <span>{formatCurrency(custoMPExibido)}</span>
            </div>
            {detalhamento.producao && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Produção:</span>
                <span>{formatCurrency(detalhamento.producao.total)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span className="text-green-600">{formatCurrency(custoTotalExibido)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Por kg:</span>
              <span>{formatCurrency(custoTotalExibido / quantidade)}/kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};