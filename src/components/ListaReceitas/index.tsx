import { Pencil, Trash2, Copy, Eye } from 'lucide-react';
import { Receita } from '../../types/receita';
import { Insumo } from '../../types/insumo';

interface ListaReceitasProps {
  receitas: Receita[];
  insumos: Insumo[];
  onEdit: (receita: Receita) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (receita: Receita) => void;
  onSelect: (receita: Receita) => void;
  selectedReceitaId?: string;
}

export const ListaReceitas = ({ 
  receitas, 
  insumos, 
  onEdit, 
  onDelete,
  onDuplicate,
  onSelect,
  selectedReceitaId
}: ListaReceitasProps) => {
  const getInsumoInfo = (id: string) => {
    const insumo = insumos.find(i => i.id === id);
    return insumo ? {
      nome: `${insumo.nome} - ${insumo.grade}`,
      tipo: insumo.tipo
    } : { nome: 'Insumo não encontrado', tipo: '-' };
  };

  const handleDuplicate = (receita: Receita) => {
    if (onDuplicate) {
      const duplicatedReceita = {
        ...receita,
        id: undefined,
        nome: `${receita.nome} (Cópia)`,
      };
      onDuplicate(duplicatedReceita);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {receitas.map((receita) => (
        <div 
          key={receita.id} 
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow ${
            selectedReceitaId === receita.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-base font-medium text-gray-900">{receita.nome}</h3>
              {receita.descricao && (
                <p className="text-sm text-gray-500 mt-1">{receita.descricao}</p>
              )}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onSelect(receita)}
                className={`p-1 rounded hover:bg-gray-100 ${
                  selectedReceitaId === receita.id ? 'text-blue-600' : 'text-gray-500'
                }`}
                title="Visualizar Ficha"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDuplicate(receita)}
                className="p-1 rounded text-gray-500 hover:bg-gray-100"
                title="Duplicar"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(receita)}
                className="p-1 rounded text-gray-500 hover:bg-gray-100"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(receita.id!)}
                className="p-1 rounded text-gray-500 hover:bg-gray-100"
                title="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {receita.itens.map((item, index) => {
              const insumoInfo = getInsumoInfo(item.insumoId);
              return (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 truncate">{insumoInfo.nome}</span>
                  <span className="text-gray-900 font-medium ml-2">{item.percentual}%</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};