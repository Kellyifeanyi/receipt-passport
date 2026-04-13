'use client';

import { formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddresses, mockUsdcAbi } from '@/lib/contracts';

export function BalanceCard() {
  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    address: contractAddresses.mockUsdc,
    abi: mockUsdcAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const balance = data ?? 0;

  return (
    <div className="card">
      <p className="muted">MockUSDC Balance</p>

      <h2>
        {isLoading ? (
          <span
            className="skeleton"
            style={{ width: 120, height: 28, display: 'inline-block' }}
          />
        ) : (
          `${Number(formatUnits(balance as bigint, 6)).toLocaleString()} USDC`
        )}
      </h2>
    </div>
  );
}