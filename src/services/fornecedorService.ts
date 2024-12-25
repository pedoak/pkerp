import { supabase } from '../lib/supabase';
import { PrecoInsumo } from '../types/precoInsumo';

export const fornecedorService = {
  async listarPrecosInsumos(userId: string): Promise<PrecoInsumo[]> {
    if (!userId) return [];

    try {
      const { data, error } = await supabase
        .from('precos_insumos')
        .select(`
          *,
          insumo:insumos(
            id,
            nome,
            grade,
            tipo
          ),
          fornecedor:fornecedores!inner(
            id,
            nome,
            estado,
            frete_incluso,
            custo_frete,
            user_id
          )
        `)
        .eq('fornecedor.user_id', userId)
        .order('data_atualizacao', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        throw new Error('Erro ao carregar preços dos insumos');
      }

      return data || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async salvarPrecoInsumo(precoInsumo: PrecoInsumo): Promise<void> {
    try {
      const { error } = await supabase
        .from('precos_insumos')
        .upsert({
          id: precoInsumo.id,
          fornecedor_id: precoInsumo.fornecedor_id,
          insumo_id: precoInsumo.insumo_id,
          preco_base: precoInsumo.preco_base,
          ipi: precoInsumo.ipi,
          icms: precoInsumo.icms,
          data_atualizacao: new Date().toISOString()
        });

      if (error) {
        console.error('Database error:', error);
        throw new Error('Erro ao salvar preço do insumo');
      }
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async excluirPrecoInsumo(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('precos_insumos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Database error:', error);
        throw new Error('Erro ao excluir preço do insumo');
      }
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
};