import { Pencil, Trash2, Copy } from 'lucide-react';
import { Insumo } from '../../types/insumo';

interface InsumoCardProps {
  insumo: Insumo;
  onEdit: (insumo: Insumo) => void;
  onDelete: (id: string) => void;
  onClone?: (insumo: Insumo) => void;
}

export const InsumoCard = ({ insumo, onEdit, onDelete, onClone }: InsumoCardProps) => {
  const handleClone = () => {
    if (onClone) {
      const clonedInsumo = {
        ...insumo,
        id: undefined,
        nome: `${insumo.nome} (Cópia)`,
      };
      onClone(clonedInsumo);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{insumo.nome}</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleClone}
            className="text-green-600 hover:text-green-800 transition-colors"
            title="Clonar"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(insumo)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Editar"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(insumo.id!)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Grade</p>
          <p className="text-gray-900">{insumo.grade}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Tipo</p>
          <p className="text-gray-900">{insumo.tipo}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Origem</p>
          <p className="text-gray-900">{insumo.origem}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Densidade (g/cm³)</p>
          <p className="text-gray-900">{insumo.densidade?.toFixed(3)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">IF (g/10min)</p>
          <p className="text-gray-900">{insumo.indiceFluidez?.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Comonômero</p>
          <p className="text-gray-900">{insumo.comonomero}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Catalisador</p>
          <p className="text-gray-900">{insumo.catalisador}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Deslizante</p>
            <p className="text-gray-900">
              {insumo.deslizante}
              {insumo.deslizante === 'SIM' && insumo.deslizantePPM && (
                <span className="ml-1 text-sm text-gray-500">
                  ({insumo.deslizantePPM} PPM)
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Aux. de Fluxo</p>
            <p className="text-gray-900">
              {insumo.auxiliarFluxo}
              {insumo.auxiliarFluxo === 'SIM' && insumo.auxiliarFluxoPPM && (
                <span className="ml-1 text-sm text-gray-500">
                  ({insumo.auxiliarFluxoPPM} PPM)
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Antibloqueio</p>
            <p className="text-gray-900">
              {insumo.antibloqueio}
              {insumo.antibloqueio === 'SIM' && insumo.antibloqueioPPM && (
                <span className="ml-1 text-sm text-gray-500">
                  ({insumo.antibloqueioPPM} PPM)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};