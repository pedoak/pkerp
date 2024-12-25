// Base price calculation without taxes
export const calcularPrecoBase = (
  precoBase: number,
  incluirFrete: boolean = false,
  custoFrete: number = 0
): number => {
  let precoFinal = precoBase;
  
  // Add freight if applicable
  if (!incluirFrete && custoFrete > 0) {
    precoFinal += custoFrete;
  }
  
  return Number(precoFinal.toFixed(2));
};

// Final price calculation with taxes
export const calcularPrecoFinal = (
  precoBase: number,
  ipi: number,
  icms: number,
  incluirFrete: boolean = false,
  custoFrete: number = 0
): number => {
  // Calculate IPI amount
  const valorIPI = precoBase * (ipi / 100);
  
  // Calculate ICMS amount
  const valorICMS = precoBase * (icms / 100);
  
  // Sum all components
  let precoFinal = precoBase + valorIPI + valorICMS;
  
  // Add freight if applicable
  if (!incluirFrete && custoFrete > 0) {
    precoFinal += custoFrete;
  }
  
  return Number(precoFinal.toFixed(2));
};

// Export tax calculation functions
export const calcularValorIPI = (precoBase: number, ipi: number): number => {
  return Number((precoBase * (ipi / 100)).toFixed(2));
};

export const calcularValorICMS = (precoBase: number, icms: number): number => {
  return Number((precoBase * (icms / 100)).toFixed(2));
};