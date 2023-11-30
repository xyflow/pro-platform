import { notFound } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import ExampleGrid from '@/components/ExampleTeaser/grid';
import { Framework } from '@/types';

export default async function ProExamplesOverview({ params }: { params: { framework: Framework } }) {
  if (!Object.values(Framework).includes(params.framework)) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto mb-20">
      <DashboardHeader
        title={
          <>
            <span className="capitalize">{params.framework} </span>Pro Examples
          </>
        }
        description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
      />
      <NotSubscribedNotification />
      <ExampleGrid framework={params.framework} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.values(Framework).map((framework) => ({ framework }));
}
