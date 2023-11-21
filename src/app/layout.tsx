import Footer from '@/components/Footer';
import ClientProviders from '@/components/Providers';
import Navigation from '@/components/Navigation';

import { NtDapperFont } from '@/fonts';

import '@/styles/globals.css';

// @todo add correct metadata here
export const metadata = {
  title: 'React Flow Pro',
  description: 'Generated by Next.js',
};

// @todo why is SSR not working in production?
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={NtDapperFont.className}>
      <head>
        {/* @todo replace with nextjs metadata api: https://nextjs.org/docs/app/api-reference/file-conventions/metadata */}
        <title>React Flow Pro</title>
        {/* @todo remove noindex nofollow after launch */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="title" content="React Flow Pro" />
        <meta
          name="description"
          content="Subscribe to React Flow Pro to get access to exclusive features of React Flow, a highly customizable library for building node-based editors, interactive graphs and flow charts"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reactflowdev" />
        <meta name="twitter:title" content="React Flow Pro" />
        <meta
          name="twitter:description"
          content="Subscribe to React Flow Pro to get access to exclusive features of React Flow, a highly customizable library for building node-based editors, interactive graphs and flow charts"
        />
        <meta name="twitter:image" content="https://reactflow.dev/img/social/social.jpeg" />
        <meta property="og:title" content="React Flow Pro" />
        <meta property="og:url" content="https://pro.reactflow.dev" />
        <meta property="og:image" content="https://reactflow.dev/img/social/social.jpeg" />
      </head>
      <body className="bg-white">
        <ClientProviders>
          <div className="bg-white">
            <Navigation />
            <div className="p-4 relative min-h-[calc(100vh-200px)] overflow-hidden">{children}</div>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
