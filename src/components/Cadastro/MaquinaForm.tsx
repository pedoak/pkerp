import { useForm } from 'react-hook-form';
import { Cog } from 'lucide-react';
import { Maquina } from '../../types/maquina';

interface MaquinaFormProps {
  onSubmit: (data: Maquina) => Promise<void>;
  maquinaEmEdicao: Maquina | null;
}

export const MaquinaForm = ({ onSubmit, maquinaEmEdicao }: MaquinaFormProps) => {
  const { register, handleSubmit } = useForm<Maquina>({
    defaultValues: maquinaEmEdicao || {
      status: 'ATIVA',
      tipo: 'EXTRUSORA' // Valor padrão
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Cog className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">
          {maquinaEmEdicao ? 'Editar Máquina' : 'Nova Máquina'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Máquina</label>
          <input
            {...register('nome')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Máquina</label>
          <select
            {...register('tipo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="EXTRUSORA">Extrusora</option>
            <option value="CHILLER">Chiller</option>
            <option value="TORRE_RESFRIAMENTO">Torre de Resfriamento</option>
            <option value="GRAVIMETRICO">Gravimétrico</option>
            <option value="RECUPERADOR_REFILE">Recuperador de Refile</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo</label>
          <input
            {...register('modelo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fabricante</label>
          <input
            {...register('fabricante')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ano de Fabricação</label>
          <input
            type="number"
            {...register('ano_fabricacao')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Potência Instalada (kW)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('potencia_instalada')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Potência em Trabalho (kW)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('potencia_producao')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="ATIVA">Ativa</option>
            <option value="MANUTENCAO">Em Manutenção</option>
            <option value="INATIVA">Inativa</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {maquinaEmEdicao ? 'Atualizar Máquina' : 'Cadastrar Máquina'}
        </button>
      </div>
    </form>
  );
};