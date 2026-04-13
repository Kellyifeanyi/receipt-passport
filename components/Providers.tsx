'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { injected, walletConnect, metaMask } from 'wagmi/connectors';
import { ARC_CHAIN } from '@/lib/contracts';
import { ToastProvider } from './ToastProvider';

const config = createConfig({
  chains: [ARC_CHAIN],
  connectors: [injected(), metaMask(), walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo' })],
  transports: { [ARC_CHAIN.id]: http(ARC_CHAIN.rpcUrls.default.http[0]) },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
