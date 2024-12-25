import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { Insumo } from '../../types/insumo';
import { CustosFixos, CustosVariaveis, CustosDepreciacao, CustosOverhead } from '../../types/custos';
import { Receita } from '../../types/receita';
import { receitaService } from '../../services/receitaService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { calcularCustoTotal } from '../../utils/calculoCustos';
import { DetalhamentoCustos } from './DetalhamentoCustos';

interface CalculadoraCustosProps {
  insumos: Insumo[];
  custosFixos: CustosFixos | null;
  custosVariaveis: CustosVariaveis | null;
  custosDepreciacao: CustosDepreciacao[];
  custosOverhead: CustosOverhead | null;
  onRefresh: () => void;
}

export const CalculadoraCustos = ({
  insumos,
  custosFixos,
  custosVariaveis,
  custosDepreciacao,
  custosOverhead,
  onRefresh
}: CalculadoraCustosProps) => {
  const { user } = useAuth();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);
  const [producaoMensal, setProducaoMensal] = useState<number>(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarReceitas();
  }, [user?.id]);

  const carregarReceitas = async () => {
    if (!user?.id) return;
    try {
      const data = await receitaService.listarReceitas(user.id);
      setReceitas(data);
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
      toast.error('Erro ao carregar receitas');
    } finally {
      setLoading(false);
    }
  };

  const calcularCustos = () => {
    if (!receitaSelecionada || !custosFixos || !custosVariaveis || !custosOverhead) return null;

    // Calcula custo de matéria-prima
    const custoMP = receitaSelecionada.itens.reduce((total, item) => {
      const insumo = insumos.find(i => i.id === item.insumoId);
      if (!insumo) return total;
      // Aqui você precisaria implementar a lógica para obter o preço do insumo
      const precoInsumo = 0; // Implementar
      return total + (precoInsumo * item.percentual / 100);
    }, 0);

    return calcularCustoTotal(
      producaoMensal,
      custoMP,
      custosFixos,
      custosVariaveis,
      custosDepreciacao,
      custosOverhead
    );
  };

  const custos = calcularCustos();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Calculadora de Custos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Receita
          </label>
          <select
            value={receitaSelecionada?.id || ''}
            onChange={(e) => {
              const receita = receitas.find(r => r.id === e.target.value);
              setReceitaSelecionada(receita || null);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione uma receita</option>
            {receitas.map(receita => (
              <option key={receita.id} value={receita.id}>
                {receita.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Produção Mensal (kg)
          </label>
          <input
            type="number"
            value={producaoMensal}
            onChange={(e) => setProducaoMensal(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {custos && receitaSelecionada && (
        <DetalhamentoCustos
          custos={custos}
          receita={receitaSelecionada}
          producaoMensal={producaoMensal}
        />
      )}
    </div>
  );
};