import React from 'react';
import { ArrowLeftIcon, TrendingUpIcon, TrendingDownIcon, TargetIcon, ActivityIcon } from 'lucide-react';
import { Trade } from '../types/trading';
interface AnalyticsPageProps {
  tradeHistory: Trade[];
  onBack: () => void;
}
export function AnalyticsPage({
  tradeHistory,
  onBack
}: AnalyticsPageProps) {
  const totalTrades = tradeHistory.length;
  const wonTrades = tradeHistory.filter(t => t.status === 'won').length;
  const lostTrades = tradeHistory.filter(t => t.status === 'lost').length;
  const winRate = totalTrades > 0 ? wonTrades / totalTrades * 100 : 0;
  const totalProfit = tradeHistory.reduce((sum, t) => sum + (t.profit || 0), 0);
  const totalInvested = tradeHistory.reduce((sum, t) => sum + t.amount, 0);
  const roi = totalInvested > 0 ? totalProfit / totalInvested * 100 : 0;
  // Asset performance
  const assetStats: {
    [key: string]: {
      trades: number;
      profit: number;
    };
  } = {};
  tradeHistory.forEach(trade => {
    if (!assetStats[trade.asset]) {
      assetStats[trade.asset] = {
        trades: 0,
        profit: 0
      };
    }
    assetStats[trade.asset].trades++;
    assetStats[trade.asset].profit += trade.profit || 0;
  });
  const topAssets = Object.entries(assetStats).sort((a, b) => b[1].profit - a[1].profit).slice(0, 5);
  return <div className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a0e27] to-[#0f1535] border-b border-gray-800 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Trading
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <ActivityIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics</h1>
              <p className="text-gray-400">Track your trading performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TargetIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">Total Trades</span>
            </div>
            <p className="text-3xl font-bold text-white">{totalTrades}</p>
          </div>

          <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUpIcon className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Win Rate</span>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {winRate.toFixed(1)}%
            </p>
          </div>

          <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDownIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400 text-sm">Total Profit</span>
            </div>
            <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${totalProfit.toFixed(2)}
            </p>
          </div>

          <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <ActivityIcon className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">ROI</span>
            </div>
            <p className={`text-3xl font-bold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {roi.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Win/Loss Breakdown */}
        <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Trade Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0e27] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Won Trades</p>
              <p className="text-2xl font-bold text-green-400">{wonTrades}</p>
            </div>
            <div className="bg-[#0a0e27] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Lost Trades</p>
              <p className="text-2xl font-bold text-red-400">{lostTrades}</p>
            </div>
            <div className="bg-[#0a0e27] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Total Invested</p>
              <p className="text-2xl font-bold text-white">
                ${totalInvested.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Top Performing Assets */}
        <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">
            Top Performing Assets
          </h2>
          {topAssets.length > 0 ? <div className="space-y-3">
              {topAssets.map(([asset, stats], index) => <div key={asset} className="bg-[#0a0e27] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{asset}</p>
                      <p className="text-sm text-gray-400">
                        {stats.trades} trades
                      </p>
                    </div>
                  </div>
                  <p className={`text-lg font-bold ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.profit >= 0 ? '+' : ''}${stats.profit.toFixed(2)}
                  </p>
                </div>)}
            </div> : <p className="text-gray-400 text-center py-8">
              No trading data available yet
            </p>}
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