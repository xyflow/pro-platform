'use client';

import { getBaseUrl } from '@/utils';
import { useProviderLink } from '@nhost/nextjs';
import { Button } from '@xyflow/xy-ui';

const SignInOAuth = () => {
  const { github } = useProviderLink({ metadata: {}, redirectTo: getBaseUrl() });

  return (
    <div>
      <a href={github}>
        <Button size="lg" className="w-full" variant="outline">
          Sign in with Github
        </Button>
      </a>
    </div>
  );
};

export default SignInOAuth;
