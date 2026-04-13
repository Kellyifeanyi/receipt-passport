'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: 12, border: '1px solid #e2e8f0' } }} />
    </>
  );
}
