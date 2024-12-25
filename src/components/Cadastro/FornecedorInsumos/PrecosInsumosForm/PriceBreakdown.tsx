import { formatCurrency } from '../../../../utils/format';

interface PriceBreakdownProps {
  precoBase: number;
  ipi: number;
  icms: number;
  freteIncluso: boolean;
  custoFrete?: number;
  precoFinal: number;
}

export const PriceBreakdown = ({
  precoBase,
  ipi,
  icms,
  freteIncluso,
  custoFrete,
  precoFinal
}: PriceBreakdownProps) => {
  // Calculate tax values
  const valorIPI = precoBase * (ipi / 100);
  const valorICMS = precoBase * (icms / 100);

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Detalhamento do Preço</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Preço Base:</span>
          <p className="font-medium">{formatCurrency(precoBase)}/kg</p>
        </div>
        <div>
          <span className="text-gray-500">IPI ({ipi}%):</span>
          <p className="font-medium">{formatCurrency(valorIPI)}/kg</p>
        </div>
        <div>
          <span className="text-gray-500">ICMS ({icms}%):</span>
          <p className="font-medium">{formatCurrency(valorICMS)}/kg</p>
        </div>
        {!freteIncluso && custoFrete && custoFrete > 0 && (
          <div>
            <span className="text-gray-500">Frete:</span>
            <p className="font-medium">{formatCurrency(custoFrete)}/kg</p>
          </div>
        )}
        <div className="col-span-2 pt-3 border-t border-gray-200">
          <span className="text-gray-700 font-medium">Preço Final:</span>
          <p className="text-xl font-bold text-blue-600">{formatCurrency(precoFinal)}/kg</p>
          <p className="text-xs text-gray-500 mt-1">
            (Base + IPI + ICMS {!freteIncluso && custoFrete && custoFrete > 0 ? '+ Frete' : ''})
          </p>
        </div>
      </div>
    </div>
  );
};