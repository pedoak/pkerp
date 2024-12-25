import { useState, useEffect } from 'react';
import { Fornecedor } from '../../types/fornecedor';
import { PrecoInsumo } from '../../types/precoInsumo';
import { fornecedorService } from '../../services/fornecedorService';
import { PrecosInsumosForm } from './PrecosInsumosForm';
import { PrecosInsumosList } from './PrecosInsumosList';
import { toast } from 'react-hot-toast';

interface FornecedorInsumosProps {
  fornecedor: Fornecedor;
}

export const FornecedorInsumos = ({ fornecedor }: FornecedorInsumosProps) => {
  const [precosInsumos, setPrecosInsumos] = useState<PrecoInsumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [precoEmEdicao, setPrecoEmEdicao] = useState<PrecoInsumo | null>(null);
  const [showForm, setShowForm] = useState(false);

  const carregarPrecos = async () => {
    if (!fornecedor.user_id) return;
    
    try {
      const precos = await fornecedorService.listarPrecosInsumos(fornecedor.user_id);
      setPrecosInsumos(precos.filter(p => p.fornecedor_id === fornecedor.id));
    } catch (error) {
      console.error('Erro ao carregar preços:', error);
      toast.error('Erro ao carregar preços dos insumos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPrecos();
  }, [fornecedor.id, fornecedor.user_id]);

  const handleSubmit = async (data: PrecoInsumo) => {
    try {
      await fornecedorService.salvarPrecoInsumo({
        ...data,
        id: precoEmEdicao?.id,
        fornecedor_id: fornecedor.id!
      });
      toast.success('Preço salvo com sucesso!');
      setPrecoEmEdicao(null);
      setShowForm(false);
      await carregarPrecos();
    } catch (error) {
      console.error('Erro ao salvar preço:', error);
      toast.error('Erro ao salvar preço');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este preço?')) return;
    
    try {
      await fornecedorService.excluirPrecoInsumo(id);
      toast.success('Preço excluído com sucesso!');
      await carregarPrecos();
    } catch (error) {
      console.error('Erro ao excluir preço:', error);
      toast.error('Erro ao excluir preço');
    }
  };

  const handleEdit = (preco: PrecoInsumo) => {
    setPrecoEmEdicao(preco);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Preços dos Insumos
        </h3>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setPrecoEmEdicao(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Voltar para Lista' : 'Adicionar Preço'}
        </button>
      </div>

      {showForm ? (
        <PrecosInsumosForm
          fornecedor={fornecedor}
          precoEmEdicao={precoEmEdicao}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setPrecoEmEdicao(null);
          }}
        />
      ) : (
        <PrecosInsumosList
          precosInsumos={precosInsumos}
          fornecedor={fornecedor}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};