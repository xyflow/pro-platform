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
        <Link href="/signin">
          <Button variant="react">Sign In</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
