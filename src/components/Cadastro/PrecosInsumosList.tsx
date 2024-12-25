import { PrecoInsumo } from '../../types/precoInsumo';
import { Fornecedor } from '../../types/fornecedor';
import { DollarSign, Pencil, Trash2 } from 'lucide-react';
import { calcularPrecoFinal } from '../../utils/impostos';
import { formatCurrency } from '../../utils/format';

interface PrecosInsumosListProps {
  precosInsumos: PrecoInsumo[];
  fornecedor: Fornecedor;
  onEdit: (preco: PrecoInsumo) => void;
  onDelete: (id: string) => void;
}

export const PrecosInsumosList = ({ 
  precosInsumos,
  fornecedor,
  onEdit, 
  onDelete 
}: PrecosInsumosListProps) => {
  if (!precosInsumos?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum preço cadastrado para este fornecedor.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {precosInsumos.map((preco) => {
        const precoFinal = calcularPrecoFinal(
          preco.preco_base,
          preco.ipi,
          preco.icms || 0,
          fornecedor.frete_incluso,
          fornecedor.custo_frete || 0
        );

        return (
          <div key={preco.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">
                  {preco.insumo?.nome} - {preco.insumo?.grade}
                </h4>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(preco)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(preco.id!)}
                  className="text-red-600 hover:text-red-800"
                  title="Excluir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Preço Base:</span>
                <p className="font-medium">{formatCurrency(preco.preco_base)}/kg</p>
              </div>
              <div>
                <span className="text-gray-500">IPI:</span>
                <p className="font-medium">{preco.ipi}%</p>
              </div>
              <div>
                <span className="text-gray-500">ICMS:</span>
                <p className="font-medium">{preco.icms || 0}%</p>
              </div>
              {!fornecedor.frete_incluso && fornecedor.custo_frete && (
                <div>
                  <span className="text-gray-500">Frete:</span>
                  <p className="font-medium">{formatCurrency(fornecedor.custo_frete)}/kg</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Preço Final:</span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(precoFinal)}/kg
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Última atualização: {new Date(preco.data_atualizacao || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};