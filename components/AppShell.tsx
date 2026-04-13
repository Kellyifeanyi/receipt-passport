'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { NetworkGuard } from './NetworkGuard';
import { profileStorage } from '@/lib/storage';
import { ProfileModal } from './ProfileModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [needsProfile, setNeedsProfile] = useState(false);

  useEffect(() => {
    if (isConnected && address) setNeedsProfile(!profileStorage.get(address));
    else setNeedsProfile(false);
  }, [isConnected, address]);

  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '1.2rem 0 2rem' }}>
        <NetworkGuard />
        {children}
      </main>
      {needsProfile && address ? (
        <ProfileModal
          wallet={address}
          onSave={(profile) => {
            profileStorage.set(profile);
            setNeedsProfile(false);
          }}
        />
      ) : null}
    </>
  );
}
