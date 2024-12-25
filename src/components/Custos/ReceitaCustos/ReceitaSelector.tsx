import { ScrollText } from 'lucide-react';
import { Receita } from '../../../types/receita';

interface ReceitaSelectorProps {
  receitas: Receita[];
  selectedReceita: Receita | null;
  onSelect: (receita: Receita) => void;
}

export const ReceitaSelector = ({ receitas, selectedReceita, onSelect }: ReceitaSelectorProps) => {
  if (!receitas.length) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">Nenhuma receita cadastrada. Cadastre uma receita para calcular os custos.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <ScrollText className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium">Selecione uma Receita</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {receitas.map((receita) => (
          <button
            key={receita.id}
            onClick={() => onSelect(receita)}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedReceita?.id === receita.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h4 className="font-medium text-gray-900">{receita.nome}</h4>
            {receita.descricao && (
              <p className="text-sm text-gray-500 mt-1">{receita.descricao}</p>
            )}
            <p className="text-sm text-gray-600 mt-2">
              {receita.itens.length} insumos
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};