'use client';

import React from 'react';
import Link from 'next/link';
import { Heading, Text } from '@xyflow/xy-ui';
import { useSearchParams } from 'next/navigation';

function VerifyEmailPage() {
  const defaultEmail = useSearchParams()?.get('email');
  const linkQueryParams = defaultEmail ? `?email=${defaultEmail}` : '';

  return (
    <div className="mx-auto mt-10 mb-8 max-w-2xl text-center">
      <Heading className="mb-4 font-black">
        Please verify that it{"'"}s <span className="text-primary">you</span>.
      </Heading>
      <Text size="lg">
        In order to sign in, you need to verify your email by clicking the link we have sent you. If you didn{"'"}t
        receive a link, you can request a new one{' '}
        <Link className="text-primary hover:underline" href={`/email-verification/resend-link${linkQueryParams}`}>
          here
        </Link>
        .
      </Text>
      <Text className="mt-12 text-light" size="lg">
        Please{' '}
        <Link className="text-primary hover:underline" href="https://xyflow.com/contact">
          contact us
        </Link>{' '}
        if you are having trouble signing in.
      </Text>
    </div>
  );
}

export default VerifyEmailPage;
