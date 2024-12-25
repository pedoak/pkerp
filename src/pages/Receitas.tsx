import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/Layout/MainLayout';
import { FormulacaoReceita } from '../components/FormulacaoReceita';
import { ListaReceitas } from '../components/ListaReceitas';
import { FichaProduto } from '../components/FichaProduto';
import { receitaService } from '../services/receitaService';
import { insumoService } from '../services/insumoService';
import { Receita } from '../types/receita';
import { Insumo } from '../types/insumo';

export const Receitas = () => {
  const { user } = useAuth();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(false);
  const [receitaEmEdicao, setReceitaEmEdicao] = useState<Receita | null>(null);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    carregarDados();
  }, [user?.id]);

  const carregarDados = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [receitasData, insumosData] = await Promise.all([
        receitaService.listarReceitas(user.id),
        insumoService.listarInsumos(user.id)
      ]);
      setReceitas(receitasData);
      setInsumos(insumosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Receita) => {
    if (!user?.id) {
      toast.error('Usuário não autenticado');
      return;
    }

    setLoading(true);
    try {
      await receitaService.salvarReceita({
        ...data,
        id: receitaEmEdicao?.id,
        userId: user.id
      });
      toast.success(receitaEmEdicao ? 'Receita atualizada!' : 'Receita criada!');
      setReceitaEmEdicao(null);
      await carregarDados();
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
      toast.error('Erro ao salvar receita');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (receita: Receita) => {
    setReceitaEmEdicao(receita);
  };

  const handleSelect = (receita: Receita) => {
    setReceitaSelecionada(receita);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) return;
    
    setLoading(true);
    try {
      await receitaService.excluirReceita(id);
      toast.success('Receita excluída!');
      if (receitaSelecionada?.id === id) {
        setReceitaSelecionada(null);
      }
      await carregarDados();
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
      toast.error('Erro ao excluir receita');
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (receita: Receita) => {
    if (!user?.id) {
      toast.error('Usuário não autenticado');
      return;
    }

    setLoading(true);
    try {
      await receitaService.salvarReceita({
        ...receita,
        id: undefined,
        userId: user.id,
        nome: `${receita.nome} (Cópia)`
      });
      toast.success('Receita duplicada!');
      await carregarDados();
    } catch (error) {
      console.error('Erro ao duplicar receita:', error);
      toast.error('Erro ao duplicar receita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Formulação de Receitas</h1>

          {/* Formulário de Nova Receita */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <FormulacaoReceita
              insumos={insumos}
              onSubmit={handleSubmit}
              loading={loading}
              receitaEmEdicao={receitaEmEdicao}
            />
          </div>

          {/* Lista de Receitas */}
          <div className="mb-8">
            <ListaReceitas
              receitas={receitas}
              insumos={insumos}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onSelect={handleSelect}
              selectedReceitaId={receitaSelecionada?.id}
            />
          </div>

          {/* Ficha do Produto */}
          {receitaSelecionada && (
            <div className="mb-8">
              <FichaProduto
                receita={receitaSelecionada}
                insumos={insumos}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};