'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { JSX } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

export function ConvexClientProvider({
  children,
}: ConvexClientProviderProps): JSX.Element {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
