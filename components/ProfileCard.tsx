import Image from 'next/image';
import { Profile } from '@/lib/types';
import { shorten } from '@/lib/utils';

export function ProfileCard({ profile, address }: { profile: Profile | null; address: string }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Image src={profile?.avatarUrl || 'https://api.dicebear.com/9.x/initials/svg?seed=User'} width={48} height={48} alt="avatar" style={{ borderRadius: 999 }} />
      <div>
        <strong>{profile?.name || 'Anonymous User'}</strong>
        <div className="muted" style={{ fontSize: '.85rem' }}>{shorten(address)}</div>
        {profile?.twitter ? <div style={{ fontSize: '.85rem' }}>@{profile.twitter.replace('@', '')}</div> : null}
      </div>
    </div>
  );
}
