import React from 'react';
import Link from 'next/link';
import { Button, Heading, Text } from '@xyflow/xy-ui';

function NotFound() {
  return (
    <div className="mx-auto my-8 max-w-xl text-center">
      <Heading className="mb-6 font-black ">
        <span className="text-react">404</span> Page Not Found
      </Heading>
      <Text size="lg">
        We could not find the page you were looking for. Please check the URL or go back to the homepage.
      </Text>
      <div className="mt-6">
        <Link href="/">
          <Button>Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
