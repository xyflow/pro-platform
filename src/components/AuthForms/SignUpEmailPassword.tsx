'use client';

import { useState, useRef } from 'react';
import { useSignUpEmailPassword } from '@nhost/nextjs';
import Link from 'next/link';

import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { redirect } from 'next/navigation';

import { AuthErrorNotification } from './AuthNotification';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signUpEmailPassword, isLoading, isError, needsEmailVerification, isSuccess, error } =
    useSignUpEmailPassword();

  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const turnstileResponse = turnstileRef.current?.getResponse();

    await signUpEmailPassword(email, password, undefined, {
      headers: {
        'x-cf-turnstile-response': turnstileResponse,
      },
    });

    turnstileRef.current?.reset();
  };

  if (needsEmailVerification) {
    const queryParams = email ? `?email=${email}` : '';
    redirect(`/email-verification${queryParams}`);
  }

  if (isSuccess) {
    redirect('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      {isError && <AuthErrorNotification error={error} />}
      <div className="mb-2">
        <InputLabel className="text-gray-800" htmlFor="email">
          Email
        </InputLabel>
        <Input
          variant="square"
          id="email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          autoComplete="on"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <InputLabel className="text-gray-800" htmlFor="password">
          Password
        </InputLabel>
        <Input
          variant="square"
          id="password"
          type="password"
          value={password}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)}
          placeholder="Password"
          required
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
        <div className="text-light text-sm mt-2">
          By signing up, you agree to our{' '}
          <Link href="https://www.xyflow.com/terms-of-use" className="text-primary hover:underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="https://www.xyflow.com/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>

      <Button
        size="lg"
        className="w-full mt-2"
        disabled={isLoading || needsEmailVerification}
        loading={isLoading}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
}

export default Signup;
