import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { LogIn } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-yellow-400">
        <div className="text-center mb-8">
          <img src="/logo-pk.png" alt="PK ERP Logo" className="mx-auto h-20 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">PK ERP</h1>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestão Industrial</p>
          <p className="mt-1 text-xs text-gray-500">Controle • Eficiência • Produtividade</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
            <div className="relative">
              <input
                {...register('email')}
                type="email"
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150 ease-in-out"
                required
                placeholder="seu@empresa.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150 ease-in-out"
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Acessar Sistema
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Primeiro acesso?{' '}
            <Link to="/registro" className="font-medium text-yellow-600 hover:text-yellow-700 transition duration-150 ease-in-out">
              Criar conta
            </Link>
          </p>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PK ERP. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};