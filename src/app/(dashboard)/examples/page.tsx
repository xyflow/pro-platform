import DashboardHeader from '@/components/DashboardHeader';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import ExampleGrid from '@/components/ExampleTeaser/grid';

export default function ProExamplesOverview() {
  return (
    <>
      <DashboardHeader
        title="Pro Examples"
        description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
      />
      <NotSubscribedNotification />
      <ExampleGrid />
    </>
  );
}
