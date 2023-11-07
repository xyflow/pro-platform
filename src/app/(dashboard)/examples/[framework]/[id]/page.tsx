import SubscriptionCheck from './subscription-check';
import SubscribedExampleViewer from './subscribed';
import UnSubscribedExampleViewer from './unsubscribed';
import { Framework } from '@/types';

export default function ProExamplePage({ params }: { params: { id: string; framework: Framework } }) {
  // the only way to render a server component (UnSubscribedExampleViewer, SubscribedExampleViewer) within a client component (SubscriptionCheck) is to pass it as a prop or children
  return (
    <SubscriptionCheck fallback={<UnSubscribedExampleViewer frameworkId={params.framework} exampleId={params.id} />}>
      <SubscribedExampleViewer frameworkId={params.framework} exampleId={params.id} />
    </SubscriptionCheck>
  );
}

// @todo fetch this from the backend
export function generateStaticParams() {
  return [{ id: 'auto-layout', framework: Framework.REACT }];
}

export const dynamicParams = false;
