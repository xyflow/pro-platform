import { Framework } from '@/types';

function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

export function generateStaticParams() {
  return Object.values(Framework).map((framework) => ({ framework }));
}

export const dynamicParams = false;

export default Layout;
