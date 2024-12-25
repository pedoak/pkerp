import { Calculator } from 'lucide-react';

interface QuantityInputProps {
  quantidade: number;
  onChange: (value: number) => void;
}

export const QuantityInput = ({ quantidade, onChange }: QuantityInputProps) => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-800">
            Quantidade a Produzir
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={quantidade}
            onChange={(e) => onChange(Number(e.target.value))}
            min="1"
            step="100"
            className="w-36 text-right text-lg font-semibold rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
          />
          <span className="text-lg font-semibold text-gray-700">kg</span>
        </div>
      </div>
    </div>
  );
};