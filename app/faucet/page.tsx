'use client';

import { FaucetButton } from '@/components/FaucetButton';
import { BalanceCard } from '@/components/BalanceCard';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddresses, faucetAbi } from '@/lib/contracts';

export default function FaucetPage() {
  const { address } = useAccount();
  const { data: claimAmount } = useReadContract({ address: contractAddresses.faucet, abi: faucetAbi, functionName: 'claimAmount', query: { enabled: Boolean(contractAddresses.faucet) } });
  const { data: cooldown } = useReadContract({ address: contractAddresses.faucet, abi: faucetAbi, functionName: 'cooldown', query: { enabled: Boolean(contractAddresses.faucet) } });
  const { data: lastClaimAt } = useReadContract({ address: contractAddresses.faucet, abi: faucetAbi, functionName: 'lastClaimAt', args: address ? [address] : undefined, query: { enabled: Boolean(contractAddresses.faucet && address) } });

  return <div className="grid"><BalanceCard /><div className="card grid md-3"><div><p className="muted">Claim Amount</p><strong>{claimAmount?.toString() || '--'}</strong></div><div><p className="muted">Cooldown (s)</p><strong>{cooldown?.toString() || '--'}</strong></div><div><p className="muted">Last Claim At</p><strong>{lastClaimAt?.toString() || '--'}</strong></div></div><div className="card"><FaucetButton /></div></div>;
}
