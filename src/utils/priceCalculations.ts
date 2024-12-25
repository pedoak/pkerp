interface PriceComponents {
  precoBase: number;
  ipi: number;
  icms: number;
  freteIncluso: boolean;
  custoFrete?: number;
}

export const calculateTaxValues = ({ precoBase, ipi, icms }: PriceComponents) => {
  const valorIPI = precoBase * (ipi / 100);
  const valorICMS = precoBase * (icms / 100);
  
  return {
    valorIPI,
    valorICMS
  };
};

export const calculateFinalPrice = (components: PriceComponents): number => {
  const { precoBase, freteIncluso, custoFrete } = components;
  const { valorIPI, valorICMS } = calculateTaxValues(components);
  
  let precoFinal = precoBase + valorIPI + valorICMS;
  
  if (!freteIncluso && custoFrete && custoFrete > 0) {
    precoFinal += custoFrete;
  }
  
  return Number(precoFinal.toFixed(2));
};