import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Eraser } from 'lucide-react';
import { Insumo } from '../../types/insumo';

interface InsumoFormProps {
  onSubmit: (data: Insumo) => Promise<void>;
  loading: boolean;
  insumoEmEdicao: Insumo | null;
}

export const InsumoForm = ({ onSubmit, loading, insumoEmEdicao }: InsumoFormProps) => {
  const { register, handleSubmit, reset, watch } = useForm<Insumo>();

  const deslizanteValue = watch('deslizante');
  const auxiliarFluxoValue = watch('auxiliarFluxo');
  const antibloqueioValue = watch('antibloqueio');

  // Reset form when insumoEmEdicao changes
  useEffect(() => {
    if (insumoEmEdicao) {
      reset(insumoEmEdicao);
    } else {
      reset({
        tipo: 'PEBD INDUSTRIAL',
        origem: 'VIRGEM',
        comonomero: 'N/A',
        catalisador: 'N/A',
        deslizante: 'NÃO',
        auxiliarFluxo: 'NÃO',
        antibloqueio: 'NÃO',
        densidade: 0,
        indiceFluidez: 0,
        deslizantePPM: 0,
        auxiliarFluxoPPM: 0,
        antibloqueioPPM: 0
      });
    }
  }, [insumoEmEdicao, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {insumoEmEdicao ? 'Editar Insumo' : 'Novo Insumo'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Insumo</label>
          <input
            {...register('nome')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Grade</label>
          <input
            {...register('grade')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            {...register('tipo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="PEBD CONVENCIONAL">PEBD CONVENCIONAL</option>
            <option value="PEBD INDUSTRIAL">PEBD INDUSTRIAL</option>
            <option value="PEBDL">PEBDL</option>
            <option value="mPEBDL">mPEBDL</option>
            <option value="PEAD">PEAD</option>
            <option value="ADITIVO">ADITIVO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Origem</label>
          <select
            {...register('origem')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="VIRGEM">VIRGEM</option>
            <option value="RECICLADO">RECICLADO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Densidade (g/cm³)</label>
          <input
            type="number"
            step="0.001"
            {...register('densidade')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Índice de Fluidez (g/10min)</label>
          <input
            type="number"
            step="0.01"
            {...register('indiceFluidez')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comonômero</label>
          <select
            {...register('comonomero')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="N/A">N/A</option>
            <option value="BUTENO">BUTENO</option>
            <option value="HEXENO">HEXENO</option>
            <option value="OCTENO">OCTENO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Catalisador</label>
          <select
            {...register('catalisador')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="N/A">N/A</option>
            <option value="ZIEGLER-NATTA">ZIEGLER-NATTA</option>
            <option value="METALOCENO">METALOCENO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deslizante</label>
          <select
            {...register('deslizante')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="NÃO">NÃO</option>
            <option value="SIM">SIM</option>
          </select>
        </div>

        {deslizanteValue === 'SIM' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Deslizante (PPM)</label>
            <input
              type="number"
              {...register('deslizantePPM')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Auxiliar de Fluxo</label>
          <select
            {...register('auxiliarFluxo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="NÃO">NÃO</option>
            <option value="SIM">SIM</option>
          </select>
        </div>

        {auxiliarFluxoValue === 'SIM' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Auxiliar de Fluxo (PPM)</label>
            <input
              type="number"
              {...register('auxiliarFluxoPPM')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Antibloqueio</label>
          <select
            {...register('antibloqueio')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="NÃO">NÃO</option>
            <option value="SIM">SIM</option>
          </select>
        </div>

        {antibloqueioValue === 'SIM' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Antibloqueio (PPM)</label>
            <input
              type="number"
              {...register('antibloqueioPPM')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-5 h-5 mr-2" />
          {insumoEmEdicao ? 'Atualizar Insumo' : 'Adicionar Insumo'}
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            if (insumoEmEdicao) {
              reset(insumoEmEdicao);
            }
          }}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <Eraser className="w-5 h-5 mr-2" />
          Limpar
        </button>
      </div>
    </form>
  );
};