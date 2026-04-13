import Link from 'next/link';
import { BalanceCard } from '@/components/BalanceCard';

export default function LandingPage() {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="card" style={{ padding: '2rem 1rem' }}>
        <p className="badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Arc Testnet Escrow</p>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: '8px 0' }}>Receipt Passport</h1>
        <p className="muted">A premium escrow and receipt intelligence interface for secure USDC deals.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <Link className="btn" href="/create-deal">Create Deal</Link>
          <Link className="btn btn-secondary" href="/faucet">Claim MockUSDC</Link>
        </div>
      </section>
      <BalanceCard />
      <section className="grid md-3">
        {['Connect wallet', 'Create & fund escrow deal', 'Submit proof or resolve dispute'].map((item, idx) => (
          <div key={item} className="card"><p className="muted">Step {idx + 1}</p><strong>{item}</strong></div>
        ))}
      </section>
    </div>
  );
}
