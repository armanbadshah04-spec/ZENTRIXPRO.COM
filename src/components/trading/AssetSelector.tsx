import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Asset } from '../../types/trading';
interface AssetSelectorProps {
  assets: Asset[];
  selectedAsset: Asset;
  onSelect: (asset: Asset) => void;
}
export function AssetSelector({
  assets,
  selectedAsset,
  onSelect
}: AssetSelectorProps) {
  const getDecimalPlaces = (symbol: string) => {
    if (symbol.includes('JPY')) return 2;
    if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP') || symbol.includes('ADA')) return 2;
    if (symbol.includes('ZNTX') && symbol.includes('BTC')) return 6;
    if (symbol.includes('ZNTX') && symbol.includes('ETH')) return 5;
    if (symbol.includes('USD') && !symbol.includes('BTC') && !symbol.includes('ETH') && !symbol.includes('ZNTX')) return 4;
    return 2;
  };
  const decimals = getDecimalPlaces(selectedAsset.symbol);
  return <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <select value={selectedAsset.id} onChange={e => {
        const asset = assets.find(a => a.id === e.target.value);
        if (asset) onSelect(asset);
      }} className="flex-1 bg-[#0f1535] text-white px-4 py-3 rounded-lg border border-gray-700 appearance-none cursor-pointer hover:border-cyan-500 transition-colors pr-10 font-medium">
          {assets.map(asset => <option key={asset.id} value={asset.id}>
              {asset.name}
            </option>)}
        </select>
        <ChevronDownIcon className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />

        {/* Open Status Badge */}
        <div className="ml-3 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
          <span className="text-green-400 font-semibold text-sm">OPEN</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-white">
          ${selectedAsset.price.toFixed(decimals)}
        </span>
        <span className={`text-sm font-medium px-2 py-1 rounded ${selectedAsset.changePercent >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {selectedAsset.changePercent >= 0 ? '+' : ''}
          {selectedAsset.changePercent.toFixed(2)}%
        </span>
      </div>
    </div>;
}