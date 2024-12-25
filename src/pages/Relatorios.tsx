import { useEffect, useState } from 'react';
import { Truck, Eye, EyeOff } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { insumoService } from '../services/insumoService';
import { fornecedorService } from '../services/fornecedorService';
import { Insumo } from '../types/insumo';
import { PrecoInsumo } from '../types/precoInsumo';

interface PrecoInsumoAgregado {
  insumoId: string;
  insumoNome: string;
  menorPreco: number;
  maiorPreco: number;
  precoMedio: number;
  fornecedores: {
    nome: string;
    preco: number;
    precoSemImposto: number;
    freteIncluso: boolean;
    custoFrete?: number;
    ipi: number;
    icms: number;
  }[];
}

const Relatorios = () => {
  const { user } = useAuth();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [precosInsumos, setPrecosInsumos] = useState<PrecoInsumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarPrecoSemImposto, setMostrarPrecoSemImposto] = useState(false);
  const [tipoInsumoSelecionado, setTipoInsumoSelecionado] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const [insumosData, precosData] = await Promise.all([
          insumoService.listarInsumos(user.id),
          fornecedorService.listarPrecosInsumos(user.id)
        ]);
        setInsumos(insumosData);
        setPrecosInsumos(precosData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const precosAgregados = precosInsumos.reduce((acc, preco) => {
    const insumo = insumos.find(i => i.id === preco.insumo_id);
    if (!insumo || !preco.fornecedor) return acc;

    if (!acc[preco.insumo_id]) {
      acc[preco.insumo_id] = {
        insumoId: preco.insumo_id,
        insumoNome: `${insumo.nome} - ${insumo.grade}`,
        menorPreco: Infinity,
        maiorPreco: -Infinity,
        precoMedio: 0,
        fornecedores: []
      };
    }

    const precoSemImposto = preco.preco_base;
    const valorIPI = preco.preco_base * (preco.ipi / 100);
    const valorICMS = preco.preco_base * (preco.icms / 100);
    const precoTotal = preco.preco_base + valorIPI + valorICMS;
    
    acc[preco.insumo_id].menorPreco = Math.min(acc[preco.insumo_id].menorPreco, precoTotal);
    acc[preco.insumo_id].maiorPreco = Math.max(acc[preco.insumo_id].maiorPreco, precoTotal);
    acc[preco.insumo_id].fornecedores.push({
      nome: preco.fornecedor.nome,
      preco: precoTotal,
      precoSemImposto,
      freteIncluso: preco.fornecedor.frete_incluso,
      custoFrete: preco.fornecedor.custo_frete,
      ipi: preco.ipi,
      icms: preco.icms
    });

    return acc;
  }, {} as Record<string, PrecoInsumoAgregado>);

  // Calcula preço médio para cada insumo
  Object.values(precosAgregados).forEach(item => {
    item.precoMedio = item.fornecedores.reduce((sum, f) => sum + f.preco, 0) / item.fornecedores.length;
  });

  const tiposInsumo = [...new Set(insumos.map(i => i.tipo))];

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
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análise detalhada de preços e fornecedores</p>
        </div>

        {/* Análise de Preços */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Análise de Preços por Fornecedor
              </h2>
              <div className="flex items-center gap-4">
                <select
                  value={tipoInsumoSelecionado}
                  onChange={(e) => setTipoInsumoSelecionado(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Todos os tipos</option>
                  {tiposInsumo.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <button
                  onClick={() => setMostrarPrecoSemImposto(!mostrarPrecoSemImposto)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {mostrarPrecoSemImposto ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Mostrar com Impostos
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Mostrar sem Impostos
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Insumo
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Menor Preço
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maior Preço
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço Médio
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fornecedores
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.values(precosAgregados)
                    .filter(item => {
                      if (!tipoInsumoSelecionado) return true;
                      const insumo = insumos.find(i => i.id === item.insumoId);
                      return insumo?.tipo === tipoInsumoSelecionado;
                    })
                    .sort((a, b) => b.precoMedio - a.precoMedio)
                    .map((item) => (
                      <tr key={item.insumoId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{item.insumoNome}</div>
                          <div className="text-sm text-gray-500">
                            {insumos.find(i => i.id === item.insumoId)?.tipo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <div className="font-medium text-gray-900">
                            R$ {mostrarPrecoSemImposto 
                              ? Math.min(...item.fornecedores.map(f => f.precoSemImposto)).toFixed(2)
                              : item.menorPreco.toFixed(2)
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <div className="font-medium text-gray-900">
                            R$ {mostrarPrecoSemImposto
                              ? Math.max(...item.fornecedores.map(f => f.precoSemImposto)).toFixed(2)
                              : item.maiorPreco.toFixed(2)
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <div className="font-medium text-gray-900">
                            R$ {mostrarPrecoSemImposto
                              ? (item.fornecedores.reduce((sum, f) => sum + f.precoSemImposto, 0) / item.fornecedores.length).toFixed(2)
                              : item.precoMedio.toFixed(2)
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-2">
                            {item.fornecedores
                              .sort((a, b) => (mostrarPrecoSemImposto ? a.precoSemImposto - b.precoSemImposto : a.preco - b.preco))
                              .map((fornecedor, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <span className="text-gray-900">{fornecedor.nome}</span>
                                    {!fornecedor.freteIncluso && (
                                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                        <Truck className="w-3 h-3 mr-1" />
                                        +Frete
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium text-gray-900">
                                      R$ {mostrarPrecoSemImposto ? fornecedor.precoSemImposto.toFixed(2) : fornecedor.preco.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      IPI: {fornecedor.ipi}% | ICMS: {fornecedor.icms}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export { Relatorios as default };
