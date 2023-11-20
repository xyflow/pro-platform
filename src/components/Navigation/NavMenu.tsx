'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@nhost/nextjs';
import { Button } from '@xyflow/xy-ui';
import UserMenu from './UserMenu';

export default function NavMenu() {
  const pathname = usePathname();
  const isSignInPage = pathname === '/signin';
  const btnLink = isSignInPage ? '/signup' : '/signin';
  const btnLabel = isSignInPage ? 'Sign Up' : 'Sign In';

  return (
    <div className="h-[40px] flex items-center">
      <SignedIn>
        <UserMenu />
      </SignedIn>
      <SignedOut>
        <Link href={btnLink}>
          <Button>{btnLabel}</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
