import { supabase } from '../lib/supabase';

export const cleanupUnusedData = async (userId: string) => {
  try {
    // Remove orphaned prices (where insumo or fornecedor no longer exists)
    await supabase
      .from('precos_insumos')
      .delete()
      .not('insumo_id', 'in', 
        supabase.from('insumos').select('id')
      )
      .eq('user_id', userId);

    // Remove orphaned recipe items
    await supabase
      .from('receitas_itens')
      .delete()
      .not('insumo_id', 'in',
        supabase.from('insumos').select('id')
      );

  } catch (error) {
    console.error('Error cleaning up data:', error);
  }
};