'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useAuthenticationStatus, useNhostClient } from '@nhost/nextjs';
import { getHostName } from '@/utils';

const hostName = getHostName();

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const nhostClient = useNhostClient();

  const ticket = searchParams.get('ticket');

  if (ticket) {
    const redirectTo = ticket.includes('passwordReset') ? `${hostName}/account` : hostName;
    redirect(`${nhostClient.auth.url}/verify?ticket=${ticket}&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  redirect('/?error=invalid-ticket');
}
