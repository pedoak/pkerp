import { Package } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface MateriaPrimaCustosProps {
  items: Array<{
    nome: string;
    percentual: number;
    quantidade: number;
    precoBase: number;
    precoFinal: number;
    custoTotal: number;
    custoSemImpostos: number;
  }>;
}

export const MateriaPrimaCustos = ({ items }: MateriaPrimaCustosProps) => {
  const totalComImpostos = items.reduce((sum, item) => sum + item.custoTotal, 0);
  const totalSemImpostos = items.reduce((sum, item) => sum + item.custoSemImpostos, 0);
  const impostos = totalComImpostos - totalSemImpostos;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Package className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Custos de Matéria-Prima</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Insumo
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                %
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Qtd (kg)
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Base/kg
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Final/kg
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.nome}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {item.percentual}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {item.quantidade.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {formatCurrency(item.precoBase)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {formatCurrency(item.precoFinal)}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                  {formatCurrency(item.custoTotal)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-medium">
            <tr>
              <td colSpan={5} className="px-4 py-3 text-sm text-gray-900 text-right">
                Subtotal (sem impostos):
              </td>
              <td className="px-4 py-3 text-sm text-blue-600 text-right">
                {formatCurrency(totalSemImpostos)}
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="px-4 py-3 text-sm text-gray-900 text-right">
                Impostos:
              </td>
              <td className="px-4 py-3 text-sm text-blue-600 text-right">
                {formatCurrency(impostos)}
              </td>
            </tr>
            <tr className="border-t-2 border-gray-200">
              <td colSpan={5} className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                Total (com impostos):
              </td>
              <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">
                {formatCurrency(totalComImpostos)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};