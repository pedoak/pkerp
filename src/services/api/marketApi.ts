import { MARKET_CONFIG } from '../market/config';

export const fetchUsdBrl = async () => {
  try {
    const response = await fetch(MARKET_CONFIG.ENDPOINTS.USD_BRL);
    if (!response.ok) throw new Error('Failed to fetch USD/BRL rate');
    const data = await response.json();
    return Number(data.USDBRL?.bid) || null;
  } catch (error) {
    console.error('Error fetching USD/BRL:', error);
    return null;
  }
};

export const fetchCrudeOil = async () => {
  try {
    const url = `${MARKET_CONFIG.ENDPOINTS.CRUDE_OIL}?function=WTI&interval=daily&apikey=${MARKET_CONFIG.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch crude oil price');
    const data = await response.json();
    return Number(data?.data?.[0]?.value) || null;
  } catch (error) {
    console.error('Error fetching crude oil:', error);
    return null;
  }
};