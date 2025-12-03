import React, { useState } from 'react';
import { LogInIcon, TrendingUpIcon } from 'lucide-react';
interface LoginPageProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
}
export function LoginPage({
  onLogin,
  onNavigateToSignup
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };
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

        {/* Login Card */}
        <div className="bg-[#0f1535] rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Email Address
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Password
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-colors" required />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-[#0a0e27]" />
                Remember me
              </label>
              <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
              <LogInIcon className="w-5 h-5" />
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <button onClick={onNavigateToSignup} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Sign Up
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