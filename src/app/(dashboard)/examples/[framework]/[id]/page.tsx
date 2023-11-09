import ProExampleViewer from '@/components/ProExampleViewer/next';
import { Framework } from '@/types';
import { getExampleList } from '@/utils';

export default function ProExamplePage({ params }: { params: { id: string; framework: Framework } }) {
  return <ProExampleViewer exampleId={params.id} frameworkId={params.framework} />;
}

export async function generateStaticParams() {
  const examples = await getExampleList();
  return examples.map((example) => ({ id: example.id, framework: example.framework }));
}

export const dynamicParams = false;
