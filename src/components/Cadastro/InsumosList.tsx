import { Insumo } from '../../types/insumo';
import { Database, Pencil, Trash2, Copy } from 'lucide-react';

interface InsumosListProps {
  insumos: Insumo[];
  onEdit: (insumo: Insumo) => void;
  onDelete: (id: string) => void;
  onClone?: (insumo: Insumo) => void;
}

export const InsumosList = ({ insumos, onEdit, onDelete, onClone }: InsumosListProps) => {
  const formatIF = (value: number) => value.toFixed(1);
  const formatDensidade = (value: number) => value.toFixed(3);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insumos.map((insumo) => (
        <div key={insumo.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{insumo.nome}</h3>
            </div>
            <div className="flex space-x-2">
              {onClone && (
                <button
                  onClick={() => onClone(insumo)}
                  className="text-green-600 hover:text-green-800"
                  title="Clonar"
                >
                  <Copy className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => onEdit(insumo)}
                className="text-blue-600 hover:text-blue-800"
                title="Editar"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(insumo.id!)}
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
                  <span className="font-medium">Grade:</span> {insumo.grade}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tipo:</span> {insumo.tipo}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Origem:</span> {insumo.origem}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Propriedades</h4>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Densidade:</span> {formatDensidade(insumo.densidade)} g/cm³
                </p>
                <p className="text-sm">
                  <span className="font-medium">IF:</span> {formatIF(insumo.indiceFluidez)} g/10min
                </p>
                <p className="text-sm">
                  <span className="font-medium">Comonômero:</span> {insumo.comonomero}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Catalisador:</span> {insumo.catalisador}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Aditivos</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Deslizante</p>
                <p className="text-sm">
                  {insumo.deslizante}
                  {insumo.deslizante === 'SIM' && insumo.deslizantePPM && (
                    <span className="text-gray-500 ml-1">
                      ({insumo.deslizantePPM} PPM)
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Aux. de Fluxo</p>
                <p className="text-sm">
                  {insumo.auxiliarFluxo}
                  {insumo.auxiliarFluxo === 'SIM' && insumo.auxiliarFluxoPPM && (
                    <span className="text-gray-500 ml-1">
                      ({insumo.auxiliarFluxoPPM} PPM)
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Antibloqueio</p>
                <p className="text-sm">
                  {insumo.antibloqueio}
                  {insumo.antibloqueio === 'SIM' && insumo.antibloqueioPPM && (
                    <span className="text-gray-500 ml-1">
                      ({insumo.antibloqueioPPM} PPM)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};