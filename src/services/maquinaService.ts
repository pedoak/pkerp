import { supabase } from '../lib/supabase';
import { Maquina } from '../types/maquina';

export const maquinaService = {
  async listarMaquinas(userId: string): Promise<Maquina[]> {
    const { data, error } = await supabase
      .from('maquinas')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  },

  async salvarMaquina(maquina: Maquina, userId: string): Promise<void> {
    const { error } = await supabase
      .from('maquinas')
      .upsert({
        ...maquina,
        user_id: userId,
        updated_at: new Date()
      });

    if (error) throw error;
  },

  async excluirMaquina(id: string): Promise<void> {
    const { error } = await supabase
      .from('maquinas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};