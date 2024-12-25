import { DollarSign, RefreshCw } from 'lucide-react';
import { useMarketData } from '../../../services/market/hooks/useMarketData';
import { MarketCard } from './MarketCard';

export const MarketData = () => {
  const { data, loading, error, retry } = useMarketData();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white p-6 rounded-lg shadow-md h-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-red-800">{error}</p>
          <button
            onClick={retry}
            className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm">
      <MarketCard
        title="Dólar"
        value={data.usd_brl?.toLocaleString('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        })}
        icon={DollarSign}
        color="text-green-600"
        bgColor="bg-green-100"
        timestamp={data.timestamp}
      />
    </div>
  );
};