import { MARKET_CONFIG } from './config';

export const calculateNaphthaPrice = (crudeOilPrice: number): number => {
  return crudeOilPrice * MARKET_CONFIG.MOCK_DATA.NAPHTHA_FACTOR;
};