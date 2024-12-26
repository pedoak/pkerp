import { useState } from 'react';
import { Settings as SettingsIcon, Palette } from 'lucide-react';
import { ThemeSettings } from '../components/Settings/ThemeSettings';
import { MainLayout } from '../components/Layout/MainLayout';

type TabType = 'geral' | 'tema';

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState<TabType>('geral');

  const tabs = [
    { id: 'geral', label: 'Configurações Gerais', icon: SettingsIcon },
    { id: 'tema', label: 'Personalização', icon: Palette },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="mt-2 text-gray-600">Gerencie as configurações do sistema</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`
                    py-4 px-1 flex items-center space-x-2 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'geral' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Configurações Gerais</h2>
              {/* Adicione aqui as configurações gerais */}
            </div>
          )}
          
          {activeTab === 'tema' && <ThemeSettings />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Configuracoes;