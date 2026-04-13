'use client';

import { useMemo, useState } from 'react';
import { DealRecord } from '@/lib/types';
import { filterDeals } from '@/lib/deal-indexer';
import { DealCard } from './DealCard';
import { EmptyState } from './EmptyState';

export function DealList({ deals }: { deals: DealRecord[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ALL');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'amountAsc' | 'amountDesc'>('newest');
  const filtered = useMemo(() => filterDeals(deals, { query, status, sort }), [deals, query, status, sort]);

  return <div className="grid"><div className="card grid md-3"><input className="input" placeholder="Search by deal, wallet..." value={query} onChange={(e) => setQuery(e.target.value)} /><select className="input" value={status} onChange={(e) => setStatus(e.target.value)}><option>ALL</option><option>CREATED</option><option>FUNDED</option><option>PROOF_SUBMITTED</option><option>DISPUTED</option><option>RELEASED</option><option>REFUNDED</option><option>CANCELLED</option></select><select className="input" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="amountAsc">Amount Asc</option><option value="amountDesc">Amount Desc</option></select></div>{filtered.length ? filtered.map((d) => <DealCard key={d.id.toString()} deal={d} />) : <EmptyState title="No deals found" description="Create a deal or change filters." />}</div>;
}
