import { getHostName } from '@/utils';
import useNhostFunction from './useNhostFunction';

function useStripeCustomerPortal(): { openCustomerPortal: () => void } {
  const callNhostFunction = useNhostFunction();

  const openCustomerPortal = async () => {
    const hostName = getHostName();
    const response = await callNhostFunction('/stripe/create-customer-portal', { returnUrl: `${hostName}/account` });

    if (!response.error && response.url) {
      window.location.href = response.url;
    }
  };

  return {
    openCustomerPortal,
  };
}

export default useStripeCustomerPortal;
