import React, { useState } from 'react';
import { BalanceDisplay } from '../components/trading/BalanceDisplay';
import { AssetSelector } from '../components/trading/AssetSelector';
import { TradingChart } from '../components/trading/TradingChart';
import { useTradingData } from '../hooks/useTradingData';
import { UserProfile } from '../types/trading';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface FuturesTradingPageProps {
  profile: UserProfile;
  onNavigateToTournaments: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToDeposit: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onChangeTradingType: (type: string) => void;
}
export function FuturesTradingPage({
  profile,
  onNavigateToTournaments,
  onNavigateToProfile,
  onNavigateToAnalytics,
  onNavigateToDeposit,
  onUpdateProfile,
  onChangeTradingType
}: FuturesTradingPageProps) {
  const {
    selectedAsset,
    candleData,
    assets,
    setSelectedAsset
  } = useTradingData();
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState(100);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
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
      <BalanceDisplay balance={currentBalance} currencySymbol={getCurrencySymbol()} accountType={profile.accountType} onNavigateToTournaments={onNavigateToTournaments} onNavigateToProfile={onNavigateToProfile} onNavigateToAnalytics={onNavigateToAnalytics} onNavigateToDeposit={onNavigateToDeposit} onToggleAccount={handleToggleAccount} onChangeTradingType={onChangeTradingType} currentTradingType="futures" />

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <h2 className="text-white font-semibold mb-2">Futures Trading</h2>
              <p className="text-gray-400 text-sm">
                Trade contracts with leverage up to 125x
              </p>
            </div>
            <AssetSelector assets={assets} selectedAsset={selectedAsset} onSelect={setSelectedAsset} />
            <TradingChart data={candleData} assetName={selectedAsset.name} />
          </div>

          <div className="space-y-6">
            <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Futures Order</h3>

              {/* Leverage Selector */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">
                  Leverage: {leverage}x
                </label>
                <input type="range" min="1" max="125" value={leverage} onChange={e => setLeverage(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1x</span>
                  <span>25x</span>
                  <span>50x</span>
                  <span>125x</span>
                </div>
              </div>

              {/* Order Type */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setOrderType('market')} className={`py-2 rounded-lg font-medium transition-colors ${orderType === 'market' ? 'bg-purple-500 text-white' : 'bg-[#0a0e27] text-gray-400'}`}>
                    Market
                  </button>
                  <button onClick={() => setOrderType('limit')} className={`py-2 rounded-lg font-medium transition-colors ${orderType === 'limit' ? 'bg-purple-500 text-white' : 'bg-[#0a0e27] text-gray-400'}`}>
                    Limit
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {getCurrencySymbol()}
                  </span>
                  <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full bg-[#0a0e27] text-white pl-8 pr-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Position Size: {getCurrencySymbol()}
                  {(amount * leverage).toFixed(2)}
                </p>
              </div>

              {/* Long/Short Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
                  <TrendingUpIcon className="w-5 h-5" />
                  LONG
                </button>
                <button className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
                  <TrendingDownIcon className="w-5 h-5" />
                  SHORT
                </button>
              </div>
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