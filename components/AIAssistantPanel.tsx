import { DealRecord } from '@/lib/types';

export function AIAssistantPanel({ deal }: { deal: DealRecord }) {
  const evidenceStrength = deal.proofURI ? 'Evidence looks present, moderate confidence.' : 'Evidence appears weak without proof URI.';
  const suggestion = deal.disputeReason ? 'Consider owner review due to active dispute context.' : 'Proceed with normal release if all parties are satisfied.';
  return <div className="card"><h3>AI Dispute Assistant (Advisory)</h3><p className="muted">This panel is advisory only and cannot execute on-chain resolution.</p><p><strong>Evidence Assessment:</strong> {evidenceStrength}</p><p><strong>Suggested Direction:</strong> {suggestion}</p></div>;
}
