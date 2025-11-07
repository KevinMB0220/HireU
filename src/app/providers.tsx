'use client';

import { WdkProvider } from '@/contexts/WdkContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <WdkProvider>{children}</WdkProvider>;
}
