import { Profile } from './types';

const key = (wallet: string) => `receipt-passport-profile:${wallet.toLowerCase()}`;

export const profileStorage = {
  get(wallet: string): Profile | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(key(wallet));
    return data ? (JSON.parse(data) as Profile) : null;
  },
  set(profile: Profile) {
    localStorage.setItem(key(profile.wallet), JSON.stringify(profile));
  },
};
