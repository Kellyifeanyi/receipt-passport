import { DealRecord } from './types';

export type DealFilters = { query?: string; status?: string; sort?: 'newest' | 'oldest' | 'amountAsc' | 'amountDesc' };

export function filterDeals(deals: DealRecord[], filters: DealFilters) {
  let result = [...deals];
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((d) => d.id.toString().includes(q) || d.buyer.toLowerCase().includes(q) || d.seller.toLowerCase().includes(q));
  }
  if (filters.status && filters.status !== 'ALL') result = result.filter((d) => d.status === filters.status);
  if (filters.sort === 'oldest') result.sort((a, b) => Number((a.createdAt ?? 0) - (b.createdAt ?? 0)));
  if (filters.sort === 'amountAsc') result.sort((a, b) => Number(a.amount - b.amount));
  if (filters.sort === 'amountDesc') result.sort((a, b) => Number(b.amount - a.amount));
  if (!filters.sort || filters.sort === 'newest') result.sort((a, b) => Number((b.createdAt ?? 0) - (a.createdAt ?? 0)));
  return result;
}
