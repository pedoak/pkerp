import { Zap, Users, Wrench } from 'lucide-react';
import { CustoInput } from '../CustoInput';
import { CustoProducao } from '../../../../types/producaoCustos';

interface ProductionCostInputsProps {
  custos: CustoProducao;
  onChange: (field: keyof CustoProducao, value: number) => void;
}

export const ProductionCostInputs = ({ custos, onChange }: ProductionCostInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CustoInput
          label="Custo de Energia (R$/kWh)"
          value={custos.custoKwh}
          onChange={(value) => onChange('custoKwh', value)}
          icon={Zap}
          iconColor="text-yellow-500"
          min={0}
          tooltip="Custo do kWh conforme sua conta de energia ou concessionária local"
        />

        <CustoInput
          label="Diária Operador (R$)"
          value={custos.custoDiaria}
          onChange={(value) => onChange('custoDiaria', value)}
          icon={Users}
          iconColor="text-indigo-500"
          min={0}
          tooltip="Valor da diária do operador para um turno de 12 horas de trabalho"
        />

        <CustoInput
          label="Número de Operadores"
          value={custos.numeroOperadores}
          onChange={(value) => onChange('numeroOperadores', value)}
          icon={Users}
          iconColor="text-indigo-500"
          min={1}
          step={1}
          tooltip="Quantidade de operadores necessários por turno"
        />
      </div>

      <div className="space-y-4">
        <CustoInput
          label="Custo de Manutenção (R$/kg)"
          value={custos.custoManutencaoKg}
          onChange={(value) => onChange('custoManutencaoKg', value)}
          icon={Wrench}
          iconColor="text-orange-500"
          min={0}
          tooltip="Custo médio de manutenção por kg produzido"
        />

        <CustoInput
          label="Outros Custos (R$/kg)"
          value={custos.outrosCustosKg}
          onChange={(value) => onChange('outrosCustosKg', value)}
          icon={Wrench}
          iconColor="text-gray-500"
          min={0}
          tooltip="Custos adicionais por kg (ex: embalagem, etiquetas, etc)"
        />
      </div>
    </div>
  );
};