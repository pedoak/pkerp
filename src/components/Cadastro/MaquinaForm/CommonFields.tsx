import { UseFormRegister } from 'react-hook-form';
import { Maquina } from '../../../types/maquina';

interface CommonFieldsProps {
  register: UseFormRegister<Maquina>;
}

export const CommonFields = ({ register }: CommonFieldsProps) => {
  return (
    <>
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
          <option value="">Selecione o tipo</option>
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
    </>
  );
};