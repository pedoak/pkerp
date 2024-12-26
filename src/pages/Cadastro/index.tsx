import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Tabs } from '../../components/Cadastro/Tabs';
import { InsumoForm } from '../../components/InsumoForm';
import { InsumosList } from '../../components/Cadastro/InsumosList';
import { FornecedoresForm } from '../../components/Custos/FornecedoresForm';
import { FornecedoresList } from '../../components/Cadastro/FornecedoresList';
import { MaquinaForm } from '../../components/Cadastro/MaquinaForm';
import { MaquinasList } from '../../components/Cadastro/MaquinasList';
import { useAuth } from '../../contexts/AuthContext';
import { insumoService } from '../../services/insumoService';
import { custoService } from '../../services/custoService';
import { maquinaService } from '../../services/maquinaService';
import { toast } from 'react-hot-toast';
import { Insumo } from '../../types/insumo';
import { Fornecedor } from '../../types/fornecedor';
import { Maquina } from '../../types/maquina';

export const Cadastro = () => {
  const [activeTab, setActiveTab] = useState('insumos');
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemEmEdicao, setItemEmEdicao] = useState<any>(null);

  useEffect(() => {
    if (!user?.id) return;
    carregarDados();
  }, [user?.id]);

  const carregarDados = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [insumosData, fornecedoresData, maquinasData] = await Promise.all([
        insumoService.listarInsumos(user.id),
        custoService.listarFornecedores(user.id),
        maquinaService.listarMaquinas(user.id)
      ]);
      setInsumos(insumosData);
      setFornecedores(fornecedoresData);
      setMaquinas(maquinasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setItemEmEdicao(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    
    try {
      switch (activeTab) {
        case 'insumos':
          await insumoService.excluirInsumo(id);
          break;
        case 'fornecedores':
          await custoService.excluirFornecedor(id);
          break;
        case 'maquinas':
          await maquinaService.excluirMaquina(id);
          break;
      }
      toast.success('Item excluído com sucesso!');
      await carregarDados();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      toast.error('Erro ao excluir item');
    }
  };

  const handleSubmit = async (data: any) => {
    if (!user?.id) return;
    
    try {
      switch (activeTab) {
        case 'insumos':
          await insumoService.salvarInsumo({
            ...data,
            id: itemEmEdicao?.id,
            userId: user.id
          });
          break;
        case 'fornecedores':
          await custoService.salvarFornecedor({
            ...data,
            id: itemEmEdicao?.id
          }, user.id);
          break;
        case 'maquinas':
          await maquinaService.salvarMaquina({
            ...data,
            id: itemEmEdicao?.id
          }, user.id);
          break;
      }
      
      toast.success('Item salvo com sucesso!');
      setShowForm(false);
      setItemEmEdicao(null);
      await carregarDados();
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      toast.error('Erro ao salvar item');
    }
  };

  const handleClone = (item: any) => {
    const clonedItem = {
      ...item,
      id: undefined,
      nome: `${item.nome} (Cópia)`
    };
    setItemEmEdicao(clonedItem);
    setShowForm(true);
  };

  const handleToggleForm = () => {
    if (showForm) {
      setItemEmEdicao(null);
    }
    setShowForm(!showForm);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Cadastros</h1>
          <button
            onClick={handleToggleForm}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
          >
            {showForm ? 'Voltar para Lista' : 'Novo Cadastro'}
          </button>
        </div>
        
        <Tabs activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab);
          setShowForm(false);
          setItemEmEdicao(null);
        }} />

        <div className="mt-8">
          {activeTab === 'insumos' && (
            showForm ? (
              <InsumoForm 
                onSubmit={handleSubmit}
                loading={loading}
                insumoEmEdicao={itemEmEdicao}
              />
            ) : (
              <InsumosList 
                insumos={insumos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClone={handleClone}
              />
            )
          )}
          
          {activeTab === 'fornecedores' && (
            showForm ? (
              <FornecedoresForm 
                onSubmit={handleSubmit}
              />
            ) : (
              <FornecedoresList 
                fornecedores={fornecedores}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          )}
          
          {activeTab === 'maquinas' && (
            showForm ? (
              <MaquinaForm 
                onSubmit={handleSubmit}
                maquinaEmEdicao={itemEmEdicao}
              />
            ) : (
              <MaquinasList 
                maquinas={maquinas}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};