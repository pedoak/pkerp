import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLinkProps {
  icon: LucideIcon;
  text: string;
  path: string;
}

export const SidebarLink = ({ icon: Icon, text, path }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`
        flex items-center px-3 py-2 rounded-md text-sm transition-colors
        ${isActive 
          ? 'bg-yellow-50 text-yellow-700' 
          : 'text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{text}</span>
    </Link>
  );
};