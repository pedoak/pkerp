export const calcularCustosVariaveis = (
  quantidade: number,
  custoManutencaoKg: number,
  outrosCustosKg: number
) => {
  const custoManutencao = quantidade * custoManutencaoKg;
  const outrosCustos = quantidade * outrosCustosKg;

  return {
    custoManutencao,
    outrosCustos,
    custoVariavelTotal: custoManutencao + outrosCustos
  };
};