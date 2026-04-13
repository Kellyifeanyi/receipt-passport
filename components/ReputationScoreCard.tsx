import { Reputation } from '@/lib/types';

export function ReputationScoreCard({ reputation }: { reputation: Reputation }) {
  return <div className="card"><h3>Reputation</h3><h2>{reputation.score}/100</h2><p className="muted">Successful Deals: {reputation.successfulDeals}</p><p className="muted">Disputed Deals: {reputation.disputedDeals}</p><p className="muted">Completion Rate: {reputation.completionRate}%</p></div>;
}
