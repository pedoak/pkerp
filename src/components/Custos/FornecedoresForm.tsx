import { useForm } from 'react-hook-form';
import { Building2 } from 'lucide-react';
import { Fornecedor } from '../../types/fornecedor';

interface FornecedoresFormProps {
  onSubmit: (data: Fornecedor) => Promise<void>;
}

export const FornecedoresForm = ({ onSubmit }: FornecedoresFormProps) => {
  const { register, handleSubmit, watch, reset } = useForm<Fornecedor>({
    defaultValues: {
      frete_incluso: false,
      custo_frete: 0,
      prazo_medio_dias: 30
    }
  });

  const freteIncluso = watch('frete_incluso');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Building2 className="w-6 h-6 text-yellow-600 mr-2" />
        <h2 className="text-xl font-semibold">
          Novo Fornecedor
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Fornecedor
            </label>
            <input
              {...register('nome')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              {...register('estado')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            >
              <option value="">Selecione um estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prazo Médio (dias)
            </label>
            <input
              type="number"
              min="0"
              {...register('prazo_medio_dias')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex flex-col justify-end">
            <div className="flex items-center h-10">
              <input
                type="checkbox"
                {...register('frete_incluso')}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Frete Incluso no Preço
              </label>
            </div>
          </div>

          {!freteIncluso && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Custo do Frete (R$/kg)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('custo_frete')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Cadastrar Fornecedor
          </button>
        </div>
      </form>
    </div>
  );
};