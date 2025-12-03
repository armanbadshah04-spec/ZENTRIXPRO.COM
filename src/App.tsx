import React, { useEffect, useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { SpotTradingPage } from './pages/SpotTradingPage';
import { FuturesTradingPage } from './pages/FuturesTradingPage';
import { MarginTradingPage } from './pages/MarginTradingPage';
import { CryptoTradingPage } from './pages/CryptoTradingPage';
import { StockTradingPage } from './pages/StockTradingPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DepositWithdrawPage } from './pages/DepositWithdrawPage';
import { UserProfile } from './types/trading';
type Page = 'splash' | 'login' | 'signup' | 'spot' | 'futures' | 'margin' | 'crypto' | 'stock' | 'tournaments' | 'profile' | 'analytics' | 'deposit';
export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);
  const handleSplashComplete = () => {
    setCurrentPage('login');
  };
  const handleLogin = () => {
    const mockProfile: UserProfile = {
      name: 'Demo User',
      email: 'demo@zentrixpro.com',
      country: 'United States',
      currency: 'USD',
      phone: '+1234567890',
      accountType: 'demo',
      joinDate: new Date().toISOString(),
      demoBalance: 10000,
      realBalance: 0
    };
    setUserProfile(mockProfile);
    setCurrentPage('spot');
  };
  const handleSignup = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentPage('spot');
  };
  const handleUpdateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };
  const handleDeposit = (amount: number, method: string) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        realBalance: userProfile.realBalance + amount
      });
    }
  };
  const handleWithdraw = (amount: number, method: string) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        realBalance: userProfile.realBalance - amount
      });
    }
  };
  const handleChangeTradingType = (type: string) => {
    setCurrentPage(type as Page);
  };
  if (currentPage === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => setCurrentPage('signup')} />;
  }
  if (currentPage === 'signup') {
    return <SignupPage onSignup={handleSignup} onNavigateToLogin={() => setCurrentPage('login')} />;
  }
  if (!userProfile) {
    return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => setCurrentPage('signup')} />;
  }
  const commonProps = {
    profile: userProfile,
    onNavigateToTournaments: () => setCurrentPage('tournaments'),
    onNavigateToProfile: () => setCurrentPage('profile'),
    onNavigateToAnalytics: () => setCurrentPage('analytics'),
    onNavigateToDeposit: () => setCurrentPage('deposit'),
    onUpdateProfile: handleUpdateProfile,
    onChangeTradingType: handleChangeTradingType
  };
  if (currentPage === 'tournaments') {
    return <TournamentsPage onBack={() => setCurrentPage('spot')} />;
  }
  if (currentPage === 'profile') {
    return <ProfilePage profile={userProfile} onBack={() => setCurrentPage('spot')} onUpdateProfile={handleUpdateProfile} />;
  }
  if (currentPage === 'analytics') {
    return <AnalyticsPage tradeHistory={tradeHistory} onBack={() => setCurrentPage('spot')} />;
  }
  if (currentPage === 'deposit') {
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
      return symbols[userProfile.currency] || '$';
    };
    return <DepositWithdrawPage balance={userProfile.accountType === 'demo' ? userProfile.demoBalance : userProfile.realBalance} currency={userProfile.currency} currencySymbol={getCurrencySymbol()} onBack={() => setCurrentPage('spot')} onDeposit={handleDeposit} onWithdraw={handleWithdraw} />;
  }
  if (currentPage === 'futures') {
    return <FuturesTradingPage {...commonProps} />;
  }
  if (currentPage === 'margin') {
    return <MarginTradingPage {...commonProps} />;
  }
  if (currentPage === 'crypto') {
    return <CryptoTradingPage {...commonProps} />;
  }
  if (currentPage === 'stock') {
    return <StockTradingPage {...commonProps} />;
  }
  return <SpotTradingPage {...commonProps} />;
}