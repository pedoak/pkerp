import { supabase } from '../lib/supabase';
import { Fornecedor } from '../types/fornecedor';

export const custoService = {
  async listarFornecedores(userId: string): Promise<Fornecedor[]> {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('fornecedores')
      .select(`
        *,
        total_insumos:precos_insumos(count),
        ultima_atualizacao:precos_insumos(data_atualizacao)
      `)
      .eq('user_id', userId)
      .order('nome');

    if (error) throw error;

    return (data || []).map(fornecedor => ({
      ...fornecedor,
      total_insumos: fornecedor.total_insumos?.[0]?.count || 0,
      ultima_atualizacao: fornecedor.ultima_atualizacao?.[0]?.data_atualizacao || null
    }));
  },

  async salvarFornecedor(fornecedor: Fornecedor, userId: string): Promise<void> {
    const { error } = await supabase
      .from('fornecedores')
      .upsert({
        ...fornecedor,
        user_id: userId,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  },

  async excluirFornecedor(id: string): Promise<void> {
    const { error } = await supabase
      .from('fornecedores')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};