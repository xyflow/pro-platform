'use client';

import * as React from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { SignInOAuth } from '@/components/AuthForms';
import { Button } from '@xyflow/xy-ui';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, Heading, Text } from '@xyflow/xy-ui';
import { AuthNotification } from './AuthNotification';

type AuthFormWrapperProps = {
  children?: React.ReactNode;
  links?: { href: string; label: string }[];
  showOAuth?: boolean;
  showHero?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const AuthFormWrapper = ({
  children,
  links = [],
  showOAuth = true,
  showHero = true,
  title = null,
  description = null,
}: AuthFormWrapperProps) => {
  const searchParams = useSearchParams();
  const isExpiredTokenError = searchParams.get('error') === 'invalid-ticket';

  return (
    <div className="overflow-hidden -m-4 h-full">
      <div
        className="absolute opacity-10 w-[100vw] h-[70vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
        }}
      />
      <div className="max-w-6xl mx-auto pt-10 mb-20">
        {isExpiredTokenError && (
          <div className="px-4">
            <AuthNotification
              title="Your verification link has expired."
              description="Please request a new verification link to confirm your email and sign in."
              variant="error"
              className="flex justify-between items-center"
            >
              <Link className="shrink-0" href="/email-verification/resend-link">
                <Button variant="destructive">Request a new link</Button>
              </Link>
            </AuthNotification>
          </div>
        )}
        <div className="flex mt-10">
          {showHero && (
            <div className="hidden lg:block flex-1 max-w-xl mt-6 relative p-4">
              <Heading className="mb-4 font-black">
                Build Better Node-Based UIs with <span className="text-react">React Flow</span>
              </Heading>
              <Text size="lg">
                By subscribing to React Flow Pro you are securing the maintanance and development of our open source
                libraries.
              </Text>
            </div>
          )}
          <div className="flex flex-1 flex-col items-center z-20">
            {/* <div className="mb-5 flex flex-col items-center">
          <Logo />
        </div> */}
            <Card className="max-w-sm w-full">
              <CardHeader>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </CardHeader>
              <CardContent>
                {children}
                {showOAuth && (
                  <>
                    <div className="relative flex py-3 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-muted-foreground">or</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>
                    <SignInOAuth />
                  </>
                )}
              </CardContent>
            </Card>
            <div className="flex flex-col space-y-2 mt-5">
              {links.map((link) => (
                <div
                  className="flex items-center space-x-1 hover:text-slate-800 text-muted-foreground text-sm font-bold cursor-pointer"
                  key={link.href}
                >
                  <ArrowLongRightIcon className="h-4 w-4" />
                  <Link href={link.href}>{link.label}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
