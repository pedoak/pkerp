import { Insumo } from '../../types/insumo';
import { ItemReceita } from '../../types/receita';

interface TabelaComposicaoProps {
  itens: ItemReceita[];
  insumos: Insumo[];
  pesoTotal: number;
}

export const TabelaComposicao = ({
  itens,
  insumos,
  pesoTotal,
}: TabelaComposicaoProps) => {
  const getInsumo = (id: string) => insumos.find((i) => i.id === id);

  const calcularPeso = (percentual: number) => {
    return (percentual / 100) * pesoTotal;
  };

  const calcularSacos = (peso: number) => {
    return (peso / 25).toFixed(2);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">
              Insumo
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">
              Grade
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">
              Tipo
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">
              %
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">
              Peso (kg)
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">
              Sacos
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">
              Densidade
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 bg-gray-50">
              IF
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">
              Comonômero
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50">
              Catalisador
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {itens.map((item, index) => {
            const insumo = getInsumo(item.insumoId);
            if (!insumo) return null;

            const peso = calcularPeso(item.percentual);
            const sacos = calcularSacos(peso);

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm font-medium text-gray-900">
                  {insumo.nome}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500">
                  {insumo.grade}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500">
                  {insumo.tipo}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 text-right font-medium">
                  {item.percentual}%
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 text-right">
                  {peso.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 text-right">
                  {sacos}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 text-right">
                  {insumo.densidade || '-'}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 text-right">
                  {insumo.indiceFluidez?.toFixed(1) || '-'}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500">
                  {insumo.comonomero || '-'}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500">
                  {insumo.catalisador || '-'}
                </td>
              </tr>
            );
          })}
          <tr className="bg-gray-50 font-medium">
            <td className="px-3 py-2 text-sm text-gray-900">Total</td>
            <td colSpan={2} className="px-3 py-2"></td>
            <td className="px-3 py-2 text-sm text-gray-900 text-right">
              {itens.reduce((sum, item) => sum + item.percentual, 0)}%
            </td>
            <td className="px-3 py-2 text-sm text-gray-900 text-right">
              {pesoTotal.toFixed(2)}
            </td>
            <td className="px-3 py-2 text-sm text-gray-900 text-right">
              {calcularSacos(pesoTotal)}
            </td>
            <td colSpan={4} className="px-3 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};