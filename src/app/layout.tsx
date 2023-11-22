import Footer from '@/components/Footer';
import ClientProviders from '@/components/Providers';
import Navigation from '@/components/Navigation';
import Fathom from '@/components/Fathom';

import { NtDapperFont } from '@/fonts';

import '@/styles/globals.css';

// @todo add more metadata here
export const metadata = {
  title: 'React Flow Pro (beta)',
  description:
    'Build Better Node-Based UIs with React Flow. By subscribing to React Flow Pro you are securing the maintanance and development of our open source libraries.',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={NtDapperFont.className}>
      <body className="bg-white">
        <ClientProviders>
          <div className="bg-white">
            <Navigation />
            <div className="p-4 relative min-h-[calc(100vh-200px)] overflow-hidden">{children}</div>
            <Footer />
          </div>
        </ClientProviders>
        <Fathom />
      </body>
    </html>
  );
}
