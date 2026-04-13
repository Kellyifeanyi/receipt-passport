import Link from 'next/link';
import { formatUnits } from 'viem';
import { DealRecord } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { shorten } from '@/lib/utils';

export function DealCard({ deal }: { deal: DealRecord }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Deal #{deal.id.toString()}</strong><StatusBadge status={deal.status} /></div>
      <p className="muted">Buyer {shorten(deal.buyer)} · Seller {shorten(deal.seller)}</p>
      <p>{Number(formatUnits(deal.amount, 6)).toLocaleString()} USDC</p>
      <Link className="btn btn-secondary" href={`/deals/${deal.id.toString()}`}>View Deal</Link>
    </div>
  );
}
