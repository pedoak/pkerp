import { Plus, ScrollText, Eye, Settings, Calculator } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Plus, text: 'Cadastro de Insumos', path: '/' },
  { icon: ScrollText, text: 'Formulação de Receitas', path: '/receitas' },
  { icon: Eye, text: 'Visualização de Receitas', path: '/visualizacao' },
  { icon: Settings, text: 'Configurações', path: '/configuracoes' },
  { icon: Calculator, text: 'Cálculo de Custos', path: '/custos' }
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b mb-8">
      <div className="flex space-x-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {item.text}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}