'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useNhostClient } from '@nhost/nextjs';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const nhostClient = useNhostClient();

  const ticket = searchParams.get('ticket');
  const redirectTo = searchParams.get('redirectTo');
  const type = searchParams.get('type');

  if (ticket && redirectTo && type) {
    redirect(`${nhostClient.auth.url}/verify?ticket=${ticket}&type=${type}&redirectTo=${redirectTo}`);
  }

  redirect('/?error=invalid-ticket');
}
