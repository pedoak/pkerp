import { supabase } from '../lib/supabase';
import { Insumo } from '../types/insumo';

export const insumoService = {
  async listarInsumos(userId: string): Promise<Insumo[]> {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('insumos')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return (data || []).map(item => ({
      id: item.id,
      nome: item.nome,
      grade: item.grade,
      tipo: item.tipo,
      origem: item.origem,
      densidade: Number(item.densidade),
      indiceFluidez: Number(item.indice_fluidez),
      comonomero: item.comonomero,
      catalisador: item.catalisador,
      deslizante: item.deslizante,
      deslizantePPM: item.deslizante_ppm ? Number(item.deslizante_ppm) : undefined,
      auxiliarFluxo: item.auxiliar_fluxo,
      auxiliarFluxoPPM: item.auxiliar_fluxo_ppm ? Number(item.auxiliar_fluxo_ppm) : undefined,
      antibloqueio: item.antibloqueio,
      antibloqueioPPM: item.antibloqueio_ppm ? Number(item.antibloqueio_ppm) : undefined,
      userId: item.user_id,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at)
    }));
  },

  async salvarInsumo(insumo: Insumo): Promise<void> {
    if (!insumo.userId) throw new Error('ID do usuário é obrigatório');

    const dadosInsumo = {
      nome: insumo.nome,
      grade: insumo.grade,
      tipo: insumo.tipo,
      origem: insumo.origem,
      densidade: Number(insumo.densidade),
      indice_fluidez: Number(insumo.indiceFluidez),
      comonomero: insumo.comonomero,
      catalisador: insumo.catalisador,
      deslizante: insumo.deslizante,
      deslizante_ppm: insumo.deslizante === 'SIM' ? Number(insumo.deslizantePPM) : null,
      auxiliar_fluxo: insumo.auxiliarFluxo,
      auxiliar_fluxo_ppm: insumo.auxiliarFluxo === 'SIM' ? Number(insumo.auxiliarFluxoPPM) : null,
      antibloqueio: insumo.antibloqueio,
      antibloqueio_ppm: insumo.antibloqueio === 'SIM' ? Number(insumo.antibloqueioPPM) : null,
      user_id: insumo.userId,
      updated_at: new Date()
    };

    if (insumo.id) {
      const { error } = await supabase
        .from('insumos')
        .update(dadosInsumo)
        .eq('id', insumo.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('insumos')
        .insert({
          ...dadosInsumo,
          created_at: new Date()
        });

      if (error) throw error;
    }
  },

  async excluirInsumo(id: string): Promise<void> {
    const { error } = await supabase
      .from('insumos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};