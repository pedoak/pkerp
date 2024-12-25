import { Package } from 'lucide-react';
import { formatCurrency } from '../../../../utils/format';
import { CustoTableItem } from './types';

interface CustosComImpostosProps {
  items: CustoTableItem[];
  totalComImpostos: number;
  totalSemImpostos: number;
}

export const CustosComImpostos = ({ items, totalComImpostos, totalSemImpostos }: CustosComImpostosProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-3">
        <Package className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Custos com Impostos</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Insumo</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Preço Base</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                IPI ({items[0]?.ipi}%)
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                ICMS ({items[0]?.icms}%)
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">R$/kg</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => {
              const valorIPI = item.precoBase * (item.ipi / 100);
              const valorICMS = item.precoBase * (item.icms / 100);
              
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2">
                    <div>{item.nome}</div>
                    <div className="text-xs text-gray-500">{item.tipo}</div>
                  </td>
                  <td className="px-3 py-2 text-right">
                    {formatCurrency(item.precoBase)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {formatCurrency(valorIPI)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {formatCurrency(valorICMS)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {formatCurrency(item.precoFinal)}
                  </td>
                  <td className="px-3 py-2 text-right font-medium">
                    {formatCurrency(item.custoTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50 font-medium">
            <tr>
              <td colSpan={5} className="px-3 py-2 text-right">Base:</td>
              <td className="px-3 py-2 text-right text-blue-600">
                {formatCurrency(totalSemImpostos)}
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="px-3 py-2 text-right">Impostos:</td>
              <td className="px-3 py-2 text-right text-blue-600">
                {formatCurrency(totalComImpostos - totalSemImpostos)}
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td colSpan={5} className="px-3 py-2 text-right font-bold">Total:</td>
              <td className="px-3 py-2 text-right font-bold text-blue-600">
                {formatCurrency(totalComImpostos)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};