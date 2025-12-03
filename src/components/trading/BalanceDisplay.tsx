import React from 'react';
import { TrendingUpIcon, WalletIcon, TrophyIcon, UserIcon, BarChart3Icon, DollarSignIcon, RefreshCwIcon, ChevronDownIcon } from 'lucide-react';
interface BalanceDisplayProps {
  balance: number;
  currencySymbol: string;
  accountType: 'demo' | 'real';
  onNavigateToTournaments: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToDeposit: () => void;
  onToggleAccount: () => void;
  onChangeTradingType?: (type: string) => void;
  currentTradingType?: string;
}
export function BalanceDisplay({
  balance,
  currencySymbol,
  accountType,
  onNavigateToTournaments,
  onNavigateToProfile,
  onNavigateToAnalytics,
  onNavigateToDeposit,
  onToggleAccount,
  onChangeTradingType,
  currentTradingType = 'spot'
}: BalanceDisplayProps) {
  const tradingTypes = [{
    id: 'spot',
    label: 'Spot',
    color: 'cyan'
  }, {
    id: 'futures',
    label: 'Futures',
    color: 'purple'
  }, {
    id: 'margin',
    label: 'Margin',
    color: 'orange'
  }, {
    id: 'crypto',
    label: 'Crypto',
    color: 'yellow'
  }, {
    id: 'stock',
    label: 'Stocks',
    color: 'blue'
  }];
  return <div className="bg-gradient-to-r from-[#0a0e27] to-[#0f1535] border-b border-gray-800 px-6 py-4">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                ZENTRIX PRO
              </h1>
              <p className="text-xs text-gray-400">
                All-in-One Trading Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onToggleAccount} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${accountType === 'demo' ? 'bg-green-500/20 border-green-500/30 hover:bg-green-500/30' : 'bg-yellow-500/20 border-yellow-500/30 hover:bg-yellow-500/30'}`}>
              <RefreshCwIcon className="w-4 h-4" />
              <span className={`font-semibold text-sm ${accountType === 'demo' ? 'text-green-400' : 'text-yellow-400'}`}>
                {accountType === 'demo' ? 'DEMO' : 'REAL'}
              </span>
            </button>

            <button onClick={onNavigateToDeposit} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/20">
              <DollarSignIcon className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Deposit</span>
            </button>

            <button onClick={onNavigateToAnalytics} className="flex items-center gap-2 bg-[#0a0e27] px-4 py-2 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-all">
              <BarChart3Icon className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">Analytics</span>
            </button>

            <button onClick={onNavigateToTournaments} className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg shadow-yellow-500/20">
              <TrophyIcon className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Tournaments</span>
            </button>

            <button onClick={onNavigateToProfile} className="flex items-center gap-2 bg-[#0a0e27] px-4 py-2 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all">
              <UserIcon className="w-5 h-5 text-cyan-400" />
            </button>

            <div className="flex items-center gap-2 bg-[#0a0e27] px-6 py-3 rounded-lg border border-gray-800">
              <WalletIcon className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-xl font-bold text-white">
                  {currencySymbol}
                  {balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Type Selector */}
        {onChangeTradingType && <div className="flex gap-2">
            {tradingTypes.map(type => <button key={type.id} onClick={() => onChangeTradingType(type.id)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentTradingType === type.id ? `bg-${type.color}-500/20 text-${type.color}-400 border border-${type.color}-500/30` : 'bg-[#0a0e27] text-gray-400 hover:text-white hover:bg-gray-800'}`} style={currentTradingType === type.id ? {
          backgroundColor: `rgba(${type.color === 'cyan' ? '6, 182, 212' : type.color === 'purple' ? '168, 85, 247' : type.color === 'orange' ? '249, 115, 22' : type.color === 'yellow' ? '234, 179, 8' : '59, 130, 246'}, 0.2)`,
          borderColor: `rgba(${type.color === 'cyan' ? '6, 182, 212' : type.color === 'purple' ? '168, 85, 247' : type.color === 'orange' ? '249, 115, 22' : type.color === 'yellow' ? '234, 179, 8' : '59, 130, 246'}, 0.3)`,
          color: type.color === 'cyan' ? '#06b6d4' : type.color === 'purple' ? '#a855f7' : type.color === 'orange' ? '#f97316' : type.color === 'yellow' ? '#eab308' : '#3b82f6'
        } : undefined}>
                {type.label}
              </button>)}
          </div>}
      </div>
    </div>;
}