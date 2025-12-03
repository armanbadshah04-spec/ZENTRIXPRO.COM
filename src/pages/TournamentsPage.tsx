import React from 'react';
import { TrophyIcon, UsersIcon, ClockIcon, CoinsIcon, ArrowLeftIcon } from 'lucide-react';
interface Tournament {
  id: string;
  name: string;
  prize: number;
  participants: number;
  maxParticipants: number;
  startTime: string;
  endTime: string;
  status: 'open' | 'active' | 'ended';
  entryFee: number;
}
const MOCK_TOURNAMENTS: Tournament[] = [{
  id: '1',
  name: 'Weekly Championship',
  prize: 50000,
  participants: 847,
  maxParticipants: 1000,
  startTime: '2024-01-15 10:00',
  endTime: '2024-01-22 10:00',
  status: 'open',
  entryFee: 100
}, {
  id: '2',
  name: 'Speed Trading Challenge',
  prize: 25000,
  participants: 523,
  maxParticipants: 500,
  startTime: '2024-01-14 14:00',
  endTime: '2024-01-14 18:00',
  status: 'active',
  entryFee: 50
}, {
  id: '3',
  name: 'Crypto Masters',
  prize: 100000,
  participants: 1456,
  maxParticipants: 2000,
  startTime: '2024-01-20 00:00',
  endTime: '2024-01-27 23:59',
  status: 'open',
  entryFee: 200
}, {
  id: '4',
  name: 'Forex Legends',
  prize: 75000,
  participants: 1089,
  maxParticipants: 1500,
  startTime: '2024-01-18 08:00',
  endTime: '2024-01-25 20:00',
  status: 'open',
  entryFee: 150
}];
interface TournamentsPageProps {
  onBack: () => void;
}
export function TournamentsPage({
  onBack
}: TournamentsPageProps) {
  return <div className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a0e27] to-[#0f1535] border-b border-gray-800 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Trading
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <TrophyIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Tournaments</h1>
              <p className="text-gray-400">
                Compete with traders worldwide and win prizes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TOURNAMENTS.map(tournament => <div key={tournament.id} className="bg-[#0f1535] rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${tournament.status === 'open' ? 'bg-green-500/20 text-green-400' : tournament.status === 'active' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {tournament.status === 'open' ? 'Open' : tournament.status === 'active' ? 'Active' : 'Ended'}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <TrophyIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Prize Pool</span>
                </div>
              </div>

              {/* Tournament Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {tournament.name}
              </h3>

              {/* Prize */}
              <div className="text-3xl font-bold text-yellow-400 mb-4">
                ${tournament.prize.toLocaleString()}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#0a0e27] rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <UsersIcon className="w-4 h-4" />
                    Participants
                  </div>
                  <div className="text-white font-semibold">
                    {tournament.participants} / {tournament.maxParticipants}
                  </div>
                </div>

                <div className="bg-[#0a0e27] rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <CoinsIcon className="w-4 h-4" />
                    Entry Fee
                  </div>
                  <div className="text-white font-semibold">
                    ${tournament.entryFee}
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="bg-[#0a0e27] rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <ClockIcon className="w-4 h-4" />
                  Duration
                </div>
                <div className="text-xs text-gray-400">
                  <div>Start: {tournament.startTime}</div>
                  <div>End: {tournament.endTime}</div>
                </div>
              </div>

              {/* Join Button */}
              <button disabled={tournament.status !== 'open'} className={`w-full py-3 rounded-lg font-semibold transition-all ${tournament.status === 'open' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                {tournament.status === 'open' ? 'Join Tournament' : tournament.status === 'active' ? 'In Progress' : 'Ended'}
              </button>
            </div>)}
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