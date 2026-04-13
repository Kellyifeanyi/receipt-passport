import { ProfilePage } from '@/components/ProfilePage';
import { sampleDeals } from '@/lib/demo-data';

export default function ProfileRoutePage() {
  return <ProfilePage deals={sampleDeals} />;
}
