'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

// @todo how can we do this server side?
// redirects to the dashboard if the user is already signed in
// should we include search params here?
const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthenticationStatus();

  if (isAuthenticated) {
    redirect('/');
  }

  return children;
};

export default AuthRedirect;
