import { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { Receita } from '../../types/receita';
import { PrecoInsumo } from '../../types/precoInsumo';
import { receitaCustoService } from '../../services/receitaCustoService';
import { formatCurrency } from '../../utils/format';

interface CustoReceitaProps {
  receita: Receita;
  precosInsumos: PrecoInsumo[];
}

export const CustoReceita = ({ receita, precosInsumos }: CustoReceitaProps) => {
  const [quantidade, setQuantidade] = useState<number>(100);
  const custos = receitaCustoService.calcularCustoReceita(receita, precosInsumos, quantidade);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold">Custos da Receita</h3>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantidade a Produzir (kg)
        </label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          min="1"
          className="w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insumo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">%</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço/kg</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Custo Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {custos.custoPorInsumo.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.percentual}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantidade.toFixed(2)} kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.precoFinal)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.custoTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={4} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                Custo Total:
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-lg font-bold text-blue-600">
                  <DollarSign className="w-5 h-5 mr-1" />
                  {formatCurrency(custos.custoTotal)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(custos.custoTotal / quantidade)}/kg
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};