import { DealStatus } from '@/lib/types';

const map: Record<DealStatus, { bg: string; color: string }> = {
  CREATED: { bg: '#eef2ff', color: '#3730a3' },
  FUNDED: { bg: '#dbeafe', color: '#1d4ed8' },
  PROOF_SUBMITTED: { bg: '#e0f2fe', color: '#0369a1' },
  DISPUTED: { bg: '#fee2e2', color: '#b91c1c' },
  RELEASED: { bg: '#dcfce7', color: '#166534' },
  REFUNDED: { bg: '#ffedd5', color: '#9a3412' },
  CANCELLED: { bg: '#e2e8f0', color: '#334155' },
};

export function StatusBadge({ status }: { status: DealStatus }) {
  return <span className="badge" style={{ background: map[status].bg, color: map[status].color }}>{status.replace('_', ' ')}</span>;
}
