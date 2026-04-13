'use client';

import { useParams } from 'next/navigation';
import { sampleDeals } from '@/lib/demo-data';
import { ReceiptCard } from '@/components/ReceiptCard';
import { profileStorage } from '@/lib/storage';
import { EmptyState } from '@/components/EmptyState';
import { ReputationScoreCard } from '@/components/ReputationScoreCard';
import { computeReputation } from '@/lib/reputation';

export default function ReceiptPassportPage() {
  const { id } = useParams<{ id: string }>();
  const deal = sampleDeals.find((d) => d.id.toString() === id);
  if (!deal) return <EmptyState title="Receipt not available" description="This receipt ID is unavailable." />;
  const buyer = profileStorage.get(deal.buyer);
  const seller = profileStorage.get(deal.seller);
  const rep = computeReputation(deal.buyer, sampleDeals);

  return <div className="grid"><ReceiptCard deal={deal} buyer={buyer} seller={seller} /><ReputationScoreCard reputation={rep} /></div>;
}
