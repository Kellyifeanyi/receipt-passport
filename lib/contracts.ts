import { getAddress } from 'viem';

export const ARC_CHAIN = {
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.arc.network'] },
    public: { http: ['https://rpc.testnet.arc.network'] },
  },
} as const;

const addr = (value: string | undefined) => (value ? getAddress(value) : undefined);

export const contractAddresses = {
  mockUsdc: addr(process.env.NEXT_PUBLIC_MOCKUSDC_ADDRESS),
  faucet: addr(process.env.NEXT_PUBLIC_FAUCET_ADDRESS),
  escrow: addr(process.env.NEXT_PUBLIC_ESCROW_ADDRESS),
};

export const mockUsdcAbi = [
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'approve', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'allowance', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }] },
] as const;

export const faucetAbi = [
  { type: 'function', name: 'claim', stateMutability: 'nonpayable', inputs: [], outputs: [] },
  { type: 'function', name: 'claimAmount', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'cooldown', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'lastClaimAt', stateMutability: 'view', inputs: [{ name: 'user', type: 'address' }], outputs: [{ type: 'uint256' }] },
] as const;

export const escrowAbi = [
  { type: 'function', name: 'createDeal', stateMutability: 'nonpayable', inputs: [{ type: 'address', name: 'seller' }, { type: 'uint256', name: 'amount' }, { type: 'bytes32', name: 'receiptHash' }, { type: 'bytes32', name: 'termsHash' }, { type: 'string', name: 'metadataURI' }], outputs: [] },
  { type: 'function', name: 'fundDeal', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }], outputs: [] },
  { type: 'function', name: 'submitDeliveryProof', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }, { type: 'string', name: 'proofURI' }], outputs: [] },
  { type: 'function', name: 'openDispute', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }, { type: 'string', name: 'reason' }], outputs: [] },
  { type: 'function', name: 'resolveDispute', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }, { type: 'bool', name: 'releaseToSeller' }], outputs: [] },
  { type: 'function', name: 'releaseFunds', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }], outputs: [] },
  { type: 'function', name: 'refundBuyer', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }], outputs: [] },
  { type: 'function', name: 'cancelDeal', stateMutability: 'nonpayable', inputs: [{ type: 'uint256', name: 'dealId' }], outputs: [] },
  { type: 'function', name: 'getDeal', stateMutability: 'view', inputs: [{ type: 'uint256', name: 'dealId' }], outputs: [{ type: 'tuple', components: [] }] },
  { type: 'function', name: 'getReceiptSummary', stateMutability: 'view', inputs: [{ type: 'uint256', name: 'dealId' }], outputs: [{ type: 'tuple', components: [] }] },
] as const;
