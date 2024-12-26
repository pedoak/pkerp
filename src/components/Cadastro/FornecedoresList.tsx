import { useState } from 'react';
import { Fornecedor } from '../../types/fornecedor';
import { Building2, Pencil, Trash2, DollarSign, Package, Clock } from 'lucide-react';
import { FornecedorInsumos } from './FornecedorInsumos';
import { formatDate } from '../../utils/format';

interface FornecedoresListProps {
  fornecedores: Fornecedor[];
  onEdit: (fornecedor: Fornecedor) => void;
  onDelete: (id: string) => void;
}

export const FornecedoresList = ({ fornecedores, onEdit, onDelete }: FornecedoresListProps) => {
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);

  if (!fornecedores?.length) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum fornecedor cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fornecedores.map((fornecedor) => (
          <div key={fornecedor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">{fornecedor.nome}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedFornecedor(fornecedor)}
                  className="text-green-600 hover:text-green-800"
                  title="Gerenciar Preços"
                >
                  <DollarSign className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEdit(fornecedor)}
                  className="text-yellow-600 hover:text-yellow-800"
                  title="Editar"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(fornecedor.id!)}
                  className="text-red-600 hover:text-red-800"
                  title="Excluir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Estado:</span> {fornecedor.estado}
              </p>
              <p className="text-sm">
                <span className="font-medium">Prazo Médio:</span> {fornecedor.prazo_medio_dias} dias
              </p>
              <p className="text-sm">
                <span className="font-medium">Frete:</span>{' '}
                {fornecedor.frete_incluso ? 'Incluso' : `R$ ${fornecedor.custo_frete?.toFixed(2)}/kg`}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-1" />
                  <span>{fornecedor.total_insumos || 0} insumos</span>
                </div>
                {fornecedor.ultima_atualizacao && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Atualizado em {formatDate(fornecedor.ultima_atualizacao)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFornecedor && (
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Preços dos Insumos - {selectedFornecedor.nome}
              </h3>
              <button
                onClick={() => setSelectedFornecedor(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                Fechar
              </button>
            </div>
            
            <FornecedorInsumos fornecedor={selectedFornecedor} />
          </div>
        </div>
      )}
    </div>
  );
};