import { useState, useEffect } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { UserList } from '../components/Admin/UserList';
import { useAuth } from '../contexts/AuthContext';
import { adminService, UserWithProfile } from '../services/adminService';
import { toast } from 'react-hot-toast';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user?.id) {
        navigate('/login');
        return;
      }

      const isUserAdmin = await adminService.checkAdminStatus(user.id);
      setIsAdmin(isUserAdmin);

      if (!isUserAdmin) {
        setLoading(false);
        return;
      }

      try {
        const usersList = await adminService.listUsers();
        setUsers(usersList);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        toast.error('Erro ao carregar lista de usuários');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, navigate]);

  const handleApproveUser = async (userId: string) => {
    setLoading(true);
    try {
      const success = await adminService.updateUserStatus(userId, true);
      if (success) {
        toast.success('Usuário aprovado com sucesso!');
        const updatedUsers = await adminService.listUsers();
        setUsers(updatedUsers);
      } else {
        toast.error('Erro ao aprovar usuário');
      }
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error);
      toast.error('Erro ao aprovar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectUser = async (userId: string) => {
    setLoading(true);
    try {
      const success = await adminService.updateUserStatus(userId, false);
      if (success) {
        toast.success('Usuário rejeitado com sucesso!');
        const updatedUsers = await adminService.listUsers();
        setUsers(updatedUsers);
      } else {
        toast.error('Erro ao rejeitar usuário');
      }
    } catch (error) {
      console.error('Erro ao rejeitar usuário:', error);
      toast.error('Erro ao rejeitar usuário');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Shield className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Acesso Restrito</h2>
          <p className="text-gray-500 mt-2">Você não tem permissão para acessar esta área.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold text-gray-900">Administração de Usuários</h1>
            <p className="mt-2 text-sm text-gray-700">
              Lista de todos os usuários registrados no sistema.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <UserList 
            users={users}
            onApprove={handleApproveUser}
            onReject={handleRejectUser}
            isLoading={loading}
          />
        </div>
      </div>
    </MainLayout>
  );
};