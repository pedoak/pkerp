import { UseFormRegister } from 'react-hook-form';
import { Info } from 'lucide-react';
import { Maquina } from '../../../types/maquina';

interface ExtrusoraFieldsProps {
  register: UseFormRegister<Maquina>;
}

export const ExtrusoraFields = ({ register }: ExtrusoraFieldsProps) => {
  return (
    <div className="col-span-2 bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Info className="w-5 h-5 text-blue-600 mr-2" />
        <h4 className="font-medium text-blue-900">Parâmetros da Extrusora</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Potência Instalada (kW)
          </label>
          <input
            type="number"
            defaultValue={82}
            {...register('potencia_instalada')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Valor padrão: 82 kW</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacidade de Produção (kg/h)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('capacidade_producao')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-2 bg-white rounded p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tempo de Aquecimento:</span>
            <span className="font-medium text-blue-700">2 horas (fixo)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Potência em Produção:</span>
            <span className="font-medium text-blue-700">40% da potência instalada</span>
          </div>
        </div>
      </div>
    </div>
  );
};