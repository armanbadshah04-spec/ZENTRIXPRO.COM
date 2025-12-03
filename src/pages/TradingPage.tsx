import React from 'react';
import { BalanceDisplay } from '../components/trading/BalanceDisplay';
import { AssetSelector } from '../components/trading/AssetSelector';
import { TradingChart } from '../components/trading/TradingChart';
import { TradePanel } from '../components/trading/TradePanel';
import { ActiveTrades } from '../components/trading/ActiveTrades';
import { TradeHistory } from '../components/trading/TradeHistory';
import { useTradingData } from '../hooks/useTradingData';
import { UserProfile } from '../types/trading';
interface TradingPageProps {
  profile: UserProfile;
  onNavigateToTournaments: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToDeposit: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}
export function TradingPage({
  profile,
  onNavigateToTournaments,
  onNavigateToProfile,
  onNavigateToAnalytics,
  onNavigateToDeposit,
  onUpdateProfile
}: TradingPageProps) {
  const {
    balance,
    selectedAsset,
    tradeAmount,
    duration,
    candleData,
    assets,
    activeTrades,
    tradeHistory,
    placeTrade,
    setSelectedAsset,
    setTradeAmount,
    setDuration
  } = useTradingData();
  const handleToggleAccount = () => {
    const newAccountType = profile.accountType === 'demo' ? 'real' : 'demo';
    onUpdateProfile({
      ...profile,
      accountType: newAccountType
    });
  };
  const currentBalance = profile.accountType === 'demo' ? profile.demoBalance : profile.realBalance;
  // Get currency symbol from profile
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
      <BalanceDisplay balance={currentBalance} currencySymbol={getCurrencySymbol()} accountType={profile.accountType} onNavigateToTournaments={onNavigateToTournaments} onNavigateToProfile={onNavigateToProfile} onNavigateToAnalytics={onNavigateToAnalytics} onNavigateToDeposit={onNavigateToDeposit} onToggleAccount={handleToggleAccount} />

      <div className="max-w-[1800px] mx-auto p-6">
        {/* Main Trading Layout - Chart takes 70% width */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
          {/* Left Column - Chart (Larger) */}
          <div className="space-y-6">
            <AssetSelector assets={assets} selectedAsset={selectedAsset} onSelect={setSelectedAsset} />
            <TradingChart data={candleData} assetName={selectedAsset.name} />
            <TradeHistory trades={tradeHistory} />
          </div>

          {/* Right Column - Trading Panel (Smaller) */}
          <div className="space-y-6">
            <TradePanel tradeAmount={tradeAmount} duration={duration} balance={currentBalance} currencySymbol={getCurrencySymbol()} onAmountChange={setTradeAmount} onDurationChange={setDuration} onPlaceTrade={placeTrade} />
            <ActiveTrades trades={activeTrades} />
          </div>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          App made by{' '}
          <span className="text-cyan-400 font-semibold">Arman Badshah</span>
        </p>
      </div>
    </div>;
}