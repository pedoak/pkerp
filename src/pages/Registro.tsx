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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};