import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, ClockIcon } from 'lucide-react';
interface TradePanelProps {
  tradeAmount: number;
  duration: number;
  balance: number;
  currencySymbol: string;
  onAmountChange: (amount: number) => void;
  onDurationChange: (duration: number) => void;
  onPlaceTrade: (type: 'call' | 'put') => void;
}
const QUICK_AMOUNTS = [10, 50, 100, 500, 1000];
const DURATIONS = [{
  label: '5 Sec',
  value: 5
}, {
  label: '1 Min',
  value: 60
}, {
  label: '3 Min',
  value: 180
}, {
  label: '5 Min',
  value: 300
}, {
  label: '15 Min',
  value: 900
}];
export function TradePanel({
  tradeAmount,
  duration,
  balance,
  currencySymbol,
  onAmountChange,
  onDurationChange,
  onPlaceTrade
}: TradePanelProps) {
  const potentialProfit = tradeAmount * 0.85;
  return <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
      <h3 className="text-white font-semibold mb-4">Trade Setup</h3>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">
          Investment Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {currencySymbol}
          </span>
          <input type="number" value={tradeAmount} onChange={e => onAmountChange(Number(e.target.value))} className="w-full bg-[#0a0e27] text-white pl-8 pr-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none" min="1" max={balance} />
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2 mt-2">
          {QUICK_AMOUNTS.map(amount => <button key={amount} onClick={() => onAmountChange(amount)} className="flex-1 px-2 py-1 text-xs bg-[#0a0e27] text-gray-400 rounded hover:bg-gray-800 hover:text-white transition-colors">
              {currencySymbol}
              {amount}
            </button>)}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          Trade Duration
        </label>
        <div className="grid grid-cols-5 gap-2">
          {DURATIONS.map(d => <button key={d.value} onClick={() => onDurationChange(d.value)} className={`px-2 py-2 text-xs rounded-lg transition-colors ${duration === d.value ? 'bg-cyan-500 text-white' : 'bg-[#0a0e27] text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              {d.label}
            </button>)}
        </div>
      </div>

      {/* Profit Display */}
      <div className="bg-[#0a0e27] rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Investment</span>
          <span className="text-white font-medium">
            {currencySymbol}
            {tradeAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Potential Profit</span>
          <span className="text-green-400 font-medium">
            +{currencySymbol}
            {potentialProfit.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Trade Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onPlaceTrade('call')} disabled={tradeAmount > balance} className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
          <TrendingUpIcon className="w-5 h-5" />
          CALL (UP)
        </button>
        <button onClick={() => onPlaceTrade('put')} disabled={tradeAmount > balance} className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
          <TrendingDownIcon className="w-5 h-5" />
          PUT (DOWN)
        </button>
      </div>

      {tradeAmount > balance && <p className="text-red-400 text-sm mt-3 text-center">
          Insufficient balance
        </p>}
    </div>;
}