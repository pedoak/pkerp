import { Cog, Pencil, Trash2 } from 'lucide-react';
import { Maquina } from '../../types/maquina';

interface MaquinasListProps {
  maquinas: Maquina[];
  onEdit: (maquina: Maquina) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ATIVA':
      return 'bg-green-100 text-green-800';
    case 'MANUTENCAO':
      return 'bg-yellow-100 text-yellow-800';
    case 'INATIVA':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const MaquinasList = ({ maquinas, onEdit, onDelete }: MaquinasListProps) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {maquinas.map((maquina) => (
        <div key={maquina.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Cog className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{maquina.nome}</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(maquina)}
                className="text-yellow-600 hover:text-yellow-800"
                title="Editar"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(maquina.id!)}
                className="text-red-600 hover:text-red-800"
                title="Excluir"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Informações Básicas</h4>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Modelo:</span> {maquina.modelo}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Fabricante:</span> {maquina.fabricante}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Ano:</span> {maquina.ano_fabricacao}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Especificações</h4>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Capacidade:</span> {maquina.capacidade_producao?.toFixed(2)} kg/h
                </p>
                <p className="text-sm">
                  <span className="font-medium">Potência:</span> {maquina.potencia_instalada.toFixed(2)} kW
                </p>
                <p className="text-sm">
                  <span className="font-medium">Potência de Trabalho:</span> {maquina.potencia_producao?.toFixed(2)} kW
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(maquina.status)}`}>
                    {maquina.status === 'ATIVA' && 'Ativa'}
                    {maquina.status === 'MANUTENCAO' && 'Em Manutenção'}
                    {maquina.status === 'INATIVA' && 'Inativa'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};