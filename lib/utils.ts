export const shorten = (addr?: string) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '');
