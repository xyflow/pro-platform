import { SignInMagicLink, AuthFormWrapper } from '@/components/AuthForms';

const ResendVerificationLinkPage = () => {
  return (
    <AuthFormWrapper
      title="Resend Verification Link"
      description="Enter your email to send a new verification link."
      showOAuth={false}
      showHero={false}
    >
      <SignInMagicLink />
    </AuthFormWrapper>
  );
};

export default ResendVerificationLinkPage;
