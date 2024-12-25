import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Trash2, Save, FileText, AlertCircle, PlusCircle } from 'lucide-react';
import { Receita } from '../../types/receita';
import { Insumo } from '../../types/insumo';

interface FormulacaoReceitaProps {
  insumos: Insumo[];
  onSubmit: (data: Receita) => Promise<void>;
  loading: boolean;
  receitaEmEdicao: Receita | null;
}

export const FormulacaoReceita = ({
  insumos,
  onSubmit,
  loading,
  receitaEmEdicao
}: FormulacaoReceitaProps) => {
  const { register, control, handleSubmit, reset, watch } = useForm<Receita>({
    defaultValues: {
      nome: '',
      descricao: '',
      itens: [{ insumoId: '', percentual: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itens'
  });

  const itens = watch('itens');
  const totalPercentual = itens.reduce((sum, item) => sum + (Number(item.percentual) || 0), 0);

  useEffect(() => {
    if (receitaEmEdicao) {
      reset(receitaEmEdicao);
    }
  }, [receitaEmEdicao, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">
          {receitaEmEdicao ? 'Editar Receita' : 'Nova Receita'}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Receita
            </label>
            <input
              type="text"
              id="nome"
              {...register('nome')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: PE Linear 2124"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              id="descricao"
              {...register('descricao')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Filme para embalagem flexível"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-900">Composição</h3>
            </div>
            <button
              type="button"
              onClick={() => append({ insumoId: '', percentual: 0 })}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <PlusCircle className="w-4 h-4" />
              Adicionar Insumo
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <select
                    {...register(`itens.${index}.insumoId`)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Selecione um insumo</option>
                    {insumos.map((insumo) => (
                      <option key={insumo.id} value={insumo.id}>
                        {insumo.nome} - {insumo.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <div className="relative">
                    <input
                      type="number"
                      {...register(`itens.${index}.percentual`)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-8"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      %
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Total:</span>
              <span className={`text-sm font-medium ${totalPercentual === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalPercentual.toFixed(2)}%
              </span>
              {totalPercentual !== 100 && (
                <div className="ml-3 flex items-center text-amber-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  O total deve ser 100%
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || totalPercentual !== 100}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Save className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Receita
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};