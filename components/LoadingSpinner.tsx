export function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 999, background: '#2563eb', animation: 'pulse 1s infinite' }} />{text}</div>;
}
