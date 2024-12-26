import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

interface RegistroForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Registro: FC = () => {
  const { register, handleSubmit } = useForm<RegistroForm>();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegistroForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    try {
      await signUp(data.email, data.password);
      toast.success('Conta criada com sucesso!');
      navigate('/login');
    } catch (error: any) {
      console.error('Erro ao criar conta:', error);
      const errorMessage = error?.message || error?.error_description || 'Erro desconhecido';

      if (errorMessage.includes('Email rate limit exceeded')) {
        toast.error('Muitas tentativas. Tente novamente mais tarde.');
      } else if (errorMessage.includes('User already registered')) {
        toast.error('Este email já está registrado. Tente fazer login.');
      } else {
        toast.error(`Erro ao criar conta: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-yellow-400">
        <div className="text-center mb-8">
          <img src="/logo-pk.png" alt="PK ERP Logo" className="mx-auto h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestão Industrial</p>
          <p className="mt-1 text-xs text-gray-500">Preencha os dados abaixo para começar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="seu@empresa.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Mínimo 8 caracteres"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Use letras, números e caracteres especiais</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Digite a senha novamente"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Criar Conta
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-700 transition duration-150 ease-in-out">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};