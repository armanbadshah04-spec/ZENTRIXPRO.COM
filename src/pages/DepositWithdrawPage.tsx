import React, { useState } from 'react';
import { ArrowLeftIcon, CreditCardIcon, CoinsIcon, DollarSignIcon } from 'lucide-react';
import { Transaction } from '../types/trading';
interface DepositWithdrawPageProps {
  balance: number;
  currency: string;
  currencySymbol: string;
  onBack: () => void;
  onDeposit: (amount: number, method: string) => void;
  onWithdraw: (amount: number, method: string) => void;
}
export function DepositWithdrawPage({
  balance,
  currency,
  currencySymbol,
  onBack,
  onDeposit,
  onWithdraw
}: DepositWithdrawPageProps) {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('card');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (activeTab === 'withdraw' && numAmount > balance) {
      alert('Insufficient balance');
      return;
    }
    if (activeTab === 'deposit') {
      onDeposit(numAmount, method);
      alert(`Deposit of ${currencySymbol}${numAmount} initiated successfully!`);
    } else {
      onWithdraw(numAmount, method);
      alert(`Withdrawal of ${currencySymbol}${numAmount} requested successfully!`);
    }
    setAmount('');
  };
  return <div className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a0e27] to-[#0f1535] border-b border-gray-800 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Trading
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <DollarSignIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Deposit & Withdraw
              </h1>
              <p className="text-gray-400">Manage your account funds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Balance Display */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6 mb-6">
          <p className="text-gray-400 text-sm mb-2">Available Balance</p>
          <p className="text-4xl font-bold text-white">
            {currencySymbol}
            {balance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 mt-1">{currency}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('deposit')} className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'deposit' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20' : 'bg-[#0f1535] text-gray-400 border border-gray-800'}`}>
            Deposit
          </button>
          <button onClick={() => setActiveTab('withdraw')} className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'withdraw' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20' : 'bg-[#0f1535] text-gray-400 border border-gray-800'}`}>
            Withdraw
          </button>
        </div>

        {/* Form */}
        <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  {currencySymbol}
                </span>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-[#0a0e27] text-white pl-10 pr-4 py-4 text-2xl rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none" step="0.01" min="0" required />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-sm text-gray-400 mb-3 block">
                Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button type="button" onClick={() => setMethod('card')} className={`p-4 rounded-lg border transition-all ${method === 'card' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0a0e27] border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                  <CreditCardIcon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Credit/Debit Card</p>
                </button>

                <button type="button" onClick={() => setMethod('bank')} className={`p-4 rounded-lg border transition-all ${method === 'bank' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0a0e27] border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                  <div className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Bank Transfer</p>
                </button>

                <button type="button" onClick={() => setMethod('crypto')} className={`p-4 rounded-lg border transition-all ${method === 'crypto' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0a0e27] border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                  <CoinsIcon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Cryptocurrency</p>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={`w-full py-4 rounded-lg font-semibold transition-all ${activeTab === 'deposit' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20' : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/20'}`}>
              {activeTab === 'deposit' ? 'Deposit Funds' : 'Request Withdrawal'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#0a0e27] rounded-lg">
            <p className="text-sm text-gray-400">
              {activeTab === 'deposit' ? '💡 Deposits are processed instantly. Minimum deposit: ' + currencySymbol + '10' : '💡 Withdrawals are processed within 24-48 hours. Minimum withdrawal: ' + currencySymbol + '20'}
            </p>
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