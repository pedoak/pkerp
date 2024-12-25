import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Bell } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../Logo';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user } = useAuth();

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="flex h-full">
          <Logo isCollapsed={isCollapsed} />
          
          <div className="flex-1 flex justify-end items-center px-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <UserProfile user={user} isCollapsed={false} variant="header" />
            </div>
          </div>
        </div>
      </header>

      <Sidebar 
        isCollapsed={isCollapsed} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-16' : 'lg:ml-56'}`}>
        <main className="pt-24 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};