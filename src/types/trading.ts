export interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}
export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
export interface Trade {
  id: string;
  asset: string;
  type: 'call' | 'put';
  amount: number;
  openPrice: number;
  closePrice?: number;
  openTime: number;
  closeTime?: number;
  duration: number;
  profit?: number;
  status: 'active' | 'won' | 'lost';
}
export interface TradingState {
  balance: number;
  selectedAsset: Asset;
  tradeAmount: number;
  duration: number;
  activeTrades: Trade[];
  tradeHistory: Trade[];
}
export interface UserProfile {
  name: string;
  email: string;
  country: string;
  currency: string;
  phone: string;
  accountType: 'demo' | 'real';
  joinDate: string;
  demoBalance: number;
  realBalance: number;
}
export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}
export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}