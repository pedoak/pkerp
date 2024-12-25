import { CustoTableItem } from './types';
import { CustosSemImpostos } from './CustosSemImpostos';
import { CustosComImpostos } from './CustosComImpostos';

interface CustoTablesProps {
  items: CustoTableItem[];
}

export const CustoTables = ({ items }: CustoTablesProps) => {
  const totalComImpostos = items.reduce((sum, item) => sum + item.custoTotal, 0);
  const totalSemImpostos = items.reduce((sum, item) => sum + item.custoSemImpostos, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CustosSemImpostos 
        items={items} 
        totalSemImpostos={totalSemImpostos} 
      />
      <CustosComImpostos 
        items={items}
        totalComImpostos={totalComImpostos}
        totalSemImpostos={totalSemImpostos}
      />
    </div>
  );
};