import DashboardHeader from '@/components/DashboardHeader';
import ManageTeamCard from './_cards/manage-team';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';

export default function TeamPage() {
  return (
    <div className="max-w-4xl">
      <DashboardHeader title="Manage Team" />
      <div className="flex-1 space-y-4">
        <NotSubscribedNotification />
        <ManageTeamCard />
      </div>
    </div>
  );
}
