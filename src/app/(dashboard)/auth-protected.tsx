'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

import { PageLoader } from '@/components/Loader';
import useQueryString from '@/hooks/useQueryString';
import useSubscription from '@/hooks/useSubscription';

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const { isLoading: isSubscriptionLoading } = useSubscription();
  const queryString = useQueryString();

  if (isLoading || isSubscriptionLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    redirect(`/signin${queryString}`);
  }

  return children;
};

export default AuthProtection;
