import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Trade } from '../../types/trading';
interface TradeHistoryProps {
  trades: Trade[];
}
export function TradeHistory({
  trades
}: TradeHistoryProps) {
  if (trades.length === 0) {
    return <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
        <h3 className="text-white font-semibold mb-4">Trade History</h3>
        <p className="text-gray-400 text-sm text-center py-8">
          No trade history yet
        </p>
      </div>;
  }
  return <div className="bg-[#0f1535] rounded-lg p-6 border border-gray-800">
      <h3 className="text-white font-semibold mb-4">Trade History</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {trades.map(trade => <div key={trade.id} className="bg-[#0a0e27] rounded-lg p-3 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {trade.type === 'call' ? <TrendingUpIcon className="w-4 h-4 text-green-400" /> : <TrendingDownIcon className="w-4 h-4 text-red-400" />}
                <span className="text-white text-sm font-medium">
                  {trade.asset}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${trade.type === 'call' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {trade.type.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {trade.status === 'won' ? <CheckCircleIcon className="w-4 h-4 text-green-400" /> : <XCircleIcon className="w-4 h-4 text-red-400" />}
                <span className={`text-sm font-medium ${trade.status === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.profit && trade.profit > 0 ? '+' : ''}$
                  {trade.profit?.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>Amount: ${trade.amount}</span>
              <span>
                {trade.openPrice.toFixed(4)} → {trade.closePrice?.toFixed(4)}
              </span>
            </div>
          </div>)}
      </div>
    </div>;
}