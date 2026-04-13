'use client';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { contractAddresses, escrowAbi } from '@/lib/contracts';
import toast from 'react-hot-toast';

export function DisputeModal({ dealId }: { dealId: bigint }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const { writeContractAsync, isPending } = useWriteContract();
  const submit = async () => {
    if (!reason.trim()) return toast.error('Dispute reason is required.');
    const tx = writeContractAsync({ address: contractAddresses.escrow!, abi: escrowAbi, functionName: 'openDispute', args: [dealId, reason] });
    await toast.promise(tx, { loading: 'Opening dispute...', success: 'Dispute opened', error: 'Dispute failed' });
    setOpen(false);
  };

  return <>{open ? <div className="modal-backdrop"><div className="modal"><h3>Open Dispute</h3><textarea className="input" value={reason} onChange={(e) => setReason(e.target.value)} rows={4} /><div style={{ display: 'flex', gap: 8, marginTop: 12 }}><button className="btn" onClick={submit} disabled={isPending}>Submit</button><button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button></div></div></div> : null}<button className="btn btn-secondary" onClick={() => setOpen(true)}>Open Dispute</button></>;
}
