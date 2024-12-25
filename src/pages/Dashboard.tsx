import { useEffect, useState } from 'react';
import { Package, FileText, TrendingUp, Scale, DollarSign, Droplet, Factory } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { receitaService } from '../services/receitaService';
import { insumoService } from '../services/insumoService';
import { cotacoesService } from '../services/cotacoesService';
import { Receita } from '../types/receita';
import { Insumo } from '../types/insumo';

interface Cotacao {
  valor: number;
  variacao: number;
  ultimaAtualizacao: Date;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [cotacoes, setCotacoes] = useState<{ dolar: Cotacao; nafta: Cotacao; petroleo: Cotacao } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const [receitasData, insumosData, cotacoesData] = await Promise.all([
          receitaService.listarReceitas(user.id),
          insumoService.listarInsumos(user.id),
          cotacoesService.buscarCotacoes()
        ]);
        setReceitas(receitasData);
        setInsumos(insumosData);
        setCotacoes(cotacoesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const insumosPorTipo = insumos.reduce((acc, insumo) => {
    acc[insumo.tipo] = (acc[insumo.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statsCards = [
    {
      title: 'Total de Receitas',
      value: receitas.length,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Total de Insumos',
      value: insumos.length,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Média de Insumos por Receita',
      value: receitas.length ? (receitas.reduce((acc, r) => acc + r.itens.length, 0) / receitas.length).toFixed(1) : '0',
      icon: Scale,
      color: 'bg-purple-500',
    },
    {
      title: 'Tipos de Insumos',
      value: Object.keys(insumosPorTipo).length,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const cotacoesCards = cotacoes ? [
    {
      title: 'Dólar',
      value: `R$ ${cotacoes.dolar.valor.toFixed(2)}`,
      variacao: cotacoes.dolar.variacao,
      icon: DollarSign,
      color: 'bg-emerald-500',
    },
    {
      title: 'Nafta',
      value: `USD ${cotacoes.nafta.valor.toFixed(2)}`,
      variacao: cotacoes.nafta.variacao,
      icon: Factory,
      color: 'bg-indigo-500',
      subtitle: 'por tonelada'
    },
    {
      title: 'Barril de Petróleo',
      value: `USD ${cotacoes.petroleo.valor.toFixed(2)}`,
      variacao: cotacoes.petroleo.variacao,
      icon: Droplet,
      color: 'bg-gray-700',
      subtitle: 'WTI Crude'
    },
  ] : [];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de extrusão</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-full text-white`}>
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cards de Cotações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cotacoesCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`${card.color} p-3 rounded-full text-white mr-3`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    {card.subtitle && (
                      <p className="text-xs text-gray-500">{card.subtitle}</p>
                    )}
                  </div>
                </div>
                <div className={`text-sm font-medium ${card.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {card.variacao >= 0 ? '+' : ''}{card.variacao}%
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">
                Última atualização: {new Date().toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};