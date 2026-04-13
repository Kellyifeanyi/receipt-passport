import { DealRecord } from './types';

export const sampleDeals: DealRecord[] = [
  {
    id: 1n,
    buyer: '0x1111111111111111111111111111111111111111',
    seller: '0x2222222222222222222222222222222222222222',
    amount: 25000000n,
    receiptHash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    termsHash: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    metadataURI: 'ipfs://receipt-1',
    proofURI: 'ipfs://proof-1',
    status: 'PROOF_SUBMITTED',
    createdAt: Date.now() - 60000,
  },
  {
    id: 2n,
    buyer: '0x3333333333333333333333333333333333333333',
    seller: '0x4444444444444444444444444444444444444444',
    amount: 10000000n,
    receiptHash: '0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    termsHash: '0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    metadataURI: 'ipfs://receipt-2',
    status: 'RELEASED',
    createdAt: Date.now() - 200000,
  },
];
