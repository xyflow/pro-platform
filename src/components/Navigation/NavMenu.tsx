'use client';

import Link from 'next/link';
import { SignedIn, SignedOut } from '@nhost/nextjs';
import { Button } from '@xyflow/xy-ui';
import UserMenu from './UserMenu';

export default function NavMenu() {
  return (
    <div className="h-[40px] flex items-center">
      <SignedIn>
        <UserMenu />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-x-4">
          <Link className="hidden sm:block shrink-0" href="/signin">
            <Button className="font-bold" variant="link">
              Sign In
            </Button>
          </Link>
          <Link className="shrink-0" href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
