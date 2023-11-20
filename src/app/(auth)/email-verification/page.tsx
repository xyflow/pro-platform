'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Heading, Text } from '@xyflow/xy-ui';
import { useSearchParams } from 'next/navigation';

function VerifyEmailPage() {
  const defaultEmail = useSearchParams()?.get('email');

  return (
    <div className="mx-auto my-8 max-w-2xl text-center">
      <Heading size="md" className="mb-6 font-primary ">
        Your email is not verified.
      </Heading>
      <Text size="lg">
        In order to sign in, you need to verify your email by clicking the link we have sent you. If you didn{"'"}t
        receive a link, you can request a new one{' '}
        <Link className="text-primary hover:underline" href={`/email-verification/resend-link?email=${defaultEmail}`}>
          here
        </Link>
        .
      </Text>
    </div>
  );
}

export default VerifyEmailPage;
