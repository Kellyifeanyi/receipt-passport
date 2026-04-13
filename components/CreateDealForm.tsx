'use client';

import { useState } from 'react';
import { isAddress, parseUnits } from 'viem';
import { useWriteContract } from 'wagmi';
import toast from 'react-hot-toast';
import { contractAddresses, escrowAbi } from '@/lib/contracts';

export function CreateDealForm() {
  const [seller, setSeller] = useState('');
  const [amount, setAmount] = useState('');
  const [receiptHash, setReceiptHash] = useState('');
  const [termsHash, setTermsHash] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const { writeContractAsync, isPending } = useWriteContract();

  const createDeal = async () => {
    if (!isAddress(seller) || !amount || !receiptHash || !termsHash || !metadataURI) {
      toast.error('All fields are required with valid values.');
      return;
    }
    if (receiptHash.length !== 66 || termsHash.length !== 66) {
      toast.error('receiptHash and termsHash must be bytes32 hex values.');
      return;
    }
    const tx = writeContractAsync({
      address: contractAddresses.escrow!,
      abi: escrowAbi,
      functionName: 'createDeal',
      args: [seller as `0x${string}`, parseUnits(amount, 6), receiptHash as `0x${string}`, termsHash as `0x${string}`, metadataURI],
    });
    await toast.promise(tx, { loading: 'Creating deal...', success: 'Deal created', error: 'Create deal failed' });
  };

  return <div className="card grid"><div><label className="label">Seller Address</label><input className="input" value={seller} onChange={(e) => setSeller(e.target.value)} /></div><div><label className="label">Amount (USDC)</label><input className="input" value={amount} onChange={(e) => setAmount(e.target.value)} /></div><div><label className="label">Receipt Hash (bytes32)</label><input className="input" value={receiptHash} onChange={(e) => setReceiptHash(e.target.value)} /></div><div><label className="label">Terms Hash (bytes32)</label><input className="input" value={termsHash} onChange={(e) => setTermsHash(e.target.value)} /></div><div><label className="label">Metadata URI</label><input className="input" value={metadataURI} onChange={(e) => setMetadataURI(e.target.value)} /></div><button className="btn" disabled={isPending || !contractAddresses.escrow} onClick={createDeal}>{isPending ? 'Creating...' : 'Create Deal'}</button></div>;
}
