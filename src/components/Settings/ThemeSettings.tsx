import { useState } from 'react';
import { Package, Cog, ScrollText, Database, Calculator, FileText, Settings, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const colorOptions = [
  { name: 'Azul', primary: 'blue', accent: 'blue' },
  { name: 'Amarelo', primary: 'yellow', accent: 'yellow' },
  { name: 'Verde', primary: 'green', accent: 'emerald' },
  { name: 'Vermelho', primary: 'red', accent: 'rose' },
];

const iconSections = [
  { name: 'Cadastros', currentIcon: Database },
  { name: 'Receitas', currentIcon: ScrollText },
  { name: 'Custos', currentIcon: Calculator },
  { name: 'Relatórios', currentIcon: FileText },
];

export const ThemeSettings = () => {
  const { currentTheme, updateTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState(currentTheme?.primary || 'blue');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateTheme({ primary: color, accent: color });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personalização do Tema</h2>
        <p className="text-gray-600">Personalize as cores e ícones do sistema</p>
      </div>

      {/* Seletor de Cores */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Cores do Sistema</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color.primary)}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${selectedColor === color.primary 
                  ? `border-${color.primary}-500 bg-${color.primary}-50` 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className={`w-full h-8 rounded bg-${color.primary}-500 mb-2`} />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{color.name}</span>
                {selectedColor === color.primary && (
                  <Check className={`w-5 h-5 text-${color.primary}-500`} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <button className={`p-2 rounded-lg bg-${selectedColor}-500 text-white`}>
              Botão Principal
            </button>
            <button className={`p-2 rounded-lg border border-${selectedColor}-500 text-${selectedColor}-500`}>
              Botão Secundário
            </button>
          </div>
          <div className={`p-4 rounded-lg bg-${selectedColor}-50 text-${selectedColor}-700`}>
            Exemplo de alerta ou destaque
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => setSelectedColor(currentTheme?.primary || 'blue')}
        >
          Cancelar
        </button>
        <button
          className={`px-4 py-2 bg-${selectedColor}-500 text-white rounded-md hover:bg-${selectedColor}-600`}
          onClick={() => updateTheme({ primary: selectedColor, accent: selectedColor })}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};
