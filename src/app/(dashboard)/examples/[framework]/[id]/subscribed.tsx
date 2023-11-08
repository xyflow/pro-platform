import { cookies } from 'next/headers';
import ProExampleViewer from '@/components/ProExampleViewer/next';
import { Framework } from '@/types';

export default async function SubscribedProExampleViewer({
  exampleId,
  frameworkId,
}: {
  exampleId: string;
  frameworkId: Framework;
}) {
  console.log(cookies());

  return <ProExampleViewer exampleId={exampleId} frameworkId={frameworkId} />;
}
