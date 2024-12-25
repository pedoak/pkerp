import { Package } from 'lucide-react';
import { formatCurrency } from '../../../../utils/format';
import { CustoTableItem } from './types';

interface CustosSemImpostosProps {
  items: CustoTableItem[];
  totalSemImpostos: number;
}

export const CustosSemImpostos = ({ items, totalSemImpostos }: CustosSemImpostosProps) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <div className="flex items-center mb-3">
      <Package className="w-5 h-5 text-blue-600 mr-2" />
      <h3 className="text-lg font-semibold">Custos sem Impostos</h3>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Insumo</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Tipo</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">%</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Qtd</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">R$/kg</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-3 py-2 whitespace-nowrap">{item.nome}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{item.tipo}</td>
              <td className="px-3 py-2 text-right">{item.percentual}%</td>
              <td className="px-3 py-2 text-right">{item.quantidade?.toFixed(2)}</td>
              <td className="px-3 py-2 text-right">{formatCurrency(item.precoBase)}</td>
              <td className="px-3 py-2 text-right font-medium">
                {formatCurrency(item.custoSemImpostos)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 font-medium">
          <tr>
            <td colSpan={5} className="px-3 py-2 text-right">Total:</td>
            <td className="px-3 py-2 text-right text-blue-600">
              {formatCurrency(totalSemImpostos)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);