import { useState, useEffect, useCallback } from 'react';
import { MarketData } from '../types';
import { fetchUsdBrl } from '../api';
import { MARKET_CONFIG } from '../config';

export const useMarketData = () => {
  const [data, setData] = useState<MarketData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const usdBrl = await fetchUsdBrl();

      if (usdBrl === null) {
        throw new Error('Não foi possível obter a cotação do dólar');
      }

      setData({
        usd_brl: usdBrl,
        timestamp: new Date().toISOString()
      });
      
      setError(null);
    } catch (err) {
      setError('Erro ao carregar cotação do dólar');
      console.error('Error fetching USD/BRL:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, MARKET_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  const retry = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return { data, loading, error, retry };
};