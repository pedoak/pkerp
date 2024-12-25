import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  Database,
  ScrollText,
  Calculator,
  Settings,
  Menu,
  X,
  Shield,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/adminService';

interface SidebarProps {
  isCollapsed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const Sidebar = ({ isCollapsed, onMouseEnter, onMouseLeave }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.id) {
        const isUserAdmin = await adminService.checkAdminStatus(user.id);
        setIsAdmin(isUserAdmin);
      }
    };
    checkAdmin();
  }, [user?.id]);

  const navItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: Database, text: 'Cadastros', path: '/cadastro' },
    { icon: ScrollText, text: 'Formulação', path: '/receitas' },
    { icon: Calculator, text: 'Custos', path: '/custos' },
    { icon: FileText, text: 'Relatórios', path: '/relatorios' },
    { icon: Settings, text: 'Configurações', path: '/configuracoes' }
  ];

  if (isAdmin) {
    navItems.push({ icon: Shield, text: 'Admin', path: '/admin' });
  }

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md hover:bg-gray-50"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-56'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <nav className="h-full flex flex-col py-4">
          <div className="flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm
                    transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span 
                    className={`
                      ml-3 whitespace-nowrap transition-all duration-300 ease-in-out
                      ${isCollapsed ? 'opacity-0 w-0 translate-x-10' : 'opacity-100 w-auto translate-x-0'}
                    `}
                  >
                    {item.text}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};