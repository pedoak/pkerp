import { useForm } from 'react-hook-form';
import { Cog } from 'lucide-react';
import { Maquina, TipoMaquina } from '../../../types/maquina';
import { ExtrusoraFields } from './ExtrusoraFields';
import { CommonFields } from './CommonFields';

interface MaquinaFormProps {
  onSubmit: (data: Maquina) => Promise<void>;
  maquinaEmEdicao: Maquina | null;
}

export const MaquinaForm = ({ onSubmit, maquinaEmEdicao }: MaquinaFormProps) => {
  const { register, handleSubmit, watch } = useForm<Maquina>({
    defaultValues: maquinaEmEdicao || {
      tipo: 'EXTRUSORA',
      status: 'ATIVA',
      potencia_instalada: 82
    }
  });

  const tipo = watch('tipo') as TipoMaquina;

  const handleFormSubmit = async (data: Maquina) => {
    if (data.tipo === 'EXTRUSORA') {
      data.tempo_aquecimento = 2;
      data.potencia_producao = data.potencia_instalada * 0.4;
    } else {
      delete data.capacidade_producao;
      delete data.tempo_aquecimento;
      delete data.potencia_producao;
      data.potencia_instalada = 0;
    }
    
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Cog className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">
          {maquinaEmEdicao ? 'Editar Máquina' : 'Nova Máquina'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommonFields register={register} />
        
        {tipo === 'EXTRUSORA' && (
          <ExtrusoraFields register={register} />
        )}
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