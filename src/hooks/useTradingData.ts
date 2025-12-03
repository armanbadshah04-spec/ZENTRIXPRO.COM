import { useState, useEffect } from 'react';
import { Asset, CandleData, Trade, TradingState } from '../types/trading';
const MOCK_ASSETS: Asset[] = [
// Forex Pairs
{
  id: '1',
  name: 'EUR/USD',
  symbol: 'EURUSD',
  price: 1.0856,
  change: 0.0023,
  changePercent: 0.21
}, {
  id: '2',
  name: 'GBP/USD',
  symbol: 'GBPUSD',
  price: 1.2634,
  change: -0.0015,
  changePercent: -0.12
}, {
  id: '3',
  name: 'USD/JPY',
  symbol: 'USDJPY',
  price: 148.25,
  change: 0.85,
  changePercent: 0.58
}, {
  id: '4',
  name: 'AUD/USD',
  symbol: 'AUDUSD',
  price: 0.6542,
  change: -0.0032,
  changePercent: -0.49
}, {
  id: '5',
  name: 'USD/CAD',
  symbol: 'USDCAD',
  price: 1.3456,
  change: 0.0078,
  changePercent: 0.58
}, {
  id: '6',
  name: 'NZD/USD',
  symbol: 'NZDUSD',
  price: 0.6123,
  change: 0.0045,
  changePercent: 0.74
}, {
  id: '7',
  name: 'EUR/GBP',
  symbol: 'EURGBP',
  price: 0.8594,
  change: -0.0021,
  changePercent: -0.24
}, {
  id: '8',
  name: 'USD/CHF',
  symbol: 'USDCHF',
  price: 0.8745,
  change: 0.0034,
  changePercent: 0.39
},
// Cryptocurrencies
{
  id: '9',
  name: 'BTC/USD',
  symbol: 'BTCUSD',
  price: 43250.5,
  change: 1250.3,
  changePercent: 2.98
}, {
  id: '10',
  name: 'ETH/USD',
  symbol: 'ETHUSD',
  price: 2280.75,
  change: -45.2,
  changePercent: -1.94
}, {
  id: '11',
  name: 'XRP/USD',
  symbol: 'XRPUSD',
  price: 0.5834,
  change: 0.0234,
  changePercent: 4.18
}, {
  id: '12',
  name: 'LTC/USD',
  symbol: 'LTCUSD',
  price: 72.45,
  change: -2.15,
  changePercent: -2.88
}, {
  id: '13',
  name: 'ADA/USD',
  symbol: 'ADAUSD',
  price: 0.4523,
  change: 0.0187,
  changePercent: 4.31
}, {
  id: '14',
  name: 'SOL/USD',
  symbol: 'SOLUSD',
  price: 98.34,
  change: 5.67,
  changePercent: 6.12
},
// Commodities
{
  id: '15',
  name: 'Gold',
  symbol: 'XAUUSD',
  price: 2045.8,
  change: 12.4,
  changePercent: 0.61
}, {
  id: '16',
  name: 'Silver',
  symbol: 'XAGUSD',
  price: 23.45,
  change: -0.34,
  changePercent: -1.43
}, {
  id: '17',
  name: 'Oil (WTI)',
  symbol: 'WTIUSD',
  price: 72.85,
  change: 1.23,
  changePercent: 1.72
}, {
  id: '18',
  name: 'Oil (Brent)',
  symbol: 'BRNUSD',
  price: 78.12,
  change: 0.98,
  changePercent: 1.27
},
// Stocks
{
  id: '19',
  name: 'Apple',
  symbol: 'AAPL',
  price: 185.23,
  change: 2.45,
  changePercent: 1.34
}, {
  id: '20',
  name: 'Tesla',
  symbol: 'TSLA',
  price: 242.67,
  change: -5.23,
  changePercent: -2.11
}, {
  id: '21',
  name: 'Amazon',
  symbol: 'AMZN',
  price: 152.34,
  change: 3.12,
  changePercent: 2.09
}, {
  id: '22',
  name: 'Google',
  symbol: 'GOOGL',
  price: 138.45,
  change: 1.87,
  changePercent: 1.37
}, {
  id: '23',
  name: 'Microsoft',
  symbol: 'MSFT',
  price: 378.92,
  change: -2.34,
  changePercent: -0.61
},
// ZENTRIX Custom Pairs
{
  id: '24',
  name: 'ZENTRIX/USD',
  symbol: 'ZNTXUSD',
  price: 12.45,
  change: 0.87,
  changePercent: 7.51
}, {
  id: '25',
  name: 'ZENTRIX/BTC',
  symbol: 'ZNTXBTC',
  price: 0.000288,
  change: 0.000015,
  changePercent: 5.49
}, {
  id: '26',
  name: 'ZENTRIX/ETH',
  symbol: 'ZNTXETH',
  price: 0.00546,
  change: -0.00023,
  changePercent: -4.04
}, {
  id: '27',
  name: 'ZTX/USD',
  symbol: 'ZTXUSD',
  price: 12.45,
  change: 0.87,
  changePercent: 7.51
}];
export function useTradingData() {
  const [state, setState] = useState<TradingState>({
    balance: 10000,
    selectedAsset: MOCK_ASSETS[0],
    tradeAmount: 100,
    duration: 60,
    activeTrades: [],
    tradeHistory: []
  });
  const [candleData, setCandleData] = useState<CandleData[]>([]);

  // Generate initial candle data
  useEffect(() => {
    const generateCandles = () => {
      const candles: CandleData[] = [];
      let basePrice = state.selectedAsset.price;
      const now = Date.now();
      for (let i = 50; i >= 0; i--) {
        const volatility = basePrice * 0.002;
        const open = basePrice + (Math.random() - 0.5) * volatility;
        const close = open + (Math.random() - 0.5) * volatility;
        const high = Math.max(open, close) + Math.random() * volatility * 0.5;
        const low = Math.min(open, close) - Math.random() * volatility * 0.5;
        candles.push({
          time: now - i * 60000,
          open,
          high,
          low,
          close
        });
        basePrice = close;
      }
      return candles;
    };
    setCandleData(generateCandles());
  }, [state.selectedAsset]);

  // Update candle data in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCandleData(prev => {
        const lastCandle = prev[prev.length - 1];
        const volatility = state.selectedAsset.price * 0.002;
        const newClose = lastCandle.close + (Math.random() - 0.5) * volatility;
        const newCandle: CandleData = {
          time: Date.now(),
          open: lastCandle.close,
          high: Math.max(lastCandle.close, newClose) + Math.random() * volatility * 0.3,
          low: Math.min(lastCandle.close, newClose) - Math.random() * volatility * 0.3,
          close: newClose
        };
        return [...prev.slice(-50), newCandle];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [state.selectedAsset]);

  // Update active trades
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const now = Date.now();
        const updatedActiveTrades: Trade[] = [];
        const newHistory: Trade[] = [];
        prev.activeTrades.forEach(trade => {
          const elapsed = now - trade.openTime;
          if (elapsed >= trade.duration * 1000) {
            const currentPrice = candleData[candleData.length - 1]?.close || trade.openPrice;
            const won = trade.type === 'call' && currentPrice > trade.openPrice || trade.type === 'put' && currentPrice < trade.openPrice;
            const profit = won ? trade.amount * 0.85 : -trade.amount;
            newHistory.push({
              ...trade,
              closePrice: currentPrice,
              closeTime: now,
              profit,
              status: won ? 'won' : 'lost'
            });
          } else {
            updatedActiveTrades.push(trade);
          }
        });
        return {
          ...prev,
          activeTrades: updatedActiveTrades,
          tradeHistory: [...newHistory, ...prev.tradeHistory].slice(0, 20),
          balance: prev.balance + newHistory.reduce((sum, t) => sum + (t.profit || 0), 0)
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [candleData]);
  const placeTrade = (type: 'call' | 'put') => {
    if (state.tradeAmount > state.balance) {
      alert('Insufficient balance!');
      return;
    }
    const currentPrice = candleData[candleData.length - 1]?.close || state.selectedAsset.price;
    const newTrade: Trade = {
      id: Date.now().toString(),
      asset: state.selectedAsset.symbol,
      type,
      amount: state.tradeAmount,
      openPrice: currentPrice,
      openTime: Date.now(),
      duration: state.duration,
      status: 'active'
    };
    setState(prev => ({
      ...prev,
      balance: prev.balance - state.tradeAmount,
      activeTrades: [...prev.activeTrades, newTrade]
    }));
  };
  const setSelectedAsset = (asset: Asset) => {
    setState(prev => ({
      ...prev,
      selectedAsset: asset
    }));
  };
  const setTradeAmount = (amount: number) => {
    setState(prev => ({
      ...prev,
      tradeAmount: amount
    }));
  };
  const setDuration = (duration: number) => {
    setState(prev => ({
      ...prev,
      duration
    }));
  };
  return {
    ...state,
    candleData,
    assets: MOCK_ASSETS,
    placeTrade,
    setSelectedAsset,
    setTradeAmount,
    setDuration
  };
}