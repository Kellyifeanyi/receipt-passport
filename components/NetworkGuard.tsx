'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { ARC_CHAIN } from '@/lib/contracts';

export function NetworkGuard() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();
  const [failed, setFailed] = useState(false);
  const wrong = isConnected && chainId !== ARC_CHAIN.id;

  useEffect(() => {
    if (wrong) {
      switchChainAsync({ chainId: ARC_CHAIN.id }).catch(() => setFailed(true));
    }
  }, [wrong, switchChainAsync]);

  if (!wrong) return null;
  return (
    <div className="card" style={{ borderColor: '#fca5a5', marginBottom: 16 }}>
      <strong>Wrong network detected.</strong>
      <p className="muted">Please switch to Arc Testnet (Chain ID 5042002).</p>
      {failed ? <button className="btn" onClick={() => switchChainAsync({ chainId: ARC_CHAIN.id })}>Switch Network</button> : null}
      {isPending ? <p className="muted">Switching network...</p> : null}
    </div>
  );
}
