import { DealRecord, Reputation } from './types';

export function computeReputation(wallet: string, deals: DealRecord[]): Reputation {
  const mine = deals.filter((d) => [d.buyer.toLowerCase(), d.seller.toLowerCase()].includes(wallet.toLowerCase()));
  if (!mine.length) return { score: 0, successfulDeals: 0, disputedDeals: 0, completionRate: 0 };
  const successfulDeals = mine.filter((d) => d.status === 'RELEASED').length;
  const disputedDeals = mine.filter((d) => d.status === 'DISPUTED').length;
  const completed = mine.filter((d) => ['RELEASED', 'REFUNDED'].includes(d.status)).length;
  const completionRate = Math.round((completed / mine.length) * 100);
  const disputeRatio = disputedDeals / mine.length;
  const score = Math.max(0, Math.min(100, Math.round(successfulDeals * 12 + completionRate * 0.7 - disputeRatio * 25)));
  return { score, successfulDeals, disputedDeals, completionRate };
}
