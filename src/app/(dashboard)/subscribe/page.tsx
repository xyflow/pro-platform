import { FAQ, reactFlowProFaqItems } from '@xyflow/xy-ui';
import DashboardHeader from '@/components/DashboardHeader';
import PricingTable from '@/components/PricingTable';

export default function SubscribePage() {
  return (
    <>
      <DashboardHeader
        title="Subscribe"
        description="With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />

      <PricingTable />
      <FAQ className="mt-20" items={reactFlowProFaqItems} />
    </>
  );
}
