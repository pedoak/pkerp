import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { receitaService } from '../../../services/receitaService';
import { fornecedorService } from '../../../services/fornecedorService';
import { maquinaService } from '../../../services/maquinaService';
import { ReceitaSelector } from './ReceitaSelector';
import { CustoCalculator } from './CustoCalculator';
import { Loader2 } from 'lucide-react';

export const ReceitaCustos = () => {
  const [receitas, setReceitas] = useState([]);
  const [precosInsumos, setPrecosInsumos] = useState([]);
  const [selectedReceita, setSelectedReceita] = useState(null);
  const [maquina, setMaquina] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const carregarDados = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [receitasData, precosData, maquinasData] = await Promise.all([
          receitaService.listarReceitas(user.id),
          fornecedorService.listarPrecosInsumos(user.id),
          maquinaService.listarMaquinas(user.id)
        ]);
        
        setReceitas(receitasData);
        setPrecosInsumos(precosData);
        
        // Get the first active machine
        const maquinaAtiva = maquinasData.find(m => m.status === 'ATIVA');
        if (!maquinaAtiva) {
          toast.error('Nenhuma máquina ativa encontrada');
          return;
        }
        setMaquina(maquinaAtiva);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!maquina) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">
          É necessário cadastrar e ativar uma máquina para calcular os custos de produção.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ReceitaSelector
        receitas={receitas}
        selectedReceita={selectedReceita}
        onSelect={setSelectedReceita}
      />

      {selectedReceita && (
        <CustoCalculator
          receita={selectedReceita}
          precosInsumos={precosInsumos}
          maquina={maquina}
        />
      )}
    </div>
  );
};