import { useState, useEffect, useCallback, memo } from 'react';
import { Cog, Info } from 'lucide-react';
import { CustoProducao, ResultadoCustoProducao } from '../../../types/producaoCustos';
import { calcularCustoProducao } from '../../../utils/calculoCustoProducao';
import { ProductionCostInputs } from './ProductionCosts/ProductionCostInputs';
import { CostDetailsModal } from './CostDetailsModal';
import { maquinaService } from '../../../services/maquinaService';
import { useAuth } from '../../../contexts/AuthContext';
import { Maquina } from '../../../types/maquina';

const STORAGE_KEY = 'custos_producao_config';

interface ProducaoCustosProps {
  quantidade: number;
  maquina: {
    id?: string;
    nome: string;
    tipo: string;
    capacidade_producao: number;
    potencia_instalada: number;
    potencia_producao: number;
    tempo_aquecimento: number;
  };
  onCustoCalculado: (custos: ResultadoCustoProducao) => void;
}

export const ProducaoCustos = memo(({ quantidade, maquina, onCustoCalculado }: ProducaoCustosProps) => {
  const { user } = useAuth();
  const [maquinasAuxiliares, setMaquinasAuxiliares] = useState<Maquina[]>([]);
  const [custos, setCustos] = useState<CustoProducao>(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    return savedConfig ? JSON.parse(savedConfig) : {
      custoDiaria: 150,
      numeroOperadores: 2,
      custoManutencaoKg: 0.5,
      outrosCustosKg: 0.3,
      custoKwh: 0.92
    };
  });

  const [showModal, setShowModal] = useState(false);

  // Carregar outras máquinas
  useEffect(() => {
    const carregarMaquinas = async () => {
      if (user?.id) {
        try {
          const maquinas = await maquinaService.listarMaquinas(user.id);
          // Filtra a máquina principal e pega só as outras
          setMaquinasAuxiliares(maquinas.filter(m => m.id !== maquina.id));
        } catch (error) {
          console.error('Erro ao carregar máquinas:', error);
        }
      }
    };
    carregarMaquinas();
  }, [user?.id, maquina.id]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custos));
  }, [custos]);

  useEffect(() => {
    const resultado = calcularCustoProducao(
      quantidade,
      maquina,
      maquinasAuxiliares,
      custos.custoKwh,
      custos
    );
    onCustoCalculado(resultado);
  }, [quantidade, maquina, maquinasAuxiliares, custos, onCustoCalculado]);

  const handleCustoChange = useCallback((field: keyof CustoProducao, value: number) => {
    setCustos(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cog className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Custos de Produção
          </h3>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          title="Ver detalhes dos custos"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      <ProductionCostInputs
        custos={custos}
        onChange={handleCustoChange}
      />

      <CostDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        detalhamento={calcularCustoProducao(quantidade, maquina, maquinasAuxiliares, custos.custoKwh, custos).detalhamentoEnergia}
      />
    </div>
  );
});

ProducaoCustos.displayName = 'ProducaoCustos';