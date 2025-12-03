import React, { useState } from 'react';
import { BalanceDisplay } from '../components/trading/BalanceDisplay';
import { TradingChart } from '../components/trading/TradingChart';
import { useTradingData } from '../hooks/useTradingData';
import { UserProfile } from '../types/trading';
import { TrendingUpIcon } from 'lucide-react';
interface StockTradingPageProps {
  profile: UserProfile;
  onNavigateToTournaments: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToDeposit: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onChangeTradingType: (type: string) => void;
}
const STOCKS = [{
  id: '1',
  name: 'Apple Inc.',
  symbol: 'AAPL',
  price: 185.23,
  change: 1.34
}, {
  id: '2',
  name: 'Tesla Inc.',
  symbol: 'TSLA',
  price: 242.67,
  change: -2.11
}, {
  id: '3',
  name: 'Amazon.com',
  symbol: 'AMZN',
  price: 152.34,
  change: 2.09
}, {
  id: '4',
  name: 'Alphabet Inc.',
  symbol: 'GOOGL',
  price: 138.45,
  change: 1.37
}, {
  id: '5',
  name: 'Microsoft Corp.',
  symbol: 'MSFT',
  price: 378.92,
  change: -0.61
}, {
  id: '6',
  name: 'NVIDIA Corp.',
  symbol: 'NVDA',
  price: 495.22,
  change: 3.45
}, {
  id: '7',
  name: 'Meta Platforms',
  symbol: 'META',
  price: 356.78,
  change: 2.12
}, {
  id: '8',
  name: 'Netflix Inc.',
  symbol: 'NFLX',
  price: 478.34,
  change: -1.23
}];
export function StockTradingPage({
  profile,
  onNavigateToTournaments,
  onNavigateToProfile,
  onNavigateToAnalytics,
  onNavigateToDeposit,
  onUpdateProfile,
  onChangeTradingType
}: StockTradingPageProps) {
  const {
    candleData
  } = useTradingData();
  const [selectedStock, setSelectedStock] = useState(STOCKS[0]);
  const [shares, setShares] = useState(1);
  const handleToggleAccount = () => {
    const newAccountType = profile.accountType === 'demo' ? 'real' : 'demo';
    onUpdateProfile({
      ...profile,
      accountType: newAccountType
    });
  };
  const currentBalance = profile.accountType === 'demo' ? profile.demoBalance : profile.realBalance;
  const getCurrencySymbol = () => {
    const symbols: {
      [key: string]: string;
    } = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'Fr',
      INR: '₹',
      PKR: '₨',
      BDT: '৳',
      AED: 'د.إ',
      SAR: '﷼',
      TRY: '₺',
      BRL: 'R$',
      MXN: 'Mex$',
      ZAR: 'R',
      NGN: '₦',
      EGP: 'E£',
      KRW: '₩',
      CNY: '¥',
      SGD: 'S$',
      MYR: 'RM',
      IDR: 'Rp',
      THB: '฿',
      PHP: '₱'
    };
    return symbols[profile.currency] || '$';
  };
  const totalCost = shares * selectedStock.price;
  return <div className="min-h-screen bg-[#0a0e27]">
      <BalanceDisplay balance={currentBalance} currencySymbol={getCurrencySymbol()} accountType={profile.accountType} onNavigateToTournaments={onNavigateToTournaments} onNavigateToProfile={onNavigateToProfile} onNavigateToAnalytics={onNavigateToAnalytics} onNavigateToDeposit={onNavigateToDeposit} onToggleAccount={handleToggleAccount} onChangeTradingType={onChangeTradingType} currentTradingType="stock" />

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_400px] gap-6">
          {/* Stock List */}
          <div className="bg-[#0f1535] rounded-lg border border-gray-800 p-4 h-fit">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-blue-400" />
              Top Stocks
            </h3>
            <div className="space-y-2">
              {STOCKS.map(stock => <button key={stock.id} onClick={() => setSelectedStock(stock)} className={`w-full p-3 rounded-lg transition-colors text-left ${selectedStock.id === stock.id ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-[#0a0e27] hover:bg-gray-800'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      {stock.symbol}
                    </span>
                    <span className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? '+' : ''}
                      {stock.change}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{stock.name}</div>
                  <div className="text-sm text-white mt-1">
                    ${stock.price.toFixed(2)}
                  </div>
                </button>)}
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg p-4">
              <h2 className="text-white font-semibold mb-2">Stock Trading</h2>
              <p className="text-gray-400 text-sm">
                Invest in top companies and build your portfolio
              </p>
            </div>
            <TradingChart data={candleData} assetName={selectedStock.name} />
          </div>

          {/* Trading Panel */}
          <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800 h-fit">
            <h3 className="text-white font-semibold mb-4">
              Buy {selectedStock.symbol}
            </h3>

            <div className="mb-6">
              <div className="bg-[#0a0e27] rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm mb-1">
                  {selectedStock.name}
                </p>
                <p className="text-2xl font-bold text-white">
                  ${selectedStock.price.toFixed(2)}
                </p>
                <p className={`text-sm ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedStock.change >= 0 ? '+' : ''}
                  {selectedStock.change}% today
                </p>
              </div>

              <label className="text-sm text-gray-400 mb-2 block">
                Number of Shares
              </label>
              <input type="number" value={shares} onChange={e => setShares(Number(e.target.value))} min="1" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none mb-4" />

              <div className="bg-[#0a0e27] rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shares</span>
                  <span className="text-white">{shares}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price per share</span>
                  <span className="text-white">
                    ${selectedStock.price.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-800 pt-2 flex justify-between">
                  <span className="text-gray-400">Total Cost</span>
                  <span className="text-white font-bold">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button disabled={totalCost > currentBalance} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
              Buy {shares} {shares === 1 ? 'Share' : 'Shares'}
            </button>

            {totalCost > currentBalance && <p className="text-red-400 text-sm mt-3 text-center">
                Insufficient balance
              </p>}
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          App made by{' '}
          <span className="text-cyan-400 font-semibold">Arman Badshah</span>
        </p>
      </div>
    </div>;
}