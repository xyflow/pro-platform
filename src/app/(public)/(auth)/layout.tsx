import AuthRedirect from './auth-redirect';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthRedirect>{children}</AuthRedirect>;
}
