import React, { useEffect, useState } from 'react';
import { TrendingUpIcon } from 'lucide-react';
interface SplashScreenProps {
  onComplete: () => void;
}
export function SplashScreen({
  onComplete
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);
  return <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#0a0e27] flex items-center justify-center z-50">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8 inline-flex items-center justify-center" style={{
        animation: 'scaleIn 1s ease-out forwards'
      }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
              <TrendingUpIcon className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* App Name Animation */}
        <div style={{
        animation: 'fadeInUp 1s ease-out 0.3s forwards',
        opacity: 0
      }}>
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ZENTRIX PRO
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            All-in-One Trading Platform
          </p>
        </div>

        {/* Creator Credit Animation */}
        <div className="mb-12" style={{
        animation: 'fadeInUp 1s ease-out 0.6s forwards',
        opacity: 0
      }}>
          <p className="text-sm text-gray-500 mb-2">Created by</p>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text">
            ARMAN BADSHAH
          </h2>
        </div>

        {/* Loading Bar */}
        <div className="w-80 mx-auto" style={{
        animation: 'fadeIn 1s ease-out 0.9s forwards',
        opacity: 0
      }}>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300" style={{
            width: `${progress}%`
          }} />
          </div>
          <p className="text-cyan-400 text-sm mt-3 font-medium">
            Loading {progress}%
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>;
}