'use client';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import toast from 'react-hot-toast';
import { contractAddresses, escrowAbi } from '@/lib/contracts';

export function ProofForm({ dealId }: { dealId: bigint }) {
  const [proofURI, setProofURI] = useState('');
  const { writeContractAsync, isPending } = useWriteContract();
  const submit = async () => {
    if (!proofURI.trim()) return toast.error('Proof URI is required.');
    const tx = writeContractAsync({ address: contractAddresses.escrow!, abi: escrowAbi, functionName: 'submitDeliveryProof', args: [dealId, proofURI] });
    await toast.promise(tx, { loading: 'Submitting proof...', success: 'Proof submitted', error: 'Proof submit failed' });
  };
  return <div className="grid"><input className="input" placeholder="ipfs://... or https://..." value={proofURI} onChange={(e) => setProofURI(e.target.value)} /><button className="btn" disabled={isPending} onClick={submit}>Submit Proof</button></div>;
}
