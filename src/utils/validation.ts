import { PrecoInsumo } from '../types/precoInsumo';
import { Receita } from '../types/receita';

export const validatePrecoInsumo = (preco: PrecoInsumo): boolean => {
  if (!preco.fornecedor_id || !preco.insumo_id) return false;
  if (preco.preco_base < 0 || preco.ipi < 0 || preco.icms < 0) return false;
  return true;
};

export const validateReceita = (receita: Receita): boolean => {
  if (!receita.nome || !receita.itens?.length) return false;
  
  const totalPercentual = receita.itens.reduce(
    (sum, item) => sum + item.percentual, 
    0
  );
  
  return Math.abs(totalPercentual - 100) < 0.01;
};