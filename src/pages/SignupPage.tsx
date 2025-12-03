import React, { useState } from 'react';
import { UserPlusIcon, TrendingUpIcon, GlobeIcon } from 'lucide-react';
import { COUNTRIES } from '../utils/countries';
import { UserProfile } from '../types/trading';
interface SignupPageProps {
  onSignup: (profile: UserProfile) => void;
  onNavigateToLogin: () => void;
}
export function SignupPage({
  onSignup,
  onNavigateToLogin
}: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('US');
  const [phone, setPhone] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const selectedCountry = COUNTRIES.find(c => c.code === country);
    if (!selectedCountry) return;
    const profile: UserProfile = {
      name,
      email,
      country: selectedCountry.name,
      currency: selectedCountry.currency,
      phone,
      accountType: 'demo',
      joinDate: new Date().toISOString(),
      demoBalance: 10000,
      realBalance: 0
    };
    onSignup(profile);
  };
  const selectedCountry = COUNTRIES.find(c => c.code === country);
  return <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#0a0e27] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <TrendingUpIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              ZENTRIX PRO
            </h1>
          </div>
          <p className="text-gray-400">Professional Trading Platform</p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#0f1535] rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Full Name
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Email Address
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <GlobeIcon className="w-4 h-4" />
                Country
              </label>
              <div className="relative">
                <select value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors appearance-none cursor-pointer" required>
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.currency})
                    </option>)}
                </select>
              </div>
              {selectedCountry && <p className="text-xs text-gray-500 mt-1">
                  Your account will use {selectedCountry.currency} (
                  {selectedCountry.currencySymbol})
                </p>}
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Phone Number
              </label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Password
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Confirm Password
              </label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-700 bg-[#0a0e27]" required />
              <label className="text-sm text-gray-400">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
              <UserPlusIcon className="w-5 h-5" />
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <button onClick={onNavigateToLogin} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Sign In
            </button>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            App made by{' '}
            <span className="text-cyan-400 font-semibold">Arman Badshah</span>
          </p>
        </div>
      </div>
    </div>;
}