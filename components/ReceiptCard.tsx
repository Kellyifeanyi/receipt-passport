import { DealRecord, Profile } from '@/lib/types';
import { ProfileCard } from './ProfileCard';
import { StatusBadge } from './StatusBadge';

export function ReceiptCard({ deal, buyer, seller }: { deal: DealRecord; buyer: Profile | null; seller: Profile | null }) {
  return <div className="card grid"><div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Receipt Passport #{deal.id.toString()}</h3><StatusBadge status={deal.status} /></div><div className="grid md-2"><ProfileCard profile={buyer} address={deal.buyer} /><ProfileCard profile={seller} address={deal.seller} /></div><div className="grid md-2"><div><p className="muted">receiptHash</p><code>{deal.receiptHash}</code></div><div><p className="muted">termsHash</p><code>{deal.termsHash}</code></div><div><p className="muted">metadataURI</p><p>{deal.metadataURI}</p></div><div><p className="muted">proofURI</p><p>{deal.proofURI || 'N/A'}</p></div></div><div><p className="muted">Dispute Reason</p><p>{deal.disputeReason || 'None'}</p></div></div>;
}
