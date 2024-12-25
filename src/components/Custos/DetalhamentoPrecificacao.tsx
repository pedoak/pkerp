import { Receipt, TrendingUp } from 'lucide-react';

interface DetalhamentoPrecificacaoProps {
  detalhamento: {
    custoProducao: number;
    margemLucro: number;
    impostos: {
      pis: number;
      cofins: number;
      icms: number;
      ipi: number;
      ir: number;
      csll: number;
    };
    creditosImpostos: {
      pis: number;
      cofins: number;
      icms: number;
      ipi: number;
    };
    precoFinal: number;
  };
}

export const DetalhamentoPrecificacao = ({ detalhamento }: DetalhamentoPrecificacaoProps) => {
  const formatMoeda = (valor: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Receipt className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold">Detalhamento da Precificação</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Custos e Margens</h4>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Custo de Produção:</dt>
              <dd className="font-medium">{formatMoeda(detalhamento.custoProducao)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Margem de Lucro:</dt>
              <dd className="font-medium text-green-600">
                {formatMoeda(detalhamento.margemLucro)}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-4">Impostos</h4>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">PIS:</dt>
              <dd className="font-medium">
                {formatMoeda(detalhamento.impostos.pis - detalhamento.creditosImpostos.pis)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">COFINS:</dt>
              <dd className="font-medium">
                {formatMoeda(detalhamento.impostos.cofins - detalhamento.creditosImpostos.cofins)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">ICMS:</dt>
              <dd className="font-medium">
                {formatMoeda(detalhamento.impostos.icms - detalhamento.creditosImpostos.icms)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">IPI:</dt>
              <dd className="font-medium">
                {formatMoeda(detalhamento.impostos.ipi - detalhamento.creditosImpostos.ipi)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">IR:</dt>
              <dd className="font-medium">{formatMoeda(detalhamento.impostos.ir)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">CSLL:</dt>
              <dd className="font-medium">{formatMoeda(detalhamento.impostos.csll)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-lg font-semibold">Preço Final:</span>
          </div>
          <span className="text-2xl font-bold text-green-600">
            {formatMoeda(detalhamento.precoFinal)}
          </span>
        </div>
      </div>
    </div>
  );
};