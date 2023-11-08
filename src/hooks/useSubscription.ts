import { useContext, useEffect, useState } from 'react';

import { SubscriptionContext } from 'components/Providers/SubscriptionProvider';
import { SubscriptionPlan } from '@/types';

export type SubscriptionStatus = {
  isSubscribed: boolean;
  isTeamSubscribed: boolean;
  isUserSubscribed: boolean;
  plan: SubscriptionPlan;
  userPlan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
  isLoading: boolean;
};

export default function useSubscription(): SubscriptionStatus {
  const [isLoading, setIsLoading] = useState(true);
  const subscription = useContext(SubscriptionContext);

  useEffect(() => {
    if (!subscription.isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [subscription.isLoading]);

  return {
    isSubscribed: subscription.plan !== SubscriptionPlan.FREE || subscription.teamPlan !== SubscriptionPlan.FREE,
    isTeamSubscribed: subscription.teamPlan !== SubscriptionPlan.FREE,
    isUserSubscribed: subscription.plan !== SubscriptionPlan.FREE,
    plan: subscription.plan !== SubscriptionPlan.FREE ? subscription.plan : subscription.teamPlan,
    userPlan: subscription.plan,
    teamPlan: subscription.teamPlan,
    isLoading: isLoading,
  };
}
