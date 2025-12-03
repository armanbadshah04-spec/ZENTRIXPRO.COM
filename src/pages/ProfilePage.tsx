import React from 'react';
import { ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon, GlobeIcon, CalendarIcon, WalletIcon } from 'lucide-react';
import { UserProfile } from '../types/trading';
interface ProfilePageProps {
  profile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}
export function ProfilePage({
  profile,
  onBack,
  onUpdateProfile
}: ProfilePageProps) {
  return <div className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a0e27] to-[#0f1535] border-b border-gray-800 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Trading
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              <p className="text-gray-400">Manage your account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Personal Information */}
        <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Full Name
              </label>
              <input type="text" value={profile.name} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none" readOnly />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <MailIcon className="w-4 h-4" />
                Email Address
              </label>
              <input type="email" value={profile.email} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none" readOnly />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Phone Number
              </label>
              <input type="tel" value={profile.phone} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none" readOnly />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <GlobeIcon className="w-4 h-4" />
                Country
              </label>
              <input type="text" value={profile.country} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none" readOnly />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Member Since
              </label>
              <input type="text" value={new Date(profile.joinDate).toLocaleDateString()} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700" readOnly />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                <WalletIcon className="w-4 h-4" />
                Currency
              </label>
              <input type="text" value={profile.currency} className="w-full bg-[#0a0e27] text-white px-4 py-3 rounded-lg border border-gray-700" readOnly />
            </div>
          </div>
        </div>

        {/* Account Balances */}
        <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">
            Account Balances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <WalletIcon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-green-400 font-semibold">
                  Demo Account
                </span>
              </div>
              <p className="text-3xl font-bold text-white">
                ${profile.demoBalance.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Practice trading with virtual money
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border border-yellow-500/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <WalletIcon className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-yellow-400 font-semibold">
                  Real Account
                </span>
              </div>
              <p className="text-3xl font-bold text-white">
                ${profile.realBalance.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Trade with real money
              </p>
            </div>
          </div>
        </div>

        {/* Account Type */}
        <div className="bg-[#0f1535] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            Current Account Type
          </h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${profile.accountType === 'demo' ? 'bg-green-500/20 border border-green-500/30' : 'bg-yellow-500/20 border border-yellow-500/30'}`}>
            <span className={`text-lg font-semibold ${profile.accountType === 'demo' ? 'text-green-400' : 'text-yellow-400'}`}>
              {profile.accountType === 'demo' ? 'DEMO ACCOUNT' : 'REAL ACCOUNT'}
            </span>
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