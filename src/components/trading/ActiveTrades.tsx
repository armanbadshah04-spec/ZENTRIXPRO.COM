import React from 'react';
import { ClockIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Trade } from '../../types/trading';
interface ActiveTradesProps {
  trades: Trade[];
}
export function ActiveTrades({
  trades
}: ActiveTradesProps) {
  if (trades.length === 0) {
    return <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
        <h3 className="text-white font-semibold mb-4">Active Trades</h3>
        <p className="text-gray-400 text-sm text-center py-8">
          No active trades
        </p>
      </div>;
  }
  return <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
      <h3 className="text-white font-semibold mb-4">
        Active Trades ({trades.length})
      </h3>
      <div className="space-y-3">
        {trades.map(trade => {
        const elapsed = Date.now() - trade.openTime;
        const remaining = Math.max(0, trade.duration * 1000 - elapsed);
        const remainingSeconds = Math.floor(remaining / 1000);
        return <div key={trade.id} className="bg-[#0a0e27] rounded-lg p-4 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {trade.type === 'call' ? <TrendingUpIcon className="w-4 h-4 text-green-400" /> : <TrendingDownIcon className="w-4 h-4 text-red-400" />}
                  <span className="text-white font-medium">{trade.asset}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${trade.type === 'call' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trade.type.toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium">${trade.amount}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <ClockIcon className="w-3 h-3" />
                  <span>{remainingSeconds}s remaining</span>
                </div>
                <span className="text-gray-400">
                  Entry: ${trade.openPrice.toFixed(4)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-500 h-full transition-all duration-1000" style={{
              width: `${elapsed / (trade.duration * 1000) * 100}%`
            }} />
              </div>
            </div>;
      })}
      </div>
    </div>;
}