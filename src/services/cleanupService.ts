import { supabase } from '../lib/supabase';
import { withRetry } from '../utils/api';

export const cleanupService = {
  async cleanupOrphanedData(userId: string): Promise<void> {
    if (!userId) return;

    await withRetry(async () => {
      // Remove preços sem insumos ou fornecedores
      const { error: pricesError } = await supabase
        .from('precos_insumos')
        .delete()
        .or(`
          insumo_id.not.in.(select id from insumos),
          fornecedor_id.not.in.(select id from fornecedores)
        `);

      if (pricesError) throw pricesError;

      // Remove itens de receitas sem insumos
      const { error: recipeError } = await supabase
        .from('receitas_itens')
        .delete()
        .not('insumo_id', 'in', 
          supabase.from('insumos').select('id')
        );

      if (recipeError) throw recipeError;
    });
  }
};