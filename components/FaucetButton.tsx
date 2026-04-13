'use client';

import toast from 'react-hot-toast';
import { useWriteContract } from 'wagmi';
import { contractAddresses, faucetAbi } from '@/lib/contracts';

export function FaucetButton() {
  const { writeContractAsync, isPending } = useWriteContract();

  return (
    <button
      className="btn"
      disabled={isPending || !contractAddresses.faucet}
      onClick={async () => {
        const tx = writeContractAsync({ address: contractAddresses.faucet!, abi: faucetAbi, functionName: 'claim' });
        await toast.promise(tx, { loading: 'Claiming...', success: 'Claim submitted', error: 'Claim failed' });
      }}
    >
      {isPending ? 'Claiming...' : 'Claim Faucet Tokens'}
    </button>
  );
}
