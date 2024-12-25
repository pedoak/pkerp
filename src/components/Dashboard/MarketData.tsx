import { TrendingUp, DollarSign, Droplet } from 'lucide-react';
import { useMarketData } from '../../services/marketDataService';

export const MarketData = () => {
  const { data, loading, error } = useMarketData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800">
        {error}
      </div>
    );
  }

  const indicators = [
    {
      title: 'Dólar',
      value: data.usd_brl?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Petróleo Bruto (WTI)',
      value: data.crude_oil?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      icon: Droplet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Nafta',
      value: data.naphtha?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {indicators.map((indicator) => {
        const Icon = indicator.icon;
        return (
          <div key={indicator.title} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{indicator.title}</p>
                <p className="text-2xl font-semibold mt-1">{indicator.value}</p>
              </div>
              <div className={`p-3 rounded-full ${indicator.bgColor}`}>
                <Icon className={`w-6 h-6 ${indicator.color}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Última atualização: {new Date(data.timestamp || '').toLocaleString('pt-BR')}
            </p>
          </div>
        );
      })}
    </div>
  );
};