import Notification from '@/components/Notification';
import { NotSubscribed } from '@/components/SubscriptionStatus';

// @todo this should be imported from '.' but is causing a build error, not sure why
export type NotificationProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  button?: { label: string; href: string };
} & React.HTMLAttributes<HTMLDivElement>;

export default function NotSubscribedNotification(props: NotificationProps) {
  return (
    <NotSubscribed>
      <Notification
        title="You are currently not subscribed"
        description="Please subscribe to unlock all pro features"
        button={{ label: 'Subscribe', href: '/subscribe' }}
        {...props}
      />
    </NotSubscribed>
  );
}
