'use client';

import * as React from 'react';

import { NhostProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { createNhostClientClient } from '@/utils/nhost';

export const nhost = createNhostClientClient();

type Props = {
  children: React.ReactNode;
};

function NhostClientProvider({ children }: Props) {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>{children}</NhostApolloProvider>
    </NhostProvider>
  );
}

export default NhostClientProvider;
