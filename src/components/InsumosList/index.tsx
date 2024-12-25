import { Insumo } from '../../types/insumo';
import { InsumoCard } from '../InsumoCard';

interface InsumosListProps {
  insumos: Insumo[];
  onEdit: (insumo: Insumo) => void;
  onDelete: (id: string) => void;
  onClone: (insumo: Insumo) => void;
}

export const InsumosList = ({ insumos, onEdit, onDelete, onClone }: InsumosListProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Insumos Cadastrados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insumos.map((insumo) => (
          <InsumoCard
            key={insumo.id}
            insumo={insumo}
            onEdit={onEdit}
            onDelete={onDelete}
            onClone={onClone}
          />
        ))}
      </div>
    </div>
  );
};