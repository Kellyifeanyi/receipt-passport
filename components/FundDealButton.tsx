'use client';

import { parseUnits } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import toast from 'react-hot-toast';
import { contractAddresses, escrowAbi, mockUsdcAbi } from '@/lib/contracts';

export function FundDealButton({ dealId, amount }: { dealId: bigint; amount: string }) {
  const { address } = useAccount();
  const { data: allowance } = useReadContract({
    address: contractAddresses.mockUsdc,
    abi: mockUsdcAbi,
    functionName: 'allowance',
    args: address && contractAddresses.escrow ? [address, contractAddresses.escrow] : undefined,
    query: { enabled: Boolean(address && contractAddresses.mockUsdc && contractAddresses.escrow) },
  });
  const { writeContractAsync, isPending } = useWriteContract();
  const parsed = parseUnits(amount || '0', 6);

  const approve = async () => {
    const tx = writeContractAsync({ address: contractAddresses.mockUsdc!, abi: mockUsdcAbi, functionName: 'approve', args: [contractAddresses.escrow!, parsed] });
    await toast.promise(tx, { loading: 'Approving...', success: 'Approved', error: 'Approve failed' });
  };
  const fund = async () => {
    const tx = writeContractAsync({ address: contractAddresses.escrow!, abi: escrowAbi, functionName: 'fundDeal', args: [dealId] });
    await toast.promise(tx, { loading: 'Funding deal...', success: 'Deal funded', error: 'Funding failed' });
  };

  const needsApproval = (allowance ?? 0) < parsed;
  return <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{needsApproval ? <button className="btn" disabled={isPending} onClick={approve}>Approve USDC</button> : null}<button className="btn btn-secondary" disabled={isPending} onClick={fund}>Fund Deal</button></div>;
}
