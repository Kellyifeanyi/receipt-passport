export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}><h3>{title}</h3><p className="muted">{description}</p></div>;
}
