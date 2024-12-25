export const calcularCustoMaoDeObra = (
  horasProducao: number,
  custoDiaria: number,
  numeroOperadores: number
): number => {
  // Calcula dias necessários (arredonda para cima)
  const diasProducao = Math.ceil(horasProducao / 8);
  return diasProducao * custoDiaria * numeroOperadores;
};