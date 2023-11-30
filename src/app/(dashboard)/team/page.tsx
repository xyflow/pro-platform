import DashboardHeader from '@/components/DashboardHeader';
import ManageTeamCard from './_cards/manage-team';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import { Subscribed } from '@/components/SubscriptionStatus';

export default function TeamPage() {
  return (
    <div className="max-w-3xl">
      <DashboardHeader title="Team" description="Invite your team members to grant them access to the Pro examples." />
      <div className="flex-1 space-y-4">
        <NotSubscribedNotification />
        <Subscribed requireAdminSubscription>
          <ManageTeamCard />
        </Subscribed>
      </div>
    </div>
  );
}
