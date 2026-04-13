'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { sampleDeals } from '@/lib/demo-data';
import { EmptyState } from '@/components/EmptyState';
import { ReceiptCard } from '@/components/ReceiptCard';
import { profileStorage } from '@/lib/storage';
import { FundDealButton } from '@/components/FundDealButton';
import { ProofForm } from '@/components/ProofForm';
import { DisputeModal } from '@/components/DisputeModal';
import { AIAssistantPanel } from '@/components/AIAssistantPanel';
import { FutureReceiptNFTCard } from '@/components/FutureReceiptNFTCard';
import { ReputationScoreCard } from '@/components/ReputationScoreCard';
import { computeReputation } from '@/lib/reputation';
import { useWriteContract } from 'wagmi';
import { contractAddresses, escrowAbi } from '@/lib/contracts';
import toast from 'react-hot-toast';

export default function DealDetailPage() {
  const params = useParams<{ id: string }>();
  const deal = useMemo(() => sampleDeals.find((d) => d.id.toString() === params.id), [params.id]);
  const { writeContractAsync } = useWriteContract();

  if (!deal) return <EmptyState title="Deal not found" description="The deal ID is not indexed yet." />;

  const buyer = profileStorage.get(deal.buyer);
  const seller = profileStorage.get(deal.seller);
  const buyerReputation = computeReputation(deal.buyer, sampleDeals);

  const run = async (name: 'releaseFunds' | 'refundBuyer' | 'cancelDeal') => {
    const tx = writeContractAsync({ address: contractAddresses.escrow!, abi: escrowAbi, functionName: name, args: [deal.id] });
    await toast.promise(tx, { loading: `${name}...`, success: `${name} submitted`, error: `${name} failed` });
  };

  return <div className="grid"><ReceiptCard deal={deal} buyer={buyer} seller={seller} /><div className="card"><h3>Approve + Fund</h3><FundDealButton dealId={deal.id} amount={(Number(deal.amount) / 1e6).toString()} /></div><div className="card"><h3>Submit Delivery Proof</h3><ProofForm dealId={deal.id} /></div><div className="card" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><DisputeModal dealId={deal.id} /><button className="btn" onClick={() => run('releaseFunds')}>Release Funds</button><button className="btn btn-secondary" onClick={() => run('refundBuyer')}>Refund Buyer</button><button className="btn btn-secondary" onClick={() => run('cancelDeal')}>Cancel Deal</button></div><ReputationScoreCard reputation={buyerReputation} /><AIAssistantPanel deal={deal} /><FutureReceiptNFTCard /></div>;
}
