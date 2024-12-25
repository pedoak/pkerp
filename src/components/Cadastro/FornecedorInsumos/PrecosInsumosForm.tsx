import { useForm } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import { PrecoInsumo } from '../../../types/precoInsumo';
import { Fornecedor } from '../../../types/fornecedor';
import { useEffect, useState } from 'react';
import { insumoService } from '../../../services/insumoService';
import { useAuth } from '../../../contexts/AuthContext';
import { calcularPrecoFinal } from '../../../utils/impostos';
import { PriceBreakdown } from './PrecosInsumosForm/PriceBreakdown';

interface PrecosInsumosFormProps {
  fornecedor: Fornecedor;
  precoEmEdicao: PrecoInsumo | null;
  onSubmit: (data: PrecoInsumo) => Promise<void>;
  onCancel: () => void;
}

export const PrecosInsumosForm = ({ 
  fornecedor,
  precoEmEdicao,
  onSubmit,
  onCancel
}: PrecosInsumosFormProps) => {
  const { register, handleSubmit, watch, reset } = useForm<PrecoInsumo>({
    defaultValues: precoEmEdicao || {
      preco_base: 0,
      ipi: 0,
      icms: 12 // Default ICMS for Goiás
    }
  });
  const [insumos, setInsumos] = useState<any[]>([]);
  const { user } = useAuth();
  
  const precoBase = Number(watch('preco_base')) || 0;
  const ipi = Number(watch('ipi')) || 0;
  const icms = Number(watch('icms')) || 0;

  useEffect(() => {
    const carregarInsumos = async () => {
      if (!user?.id) return;
      try {
        const data = await insumoService.listarInsumos(user.id);
        setInsumos(data);
      } catch (error) {
        console.error('Erro ao carregar insumos:', error);
      }
    };

    carregarInsumos();
  }, [user?.id]);

  const precoFinal = calcularPrecoFinal(
    precoBase,
    ipi,
    icms,
    fornecedor.frete_incluso,
    fornecedor.custo_frete || 0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold">
            {precoEmEdicao ? 'Editar Preço' : 'Novo Preço'}
          </h3>
        </div>
        {precoEmEdicao && (
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit((data) => {
        onSubmit({
          ...data,
          preco_base: Number(data.preco_base),
          ipi: Number(data.ipi),
          icms: Number(data.icms),
          fornecedor_id: fornecedor.id!,
          data_atualizacao: new Date()
        });
        reset();
      })} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Insumo
            </label>
            <select
              {...register('insumo_id')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um insumo</option>
              {insumos.map(insumo => (
                <option key={insumo.id} value={insumo.id}>
                  {insumo.nome} - {insumo.grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preço Base (R$/kg)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('preco_base')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              IPI (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('ipi')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ICMS (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              {...register('icms')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <PriceBreakdown
          precoBase={precoBase}
          ipi={ipi}
          icms={icms}
          freteIncluso={fornecedor.frete_incluso}
          custoFrete={fornecedor.custo_frete}
          precoFinal={precoFinal}
        />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {precoEmEdicao ? 'Atualizar' : 'Adicionar'} Preço
          </button>
        </div>
      </form>
    </div>
  );
};