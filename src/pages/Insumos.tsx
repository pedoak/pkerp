import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/Layout/MainLayout';
import { InsumoForm } from '../components/InsumoForm';
import { InsumosList } from '../components/InsumosList';
import { insumoService } from '../services/insumoService';
import { Insumo } from '../types/insumo';

export const Insumos = () => {
  const { user } = useAuth();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(false);
  const [insumoEmEdicao, setInsumoEmEdicao] = useState<Insumo | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    carregarInsumos();
  }, [user?.id]);

  const carregarInsumos = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await insumoService.listarInsumos(user.id);
      setInsumos(data);
    } catch (error) {
      console.error('Erro ao carregar insumos:', error);
      toast.error('Erro ao carregar insumos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Insumo) => {
    if (!user?.id) {
      toast.error('Usuário não autenticado');
      return;
    }

    setLoading(true);
    try {
      await insumoService.salvarInsumo({
        ...data,
        id: insumoEmEdicao?.id,
        userId: user.id
      });
      toast.success(insumoEmEdicao ? 'Insumo atualizado!' : 'Insumo cadastrado!');
      setInsumoEmEdicao(null);
      await carregarInsumos();
    } catch (error) {
      console.error('Erro ao salvar insumo:', error);
      toast.error('Erro ao salvar insumo');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (insumo: Insumo) => {
    setInsumoEmEdicao(insumo);
  };

  const handleClone = (insumo: Insumo) => {
    setInsumoEmEdicao({
      ...insumo,
      id: undefined,
      nome: `${insumo.nome} (Cópia)`,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este insumo?')) return;
    
    setLoading(true);
    try {
      await insumoService.excluirInsumo(id);
      toast.success('Insumo excluído!');
      await carregarInsumos();
    } catch (error) {
      console.error('Erro ao excluir insumo:', error);
      toast.error('Erro ao excluir insumo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Cadastro de Insumos</h1>
        
        <InsumoForm 
          onSubmit={handleSubmit} 
          loading={loading}
          insumoEmEdicao={insumoEmEdicao}
        />

        <InsumosList 
          insumos={insumos} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClone={handleClone}
        />
      </div>
    </MainLayout>
  );
};