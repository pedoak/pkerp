import { useForm } from 'react-hook-form';
import { CustoOperacional } from '../../types/fornecedor';
import { Calculator } from 'lucide-react';

interface CustoOperacionalFormProps {
  custoOperacional: CustoOperacional | null;
  onSubmit: (data: CustoOperacional) => Promise<void>;
}

export const CustoOperacionalForm = ({ custoOperacional, onSubmit }: CustoOperacionalFormProps) => {
  const { register, handleSubmit } = useForm<CustoOperacional>({
    defaultValues: custoOperacional || {
      energia_kwh: 0,
      consumo_medio_kwh: 0,
      mao_de_obra_hora: 0,
      producao_media_kg_hora: 0,
      custos_adicionais_kg: 0
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Custos Operacionais</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custo de Energia (R$/KWh)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('energia_kwh')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Consumo Médio (KWh/kg)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('consumo_medio_kwh')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custo de Mão de Obra (R$/hora)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('mao_de_obra_hora')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Produção Média (kg/hora)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('producao_media_kg_hora')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custos Adicionais (R$/kg)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('custos_adicionais_kg')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Salvar Custos Operacionais
        </button>
      </div>
    </form>
  );
};