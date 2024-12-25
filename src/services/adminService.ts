import { supabase } from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  is_admin: boolean;
  is_approved: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile extends UserProfile {
  user: User;
}

export const adminService = {
  async checkAdminStatus(userId: string | undefined): Promise<boolean> {
    if (!userId) return false;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Erro ao verificar status de admin:', error);
        return false;
      }

      return !!data?.is_admin;
    } catch (error) {
      console.error('Erro ao verificar status de admin:', error);
      return false;
    }
  },

  async listUsers(): Promise<UserWithProfile[]> {
    try {
      // Primeiro, buscar todos os usuários do auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Erro ao listar usuários:', authError);
        return [];
      }

      // Depois, buscar os perfis correspondentes
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*');

      if (profilesError) {
        console.error('Erro ao buscar perfis:', profilesError);
        return [];
      }

      // Combinar os dados
      const usersWithProfiles = profiles.map(profile => {
        const authUser = authUsers.users.find(u => u.id === profile.user_id);
        if (!authUser) return null;

        return {
          ...profile,
          user: {
            id: authUser.id,
            email: authUser.email,
            created_at: authUser.created_at
          }
        };
      }).filter((user): user is UserWithProfile => user !== null);

      return usersWithProfiles;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return [];
    }
  },

  async updateUserStatus(userId: string, isApproved: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ 
          is_approved: isApproved,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Erro ao atualizar status do usuário:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
      return false;
    }
  }
};