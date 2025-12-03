import React, { useEffect, useState, useRef } from 'react';
import { CandleData } from '../../types/trading';
import { TrendingUpIcon, TrendingDownIcon, BarChart3Icon, LineChartIcon, ActivityIcon, MaximizeIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
interface TradingChartProps {
  data: CandleData[];
  assetName: string;
}
type ChartType = 'candle' | 'line' | 'area';
type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1D';
export function TradingChart({
  data,
  assetName
}: TradingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartType, setChartType] = useState<ChartType>('candle');
  const [timeframe, setTimeframe] = useState<Timeframe>('1m');
  const [showVolume, setShowVolume] = useState(true);
  const [showMA, setShowMA] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [mousePos, setMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const width = rect.width;
    const height = rect.height;
    const volumeHeight = showVolume ? 80 : 0;
    const padding = {
      top: 20,
      right: 80,
      bottom: 40 + volumeHeight,
      left: 60
    };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    // Clear canvas with dark background
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, width, height);
    // Find min and max prices
    const visibleData = data.slice(-Math.floor(50 * zoom));
    const prices = visibleData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const pricePadding = priceRange * 0.1;
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#1a1f3a';
      ctx.lineWidth = 1;
      // Horizontal grid lines
      for (let i = 0; i <= 8; i++) {
        const y = padding.top + chartHeight / 8 * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        // Price labels
        const price = maxPrice + pricePadding - (priceRange + pricePadding * 2) / 8 * i;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(price.toFixed(4), width - padding.right + 10, y + 4);
      }
      // Vertical grid lines
      const gridLines = 8;
      for (let i = 0; i <= gridLines; i++) {
        const x = padding.left + chartWidth / gridLines * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
      }
    }
    // Calculate Moving Average if enabled
    let maData: number[] = [];
    if (showMA) {
      const period = 20;
      maData = visibleData.map((_, i) => {
        if (i < period - 1) return visibleData[i].close;
        const sum = visibleData.slice(i - period + 1, i + 1).reduce((acc, d) => acc + d.close, 0);
        return sum / period;
      });
    }
    // Draw chart based on type
    const candleWidth = chartWidth / visibleData.length * zoom;
    const candleSpacing = candleWidth * 0.2;
    const actualCandleWidth = Math.max(2, candleWidth - candleSpacing);
    if (chartType === 'candle') {
      // Draw candlesticks
      visibleData.forEach((candle, i) => {
        const x = padding.left + i * candleWidth + candleSpacing / 2;
        const openY = padding.top + (maxPrice + pricePadding - candle.open) / (priceRange + pricePadding * 2) * chartHeight;
        const closeY = padding.top + (maxPrice + pricePadding - candle.close) / (priceRange + pricePadding * 2) * chartHeight;
        const highY = padding.top + (maxPrice + pricePadding - candle.high) / (priceRange + pricePadding * 2) * chartHeight;
        const lowY = padding.top + (maxPrice + pricePadding - candle.low) / (priceRange + pricePadding * 2) * chartHeight;
        const isGreen = candle.close >= candle.open;
        const color = isGreen ? '#10b981' : '#ef4444';
        // Draw wick
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1, actualCandleWidth * 0.1);
        ctx.beginPath();
        ctx.moveTo(x + actualCandleWidth / 2, highY);
        ctx.lineTo(x + actualCandleWidth / 2, lowY);
        ctx.stroke();
        // Draw body
        ctx.fillStyle = color;
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.abs(closeY - openY) || 1;
        ctx.fillRect(x, bodyTop, actualCandleWidth, bodyHeight);
      });
    } else if (chartType === 'line') {
      // Draw line chart
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      visibleData.forEach((candle, i) => {
        const x = padding.left + i * candleWidth + candleWidth / 2;
        const y = padding.top + (maxPrice + pricePadding - candle.close) / (priceRange + pricePadding * 2) * chartHeight;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    } else if (chartType === 'area') {
      // Draw area chart
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      visibleData.forEach((candle, i) => {
        const x = padding.left + i * candleWidth + candleWidth / 2;
        const y = padding.top + (maxPrice + pricePadding - candle.close) / (priceRange + pricePadding * 2) * chartHeight;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.lineTo(padding.left + (visibleData.length - 1) * candleWidth + candleWidth / 2, height - padding.bottom);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      // Draw line on top
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      visibleData.forEach((candle, i) => {
        const x = padding.left + i * candleWidth + candleWidth / 2;
        const y = padding.top + (maxPrice + pricePadding - candle.close) / (priceRange + pricePadding * 2) * chartHeight;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }
    // Draw Moving Average
    if (showMA && maData.length > 0) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      maData.forEach((ma, i) => {
        const x = padding.left + i * candleWidth + candleWidth / 2;
        const y = padding.top + (maxPrice + pricePadding - ma) / (priceRange + pricePadding * 2) * chartHeight;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }
    // Draw volume bars
    if (showVolume) {
      const volumes = visibleData.map(() => Math.random() * 1000000); // Mock volume
      const maxVolume = Math.max(...volumes);
      const volumeY = height - padding.bottom + 10;
      volumes.forEach((volume, i) => {
        const x = padding.left + i * candleWidth + candleSpacing / 2;
        const barHeight = volume / maxVolume * (volumeHeight - 20);
        const isGreen = visibleData[i].close >= visibleData[i].open;
        ctx.fillStyle = isGreen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        ctx.fillRect(x, volumeY + (volumeHeight - 20) - barHeight, actualCandleWidth, barHeight);
      });
      // Volume label
      ctx.fillStyle = '#6b7280';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Volume', padding.left, volumeY - 5);
    }
    // Draw current price line
    if (visibleData.length > 0) {
      const lastCandle = visibleData[visibleData.length - 1];
      const currentY = padding.top + (maxPrice + pricePadding - lastCandle.close) / (priceRange + pricePadding * 2) * chartHeight;
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding.left, currentY);
      ctx.lineTo(width - padding.right, currentY);
      ctx.stroke();
      ctx.setLineDash([]);
      // Price label
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(width - padding.right + 5, currentY - 14, 70, 28);
      ctx.fillStyle = '#0a0e27';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lastCandle.close.toFixed(4), width - padding.right + 40, currentY + 4);
    }
    // Draw crosshair
    if (mousePos) {
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(mousePos.x, padding.top);
      ctx.lineTo(mousePos.x, height - padding.bottom);
      ctx.stroke();
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding.left, mousePos.y);
      ctx.lineTo(width - padding.right, mousePos.y);
      ctx.stroke();
      ctx.setLineDash([]);
      // Price at crosshair
      const priceAtMouse = maxPrice + pricePadding - (mousePos.y - padding.top) / chartHeight * (priceRange + pricePadding * 2);
      ctx.fillStyle = '#374151';
      ctx.fillRect(width - padding.right + 5, mousePos.y - 12, 70, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(priceAtMouse.toFixed(4), width - padding.right + 40, mousePos.y + 4);
    }
    // Time labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    const timeLabels = 6;
    for (let i = 0; i <= timeLabels; i++) {
      const x = padding.left + chartWidth / timeLabels * i;
      const dataIndex = Math.floor(visibleData.length / timeLabels * i);
      if (visibleData[dataIndex]) {
        const time = new Date(visibleData[dataIndex].time);
        const timeStr = time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
        ctx.fillText(timeStr, x, height - 15);
      }
    }
  }, [data, chartType, showVolume, showMA, showGrid, zoom, mousePos, timeframe]);
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  const handleMouseLeave = () => {
    setMousePos(null);
  };
  return <div ref={containerRef} className="bg-[#0f1535] rounded-lg border border-gray-800 overflow-hidden">
      {/* Chart Controls */}
      <div className="bg-[#0a0e27] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-semibold">{assetName}</h3>

          {/* Chart Type Selector */}
          <div className="flex gap-1 bg-[#0f1535] rounded-lg p-1">
            <button onClick={() => setChartType('candle')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${chartType === 'candle' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              <BarChart3Icon className="w-4 h-4" />
            </button>
            <button onClick={() => setChartType('line')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${chartType === 'line' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              <LineChartIcon className="w-4 h-4" />
            </button>
            <button onClick={() => setChartType('area')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${chartType === 'area' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              <ActivityIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-1">
            {(['1m', '5m', '15m', '1h', '4h', '1D'] as Timeframe[]).map(tf => <button key={tf} onClick={() => setTimeframe(tf)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${timeframe === tf ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                  {tf}
                </button>)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Indicators */}
          <button onClick={() => setShowMA(!showMA)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${showMA ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white bg-[#0f1535]'}`}>
            MA(20)
          </button>

          <button onClick={() => setShowVolume(!showVolume)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${showVolume ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white bg-[#0f1535]'}`}>
            Volume
          </button>

          <button onClick={() => setShowGrid(!showGrid)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${showGrid ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white bg-[#0f1535]'}`}>
            Grid
          </button>

          {/* Zoom Controls */}
          <div className="flex gap-1 ml-2">
            <button onClick={() => setZoom(Math.min(2, zoom + 0.2))} className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <ZoomInIcon className="w-4 h-4" />
            </button>
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.2))} className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <ZoomOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <canvas ref={canvasRef} className="w-full h-[600px] cursor-crosshair" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
    </div>;
}