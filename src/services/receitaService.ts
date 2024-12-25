import { supabase } from '../lib/supabase';
import { Receita } from '../types/receita';

export const receitaService = {
  async listarReceitas(userId: string): Promise<Receita[]> {
    const { data, error } = await supabase
      .from('receitas')
      .select(`
        id,
        nome,
        descricao,
        user_id,
        created_at,
        updated_at,
        itens:receitas_itens(
          id,
          insumo_id,
          percentual
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    return (data || []).map(receita => ({
      id: receita.id,
      nome: receita.nome,
      descricao: receita.descricao,
      userId: receita.user_id,
      createdAt: new Date(receita.created_at),
      updatedAt: new Date(receita.updated_at),
      itens: receita.itens.map((item: any) => ({
        insumoId: item.insumo_id,
        percentual: Number(item.percentual)
      }))
    }));
  },

  async salvarReceita(receita: Receita): Promise<void> {
    const { id, itens, ...receitaData } = receita;

    // Start a transaction
    const { data: novaReceita, error: receitaError } = await supabase
      .from('receitas')
      .upsert({
        id: id || undefined,
        nome: receitaData.nome,
        descricao: receitaData.descricao,
        user_id: receitaData.userId,
        updated_at: new Date()
      })
      .select()
      .single();

    if (receitaError) throw receitaError;

    // Delete existing items if updating
    if (id) {
      const { error: deleteError } = await supabase
        .from('receitas_itens')
        .delete()
        .eq('receita_id', id);

      if (deleteError) throw deleteError;
    }

    // Insert new items
    if (itens.length > 0) {
      const { error: itensError } = await supabase
        .from('receitas_itens')
        .insert(
          itens.map(item => ({
            receita_id: novaReceita.id,
            insumo_id: item.insumoId,
            percentual: item.percentual
          }))
        );

      if (itensError) throw itensError;
    }
  },

  async excluirReceita(id: string): Promise<void> {
    const { error } = await supabase
      .from('receitas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};