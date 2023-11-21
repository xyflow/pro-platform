'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSendVerificationEmail } from '@nhost/nextjs';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';

import { AuthErrorNotification, AuthNotification } from './AuthNotification';
import { getBaseUrl } from '@/utils';

function ResendVerificationLink() {
  const defaultEmail = useSearchParams()?.get('email');
  const [email, setEmail] = useState<string>(defaultEmail || '');
  const { sendEmail, isLoading, isSent, isError, error } = useSendVerificationEmail();

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    sendEmail(email, { redirectTo: getBaseUrl() });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && <AuthErrorNotification error={error} />}
      {isSent && (
        <AuthNotification
          variant="success"
          title="We have sent you a link"
          description="Please check your email to sign in."
        />
      )}
      <div className="mb-4">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          variant="square"
          placeholder="Your Email"
          id="email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <Button disabled={isLoading} loading={isLoading} size="lg" className="w-full" type="submit" variant="react">
        Send Verification Link
      </Button>
    </form>
  );
}

export default ResendVerificationLink;
