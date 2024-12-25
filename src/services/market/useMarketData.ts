import { useState, useEffect, useCallback } from 'react';
import { MarketData } from './types';
import { fetchUsdBrl, fetchCrudeOil } from '../api/marketApi';
import { calculateNaphthaPrice } from './calculations';
import { MARKET_CONFIG } from './config';

export const useMarketData = () => {
  const [data, setData] = useState<MarketData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [usdBrl, crudeOil] = await Promise.all([
        fetchUsdBrl(),
        fetchCrudeOil()
      ]);

      if (!usdBrl || !crudeOil) {
        throw new Error('Failed to fetch market data');
      }

      setData({
        usd_brl: usdBrl,
        crude_oil: crudeOil,
        naphtha: calculateNaphthaPrice(crudeOil),
        timestamp: new Date().toISOString()
      });
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados de mercado');
      console.error('Error fetching market data:', err);
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
    fetchData();
  };

  return { data, loading, error, retry };
};