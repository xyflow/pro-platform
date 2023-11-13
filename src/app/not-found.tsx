'use client';

import React from 'react';
import { LogoLoader } from '@/components/Loader';

function NotFound() {
  return (
    <div className="flex h-[500px] items-center">
      <LogoLoader />
    </div>
  );
}

export default NotFound;
