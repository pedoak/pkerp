import { supabase } from '../lib/supabase';
import { 
  CustosFixos, 
  CustosVariaveis, 
  CustosDepreciacao, 
  CustosOverhead 
} from '../types/custos';

export const custosService = {
  async obterCustosFixos(userId: string): Promise<CustosFixos | null> {
    const { data, error } = await supabase
      .from('custos_fixos')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async salvarCustosFixos(custos: CustosFixos, userId: string): Promise<void> {
    const { error } = await supabase
      .from('custos_fixos')
      .upsert({
        ...custos,
        user_id: userId,
        updated_at: new Date()
      });

    if (error) throw error;
  },

  async obterCustosVariaveis(userId: string): Promise<CustosVariaveis | null> {
    const { data, error } = await supabase
      .from('custos_variaveis')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async salvarCustosVariaveis(custos: CustosVariaveis, userId: string): Promise<void> {
    const { error } = await supabase
      .from('custos_variaveis')
      .upsert({
        ...custos,
        user_id: userId,
        updated_at: new Date()
      });

    if (error) throw error;
  },

  async obterCustosDepreciacao(userId: string): Promise<CustosDepreciacao[]> {
    const { data, error } = await supabase
      .from('custos_depreciacao')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async salvarCustosDepreciacao(custos: CustosDepreciacao, userId: string): Promise<void> {
    const { error } = await supabase
      .from('custos_depreciacao')
      .upsert({
        ...custos,
        user_id: userId,
        updated_at: new Date()
      });

    if (error) throw error;
  },

  async obterCustosOverhead(userId: string): Promise<CustosOverhead | null> {
    const { data, error } = await supabase
      .from('custos_overhead')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async salvarCustosOverhead(custos: CustosOverhead, userId: string): Promise<void> {
    const { error } = await supabase
      .from('custos_overhead')
      .upsert({
        ...custos,
        user_id: userId,
        updated_at: new Date()
      });

    if (error) throw error;
  }
};