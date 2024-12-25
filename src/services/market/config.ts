export const MARKET_CONFIG = {
  REFRESH_INTERVAL: 300000, // 5 minutes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  MOCK_MODE: true, // Enable mock mode since we don't have real API keys
  MOCK_DATA: {
    USD_BRL: 4.95,
    CRUDE_OIL: 82.50,
    NAPHTHA_FACTOR: 0.85
  },
  ENDPOINTS: {
    USD_BRL: 'https://economia.awesomeapi.com.br/last/USD-BRL'
  }
};