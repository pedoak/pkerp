import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, AlertCircle } from 'lucide-react';
import { Fornecedor } from '../../../types/fornecedor';
import { PrecoInsumo } from '../../../types/precoInsumo';
import { fornecedorService } from '../../../services/fornecedorService';
import { useAuth } from '../../../contexts/AuthContext';
import { PrecosInsumosForm } from './PrecosInsumosForm';
import { PrecosInsumosList } from './PrecosInsumosList';

interface FornecedorInsumosProps {
  fornecedor: Fornecedor;
}

export const FornecedorInsumos = ({ fornecedor }: FornecedorInsumosProps) => {
  const [precosInsumos, setPrecosInsumos] = useState<PrecoInsumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [precoEmEdicao, setPrecoEmEdicao] = useState<PrecoInsumo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const carregarPrecos = async () => {
    if (!user?.id) return;
    
    try {
      setError(null);
      const precos = await fornecedorService.listarPrecosInsumos(user.id);
      setPrecosInsumos(precos.filter(p => p.fornecedor_id === fornecedor.id));
    } catch (error) {
      console.error('Erro ao carregar preços:', error);
      setError('Não foi possível carregar os preços dos insumos');
      toast.error('Erro ao carregar preços dos insumos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPrecos();
  }, [fornecedor.id, user?.id]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-800">
        <AlertCircle className="w-5 h-5 mr-2" />
        <p>{error}</p>
        <button
          onClick={carregarPrecos}
          className="ml-auto text-sm font-medium hover:text-red-900"
        >
          Tentar novamente
        </button>
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
          onEdit={(preco) => {
            setPrecoEmEdicao(preco);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};