export type Profile = {
  name: string;
  avatarUrl?: string;
  twitter?: string;
  wallet: `0x${string}`;
};

export type DealStatus = 'CREATED' | 'FUNDED' | 'PROOF_SUBMITTED' | 'DISPUTED' | 'RELEASED' | 'REFUNDED' | 'CANCELLED';

export type DealRecord = {
  id: bigint;
  buyer: `0x${string}`;
  seller: `0x${string}`;
  amount: bigint;
  receiptHash: `0x${string}`;
  termsHash: `0x${string}`;
  metadataURI: string;
  proofURI?: string;
  disputeReason?: string;
  status: DealStatus;
  createdAt?: number;
};

export type Reputation = {
  score: number;
  successfulDeals: number;
  disputedDeals: number;
  completionRate: number;
};
