'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { WalletButton } from './WalletButton';
import { ProfileCard } from './ProfileCard';
import { profileStorage } from '@/lib/storage';
import { useMemo } from 'react';

export function Navbar() {
  const { address } = useAccount();
  const profile = useMemo(() => (address ? profileStorage.get(address) : null), [address]);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/"><strong>Receipt Passport</strong></Link>
        <div className="nav-links">
          <Link href="/faucet">Faucet</Link><Link href="/create-deal">Create Deal</Link><Link href="/deals">Deals</Link><Link href="/profile">Profile</Link>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {address ? <div style={{ display: 'none' }} className="lg"><ProfileCard address={address} profile={profile} /></div> : null}
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
