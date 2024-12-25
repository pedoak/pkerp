import { Database } from 'lucide-react';
import { Insumo } from '../../types/insumo';

interface CaracteristicasInsumoProps {
  insumo: Insumo;
  percentual?: number;
}

export const CaracteristicasInsumo = ({ insumo, percentual }: CaracteristicasInsumoProps) => {
  // Helper function to check if a value exists and is not N/A
  const hasValue = (value: string | number | null | undefined): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && (value.trim() === '' || value.toLowerCase() === 'n/a')) return false;
    return true;
  };

  const formatAditivo = (temAditivo: string, ppm?: number) => {
    if (temAditivo !== 'SIM') return 'NÃO';
    if (!ppm) return 'SIM';
    return `SIM (${ppm} PPM)`;
  };

  return (
    <div className="border border-gray-300 rounded p-4 print:p-2 print:text-xs print:border-black bg-white">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600 print:text-black" />
          <h4 className="font-semibold text-gray-800 print:text-black">{insumo.nome}</h4>
        </div>
        {percentual && (
          <span className="text-sm font-medium text-gray-600 print:text-black">
            {percentual}%
          </span>
        )}
      </div>

      {/* Informações Básicas */}
      <div className="mb-3 p-2 bg-blue-50 rounded print:bg-white">
        <div className="text-sm font-medium mb-1 text-blue-800">Informações Básicas</div>
        <div className="grid gap-1 text-sm">
          {hasValue(insumo.grade) && (
            <div>
              <span className="font-medium text-gray-700">Grade:</span>{' '}
              <span className="text-gray-900">{insumo.grade}</span>
            </div>
          )}
          {hasValue(insumo.tipo) && (
            <div>
              <span className="font-medium text-gray-700">Tipo:</span>{' '}
              <span className="text-gray-900">{insumo.tipo}</span>
            </div>
          )}
          {hasValue(insumo.origem) && (
            <div>
              <span className="font-medium text-gray-700">Origem:</span>{' '}
              <span className="text-gray-900">{insumo.origem}</span>
            </div>
          )}
        </div>
      </div>

      {/* Propriedades */}
      <div className="mb-3 p-2 bg-green-50 rounded print:bg-white">
        <div className="text-sm font-medium mb-1 text-green-800">Propriedades</div>
        <div className="grid gap-1 text-sm">
          {hasValue(insumo.densidade) && (
            <div>
              <span className="font-medium text-gray-700">Densidade:</span>{' '}
              <span className="text-gray-900">{insumo.densidade} g/cm³</span>
            </div>
          )}
          {hasValue(insumo.indiceFluidez) && (
            <div>
              <span className="font-medium text-gray-700">IF:</span>{' '}
              <span className="text-gray-900">{insumo.indiceFluidez.toFixed(1)} g/10min</span>
            </div>
          )}
          {hasValue(insumo.comonomero) && (
            <div>
              <span className="font-medium text-gray-700">Comonômero:</span>{' '}
              <span className="text-gray-900">{insumo.comonomero}</span>
            </div>
          )}
          {hasValue(insumo.catalisador) && (
            <div>
              <span className="font-medium text-gray-700">Catalisador:</span>{' '}
              <span className="text-gray-900">{insumo.catalisador}</span>
            </div>
          )}
        </div>
      </div>

      {/* Aditivos */}
      <div className="p-2 bg-purple-50 rounded print:bg-white">
        <div className="text-sm font-medium mb-1 text-purple-800">Aditivos</div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Deslizante</span>
            <div className="text-gray-900">{formatAditivo(insumo.deslizante, insumo.deslizantePPM)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Aux. de Fluxo</span>
            <div className="text-gray-900">{formatAditivo(insumo.auxiliarFluxo, insumo.auxiliarFluxoPPM)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Antibloqueio</span>
            <div className="text-gray-900">{formatAditivo(insumo.antibloqueio, insumo.antibloqueioPPM)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};