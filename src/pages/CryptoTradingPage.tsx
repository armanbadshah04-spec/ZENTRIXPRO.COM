import React, { useState } from 'react';
import { BalanceDisplay } from '../components/trading/BalanceDisplay';
import { TradingChart } from '../components/trading/TradingChart';
import { useTradingData } from '../hooks/useTradingData';
import { UserProfile } from '../types/trading';
import { CoinsIcon } from 'lucide-react';
interface CryptoTradingPageProps {
  profile: UserProfile;
  onNavigateToTournaments: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToDeposit: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onChangeTradingType: (type: string) => void;
}
const CRYPTO_PAIRS = [{
  id: '1',
  name: 'BTC/USD',
  symbol: 'BTCUSD',
  price: 43250.5,
  change: 2.98
}, {
  id: '2',
  name: 'ETH/USD',
  symbol: 'ETHUSD',
  price: 2280.75,
  change: -1.94
}, {
  id: '3',
  name: 'XRP/USD',
  symbol: 'XRPUSD',
  price: 0.5834,
  change: 4.18
}, {
  id: '4',
  name: 'LTC/USD',
  symbol: 'LTCUSD',
  price: 72.45,
  change: -2.88
}, {
  id: '5',
  name: 'ADA/USD',
  symbol: 'ADAUSD',
  price: 0.4523,
  change: 4.31
}, {
  id: '6',
  name: 'SOL/USD',
  symbol: 'SOLUSD',
  price: 98.34,
  change: 6.12
}, {
  id: '7',
  name: 'DOGE/USD',
  symbol: 'DOGEUSD',
  price: 0.0823,
  change: 1.45
}, {
  id: '8',
  name: 'DOT/USD',
  symbol: 'DOTUSD',
  price: 6.78,
  change: -0.89
}];
export function CryptoTradingPage({
  profile,
  onNavigateToTournaments,
  onNavigateToProfile,
  onNavigateToAnalytics,
  onNavigateToDeposit,
  onUpdateProfile,
  onChangeTradingType
}: CryptoTradingPageProps) {
  const {
    candleData
  } = useTradingData();
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_PAIRS[0]);
  const [amount, setAmount] = useState(100);
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
  return <div className="min-h-screen bg-[#0a0e27]">
      <BalanceDisplay balance={currentBalance} currencySymbol={getCurrencySymbol()} accountType={profile.accountType} onNavigateToTournaments={onNavigateToTournaments} onNavigateToProfile={onNavigateToProfile} onNavigateToAnalytics={onNavigateToAnalytics} onNavigateToDeposit={onNavigateToDeposit} onToggleAccount={handleToggleAccount} onChangeTradingType={onChangeTradingType} currentTradingType="crypto" />

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_400px] gap-6">
          {/* Crypto List */}
          <div className="bg-[#0f1535] rounded-lg border border-gray-800 p-4 h-fit">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <CoinsIcon className="w-5 h-5 text-yellow-400" />
              Cryptocurrencies
            </h3>
            <div className="space-y-2">
              {CRYPTO_PAIRS.map(crypto => <button key={crypto.id} onClick={() => setSelectedCrypto(crypto)} className={`w-full p-3 rounded-lg transition-colors text-left ${selectedCrypto.id === crypto.id ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-[#0a0e27] hover:bg-gray-800'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      {crypto.symbol}
                    </span>
                    <span className={`text-sm ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.change >= 0 ? '+' : ''}
                      {crypto.change}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ${crypto.price.toFixed(2)}
                  </div>
                </button>)}
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h2 className="text-white font-semibold mb-2">Crypto Trading</h2>
              <p className="text-gray-400 text-sm">
                Trade popular cryptocurrencies 24/7
              </p>
            </div>
            <TradingChart data={candleData} assetName={selectedCrypto.name} />
          </div>

          {/* Trading Panel */}
          <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800 h-fit">
            <h3 className="text-white font-semibold mb-4">
              Buy/Sell {selectedCrypto.symbol}
            </h3>

            <div className="mb-6">
              <div className="bg-[#0a0e27] rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm mb-1">Current Price</p>
                <p className="text-2xl font-bold text-white">
                  ${selectedCrypto.price.toFixed(2)}
                </p>
                <p className={`text-sm ${selectedCrypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedCrypto.change >= 0 ? '+' : ''}
                  {selectedCrypto.change}%
                </p>
              </div>

              <label className="text-sm text-gray-400 mb-2 block">Amount</label>
              <div className="relative mb-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {getCurrencySymbol()}
                </span>
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full bg-[#0a0e27] text-white pl-8 pr-4 py-3 rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none" />
              </div>
              <p className="text-xs text-gray-500">
                ≈ {(amount / selectedCrypto.price).toFixed(6)}{' '}
                {selectedCrypto.symbol.replace('/USD', '')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/20">
                BUY
              </button>
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/20">
                SELL
              </button>
            </div>
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