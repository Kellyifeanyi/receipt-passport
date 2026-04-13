'use client';

import { useState } from 'react';
import { Profile } from '@/lib/types';

export function ProfileModal({ wallet, onSave }: { wallet: `0x${string}`; onSave: (p: Profile) => void }) {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [twitter, setTwitter] = useState('');

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create your profile</h3>
        <div className="grid" style={{ marginTop: 10 }}>
          <div><label className="label">Name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label className="label">Avatar URL</label><input className="input" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} /></div>
          <div><label className="label">X Handle</label><input className="input" value={twitter} onChange={(e) => setTwitter(e.target.value)} /></div>
          <button className="btn" disabled={!name.trim()} onClick={() => onSave({ wallet, name: name.trim(), avatarUrl: avatarUrl.trim(), twitter: twitter.trim() })}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}
