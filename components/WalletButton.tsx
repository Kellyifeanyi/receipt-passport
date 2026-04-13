'use client';

import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { shorten } from '@/lib/utils';
import { WalletModal } from './WalletModal';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  if (isConnected) {
    return <button className="btn btn-secondary" onClick={() => disconnect()}>{shorten(address)} · Disconnect</button>;
  }
  return <>{open ? <WalletModal onClose={() => setOpen(false)} /> : null}<button className="btn" onClick={() => setOpen(true)}>Connect Wallet</button></>;
}
