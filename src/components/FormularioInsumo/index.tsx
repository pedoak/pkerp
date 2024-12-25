import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Insumo } from '../../types/insumo';
import { Plus, Save } from 'lucide-react';

interface FormularioInsumoProps {
  onSubmit: (data: Insumo) => Promise<void>;
  insumoEmEdicao: Insumo | null;
  loading: boolean;
}

export const FormularioInsumo: React.FC<FormularioInsumoProps> = ({ 
  onSubmit, 
  insumoEmEdicao,
  loading 
}) => {
  const { register, handleSubmit, reset } = useForm<Insumo>({
    defaultValues: {
      tipo: 'PEBD INDUSTRIAL',
      origem: 'VIRGEM',
      comonomero: 'N/A',
      catalisador: 'N/A',
      deslizante: 'NÃO',
      auxiliarFluxo: 'NÃO',
      antibloqueio: 'NÃO',
      densidade: 0,
      indiceFluidez: 0
    }
  });

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
        indiceFluidez: 0
      });
    }
  }, [insumoEmEdicao, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Insumo</label>
        <input
          {...register('nome', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          disabled={loading}
        />
      </div>
      {/* ... outros campos ... */}
      <div className="col-span-full">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </span>
          ) : (
            <>
              {insumoEmEdicao ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Atualizar
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar
                </>
              )}
            </>
          )}
        </button>
      </div>
    </form>
  );
};