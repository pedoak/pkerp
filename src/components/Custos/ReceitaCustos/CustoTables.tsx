import { Package } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface CustoTablesProps {
  items: Array<{
    nome: string;
    tipo: string;
    grade: string;
    percentual: number;
    quantidade: number;
    precoBase: number;
    precoFinal: number;
    custoTotal: number;
    custoSemImpostos: number;
    ipi: number;
    icms: number;
  }>;
  incluirImpostos: boolean;
}

export const CustoTables = ({ items, incluirImpostos }: CustoTablesProps) => {
  const totalComImpostos = items.reduce((sum, item) => sum + item.custoTotal, 0);
  const totalSemImpostos = items.reduce((sum, item) => sum + item.custoSemImpostos, 0);

  // Get the first non-zero IPI and ICMS values to display in headers
  const ipiValue = items.find(item => item.ipi > 0)?.ipi || 0;
  const icmsValue = items.find(item => item.icms > 0)?.icms || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Package className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">Custos dos Insumos</h3>
        </div>
      </div>

      <div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Insumo</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Grade</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">%</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Qtd</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Preço Base</th>
              {incluirImpostos && (
                <>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    IPI ({ipiValue}%)
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    ICMS ({icmsValue}%)
                  </th>
                </>
              )}
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
                  <td className="px-3 py-2 text-gray-500">{item.grade}</td>
                  <td className="px-3 py-2 text-right">{item.percentual}%</td>
                  <td className="px-3 py-2 text-right">{item.quantidade.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(item.precoBase)}</td>
                  {incluirImpostos && (
                    <>
                      <td className="px-3 py-2 text-right">{formatCurrency(valorIPI)}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(valorICMS)}</td>
                    </>
                  )}
                  <td className="px-3 py-2 text-right">{formatCurrency(incluirImpostos ? item.precoFinal : item.precoBase)}</td>
                  <td className="px-3 py-2 text-right font-medium">
                    {formatCurrency(incluirImpostos ? item.custoTotal : item.custoSemImpostos)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50 font-medium">
            <tr>
              <td colSpan={incluirImpostos ? 7 : 5} className="px-3 py-2 text-right font-bold">Total:</td>
              <td colSpan={2} className="px-3 py-2 text-right font-bold text-blue-600">
                {formatCurrency(incluirImpostos ? totalComImpostos : totalSemImpostos)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};