import useNhostFunction from './useNhostFunction';

function useStripeCustomerPortal(): { openCustomerPortal: () => void } {
  const callNhostFunction = useNhostFunction();

  const openCustomerPortal = async () => {
    const response = await callNhostFunction('/stripe/create-customer-portal', {});

    if (response.url) {
      window.location.href = response.res.data.url;
    }
  };

  return {
    openCustomerPortal,
  };
}

export default useStripeCustomerPortal;
