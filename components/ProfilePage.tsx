'use client';

import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { profileStorage } from '@/lib/storage';
import { DealRecord } from '@/lib/types';
import { computeReputation } from '@/lib/reputation';
import { ProfileCard } from './ProfileCard';
import { ReputationScoreCard } from './ReputationScoreCard';

export function ProfilePage({ deals }: { deals: DealRecord[] }) {
  const { address } = useAccount();
  const [tick, setTick] = useState(0);
  const profile = useMemo(() => (address ? profileStorage.get(address) : null), [address, tick]);
  const reputation = useMemo(() => computeReputation(address || '0x0', deals), [address, deals]);

  if (!address) return <div className="card">Connect wallet to view profile.</div>;

  return (
    <div className="grid">
      <ProfileCard profile={profile} address={address} />
      <div className="card grid">
        <h3>Edit Profile</h3>
        <button
          className="btn btn-secondary"
          onClick={() => {
            const name = prompt('Name', profile?.name || '') || '';
            const avatarUrl = prompt('Avatar URL', profile?.avatarUrl || '') || '';
            const twitter = prompt('X Handle', profile?.twitter || '') || '';
            if (!name.trim()) return;
            profileStorage.set({ wallet: address, name, avatarUrl, twitter });
            setTick((v) => v + 1);
          }}
        >
          Edit Profile
        </button>
      </div>
      <ReputationScoreCard reputation={reputation} />
    </div>
  );
}
