import { MARKET_CONFIG } from './config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryFetch = async (url: string, attempts: number = MARKET_CONFIG.RETRY_ATTEMPTS) => {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await delay(MARKET_CONFIG.RETRY_DELAY * (i + 1));
    }
  }
};

export const fetchUsdBrl = async () => {
  if (MARKET_CONFIG.MOCK_MODE) {
    return MARKET_CONFIG.MOCK_DATA.USD_BRL;
  }

  try {
    const data = await retryFetch(MARKET_CONFIG.ENDPOINTS.USD_BRL);
    if (!data?.USDBRL?.bid) {
      console.warn('Invalid USD/BRL data format, using mock data');
      return MARKET_CONFIG.MOCK_DATA.USD_BRL;
    }
    return Number(data.USDBRL.bid);
  } catch (error) {
    console.warn('Error fetching USD/BRL, using mock data:', error);
    return MARKET_CONFIG.MOCK_DATA.USD_BRL;
  }
};