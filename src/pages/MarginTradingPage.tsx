import React, { useState } from 'react';
import { BalanceDisplay } from '../components/trading/BalanceDisplay';
import { AssetSelector } from '../components/trading/AssetSelector';
import { TradingChart } from '../components/trading/TradingChart';
import { useTradingData } from '../hooks/useTradingData';
import { UserProfile } from '../types/trading';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface MarginTradingPageProps {
  profile: UserProfile;
  onNavigateToTournaments: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToDeposit: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onChangeTradingType: (type: string) => void;
}
export function MarginTradingPage({
  profile,
  onNavigateToTournaments,
  onNavigateToProfile,
  onNavigateToAnalytics,
  onNavigateToDeposit,
  onUpdateProfile,
  onChangeTradingType
}: MarginTradingPageProps) {
  const {
    selectedAsset,
    candleData,
    assets,
    setSelectedAsset
  } = useTradingData();
  const [marginLevel, setMarginLevel] = useState(3);
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
  const borrowAmount = amount * (marginLevel - 1);
  const totalPosition = amount * marginLevel;
  return <div className="min-h-screen bg-[#0a0e27]">
      <BalanceDisplay balance={currentBalance} currencySymbol={getCurrencySymbol()} accountType={profile.accountType} onNavigateToTournaments={onNavigateToTournaments} onNavigateToProfile={onNavigateToProfile} onNavigateToAnalytics={onNavigateToAnalytics} onNavigateToDeposit={onNavigateToDeposit} onToggleAccount={handleToggleAccount} onChangeTradingType={onChangeTradingType} currentTradingType="margin" />

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4">
              <h2 className="text-white font-semibold mb-2">Margin Trading</h2>
              <p className="text-gray-400 text-sm">
                Borrow funds to amplify your trading power up to 10x
              </p>
            </div>
            <AssetSelector assets={assets} selectedAsset={selectedAsset} onSelect={setSelectedAsset} />
            <TradingChart data={candleData} assetName={selectedAsset.name} />
          </div>

          <div className="space-y-6">
            <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Margin Order</h3>

              {/* Margin Level */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">
                  Margin Level: {marginLevel}x
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 3, 5, 7, 10].map(level => <button key={level} onClick={() => setMarginLevel(level)} className={`py-2 rounded-lg font-medium transition-colors ${marginLevel === level ? 'bg-orange-500 text-white' : 'bg-[#0a0e27] text-gray-400'}`}>
                      {level}x
                    </button>)}
                </div>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">
                  Your Funds
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {getCurrencySymbol()}
                  </span>
                  <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full bg-[#0a0e27] text-white pl-8 pr-4 py-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none" />
                </div>
              </div>

              {/* Margin Details */}
              <div className="bg-[#0a0e27] rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Your Funds</span>
                  <span className="text-white font-medium">
                    {getCurrencySymbol()}
                    {amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Borrowed</span>
                  <span className="text-orange-400 font-medium">
                    {getCurrencySymbol()}
                    {borrowAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-800 pt-2 flex justify-between">
                  <span className="text-gray-400">Total Position</span>
                  <span className="text-white font-bold">
                    {getCurrencySymbol()}
                    {totalPosition.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Interest Rate: 0.02% per day
                </p>
              </div>

              {/* Buy/Sell Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
                  <TrendingUpIcon className="w-5 h-5" />
                  BUY
                </button>
                <button className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
                  <TrendingDownIcon className="w-5 h-5" />
                  SELL
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