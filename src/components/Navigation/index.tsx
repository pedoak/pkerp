import { Home, Package, ScrollText, BarChart2, Settings, Menu, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navItems = [
  { icon: Home, text: 'Dashboard', path: '/dashboard' },
  { icon: Package, text: 'Insumos', path: '/insumos' },
  { icon: ScrollText, text: 'Receitas', path: '/receitas' },
  { icon: BarChart2, text: 'Relatórios', path: '/relatorios' },
  { icon: Settings, text: 'Configurações', path: '/admin' }
];

export const Navigation = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Expandir menu ao passar o mouse sobre a logo
  const handleLogoHover = () => {
    if (!isExpanded) {
      setIsHovering(true);
    }
  };

  const handleLogoLeave = () => {
    if (!isExpanded) {
      setIsHovering(false);
    }
  };

  // Efeito para controlar a expansão baseada no hover
  useEffect(() => {
    if (isHovering && !isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isHovering]);

  return (
    <nav 
      className={`bg-white h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out border-r ${
        isExpanded || isHovering ? 'w-64' : 'w-20'
      }`}
      onMouseLeave={() => {
        if (!isExpanded) {
          setIsHovering(false);
        }
      }}
    >
      <div className="flex flex-col h-full">
        <div 
          className="flex items-center justify-between p-4 border-b"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <div className={`flex items-center ${!isExpanded && !isHovering ? 'justify-center w-full' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-yellow-50 border-2 border-yellow-400 flex items-center justify-center hover:border-yellow-500 transition-colors">
              <span className="text-xl font-bold text-yellow-600">PK</span>
            </div>
            {(isExpanded || isHovering) && (
              <span className="ml-3 font-semibold text-gray-900">PK ERP</span>
            )}
          </div>
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              setIsHovering(false);
            }}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              !isExpanded && !isHovering ? 'absolute right-0 transform translate-x-full bg-white border border-l-0 rounded-l-none' : ''
            }`}
          >
            {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-yellow-50 text-yellow-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isExpanded || isHovering ? 'mr-3' : 'mx-auto'}`} />
                {(isExpanded || isHovering) && <span>{item.text}</span>}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t">
          <div className={`flex items-center ${!isExpanded && !isHovering ? 'justify-center' : ''}`}>
            <img 
              src="https://github.com/pedoak.png" 
              alt="Perfil" 
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            {(isExpanded || isHovering) && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Pedro Carvalho</p>
                <Link to="/profile" className="text-xs text-gray-500 hover:text-yellow-600">
                  Ver perfil
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}