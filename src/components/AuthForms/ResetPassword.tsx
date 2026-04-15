'use client';

import { useState, useRef } from 'react';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { useNhostClient } from '@nhost/nextjs';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

import { useRouter, useSearchParams } from 'next/navigation';

import { AuthErrorNotification } from './AuthNotification';

const ResetPassword = () => {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const defaultEmail = useSearchParams()?.get('email');
  const [email, setEmail] = useState<string>(defaultEmail || '');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const nhostClient = useNhostClient();
  const router = useRouter();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    setIsError(false);
  };

  const onSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    setLoading(true);
    setIsError(false);

    const baseUrl = nhostClient.auth.url;
    const turnstileResponse = turnstileRef.current?.getResponse();

    const url = `${baseUrl}/user/password/reset`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cf-turnstile-response': turnstileResponse,
      },
      body: JSON.stringify({ email, options: { redirectTo: `${window.location.origin}/account` } }),
    });

    if (res.ok) {
      router.push(`/email-verification?email=${email}`);
    } else {
      setLoading(false);
      return setIsError(true);
    }

    return setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      {isError && (
        <AuthErrorNotification
          error={{
            error: 'reset-password-fail',
            message: 'Failed to send reset password email. Please try again.',
            status: 400,
          }}
        />
      )}
      <div className="flex flex-col space-y-4 mb-2">
        <>
          <div>
            <InputLabel className="text-gray-800" htmlFor="email">
              Email
            </InputLabel>
            <Input
              required
              variant="square"
              value={email}
              onChange={onChange}
              id="email"
              placeholder="Email"
              type="email"
            />
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              className="mt-4"
              options={{
                theme: 'light',
                size: 'flexible',
              }}
            />
          </div>

          <Button disabled={isLoading} loading={isLoading} size="lg" className="w-full shrink-0" type="submit">
            Send Reset Password Link
          </Button>
        </>
      </div>
    </form>
  );
};

export default ResetPassword;
