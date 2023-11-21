import { ResendVerificationLink, AuthFormWrapper } from '@/components/AuthForms';

const authFormLinks = [
  { href: '/signin', label: 'Login' },
  { href: '/signup', label: 'Signup' },
];

const ResendVerificationLinkPage = () => {
  return (
    <AuthFormWrapper
      title="Resend Verification Link"
      description="Enter your email to send a new verification link."
      links={authFormLinks}
      showOAuth={false}
      showHero={false}
    >
      <ResendVerificationLink />
    </AuthFormWrapper>
  );
};

export default ResendVerificationLinkPage;
