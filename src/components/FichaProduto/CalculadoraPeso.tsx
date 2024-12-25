import { useState } from 'react';
import { Calculator } from 'lucide-react';

interface CalculadoraPesoProps {
  onCalculate: (peso: number) => void;
}

export const CalculadoraPeso = ({ onCalculate }: CalculadoraPesoProps) => {
  const [peso, setPeso] = useState(0);

  const handleCalculate = () => {
    onCalculate(peso);
  };

  return (
    <div className="flex items-end gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Peso da Formulação
        </label>
        <div className="relative">
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
            className="block w-32 px-3 py-1.5 pr-8 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            min="0"
            step="0.1"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            kg
          </span>
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Calculator className="w-4 h-4 mr-1" />
        Calcular
      </button>
    </div>
  );
};