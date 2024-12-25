import { useState, useEffect } from 'react';

const API_KEY = 'YOUR_API_KEY'; // You'll need to get a free API key from Alpha Vantage

interface MarketData {
  crude_oil?: number;
  naphtha?: number;
  usd_brl?: number;
  timestamp?: string;
}

export const useMarketData = () => {
  const [data, setData] = useState<MarketData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch USD/BRL exchange rate
      const usdResponse = await fetch(
        'https://economia.awesomeapi.com.br/last/USD-BRL'
      );
      const usdData = await usdResponse.json();
      
      // Fetch crude oil price
      const oilResponse = await fetch(
        'https://www.alphavantage.co/query?function=WTI&interval=daily&apikey=' + API_KEY
      );
      const oilData = await oilResponse.json();

      setData({
        usd_brl: Number(usdData.USDBRL.bid),
        crude_oil: Number(oilData['data'][0].value),
        naphtha: Number(oilData['data'][0].value) * 0.85, // Approximate naphtha price based on crude oil
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError('Erro ao carregar dados de mercado');
      console.error('Error fetching market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};