import DashboardHeader from '@/components/DashboardHeader';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import ExampleGrid from '@/components/ExampleTeaser/grid';

export default function ProExamplesOverview() {
  return (
    <>
      <DashboardHeader
        title="Pro Examples"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <NotSubscribedNotification />
      <ExampleGrid />
    </>
  );
}

// @todo this needs to be configured correctly to fetch the pro examples from the server
export const fetchCache = 'only-no-store';
