import Link from 'next/link';
import { Subscribed, NotSubscribed, PlanLabel } from '@/components/SubscriptionStatus';
import Pill from '@/components/Pill';

export default function SubscriptionPlan() {
  return (
    <>
      <Subscribed>
        <span>
          <Pill className="inline text-react bg-pink-50 border-react">
            <PlanLabel /> plan
          </Pill>
        </span>
      </Subscribed>
      <NotSubscribed>
        <Link href="/subscribe">
          <Pill className="inline">free plan</Pill>
        </Link>
      </NotSubscribed>
    </>
  );
}
