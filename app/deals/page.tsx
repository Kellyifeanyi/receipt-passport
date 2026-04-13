import { DealList } from '@/components/DealList';
import { sampleDeals } from '@/lib/demo-data';

export default function DealsPage() {
  return <div className="grid"><h2>All Deals</h2><DealList deals={sampleDeals} /></div>;
}
