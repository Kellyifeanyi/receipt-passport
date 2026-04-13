'use client';

import { useConnect } from 'wagmi';
import { LoadingSpinner } from './LoadingSpinner';

export function WalletModal({ onClose }: { onClose: () => void }) {
  const { connectors, connect, isPending } = useConnect();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Connect Wallet</h3>
        <p className="muted">Choose an EVM wallet to continue.</p>
        <div className="grid" style={{ marginTop: 12 }}>
          {connectors.map((connector) => (
            <button className="btn btn-secondary" key={connector.uid} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          ))}
        </div>
        {isPending ? <div style={{ marginTop: 12 }}><LoadingSpinner text="Connecting Wallet..." /></div> : null}
      </div>
    </div>
  );
}
