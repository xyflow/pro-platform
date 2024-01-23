import DashboardHeader from '@/components/DashboardHeader';
import ExamplesGrid from '@/components/ExamplesGrid';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import { getExampleList } from '@/utils';

export default async function ProExamplesOverview() {
  const examples = await getExampleList();

  return (
    <>
      <DashboardHeader
        title="Pro Examples"
        description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
      />
      <NotSubscribedNotification description="Please subscribe to unlock all pro examples" />
      <ExamplesGrid examples={examples} />
    </>
  );
}
