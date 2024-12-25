export interface MarketData {
  usd_brl?: number;
  timestamp?: string;
}

export interface MarketIndicator {
  title: string;
  value: string | undefined;
  icon: any;
  color: string;
  bgColor: string;
}