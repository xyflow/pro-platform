'use client';

import { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import { PageLoader } from '@/components/Loader';
import AuthProtected from './auth-protected';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthProtected>
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto relative">
          <Sidebar />
          <div className="pt-4 pb-20 flex-1 min-h-[75vh] lg:pl-6 lg:pt-0 lg:border-l min-w-0">{children}</div>
        </div>
      </AuthProtected>
    </Suspense>
  );
}

export default DashboardLayout;
