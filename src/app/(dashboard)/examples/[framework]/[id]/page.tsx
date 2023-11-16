import ProExampleViewer from '@/components/ProExampleViewer';
import { Framework } from '@/types';
import { getExampleList, getExampleConfig } from '@/utils';

export default async function ProExamplePage({ params }: { params: { id: string; framework: Framework } }) {
  const exampleConfig = await getExampleConfig(params);
  return <ProExampleViewer config={exampleConfig} exampleId={params.id} frameworkId={params.framework} />;
}

export async function generateStaticParams() {
  const examples = await getExampleList();
  return examples.map((example) => ({ id: example.id, framework: example.framework }));
}

export const dynamicParams = false;
// @todo this needs to be configured correctly to fetch the pro examples from the server
export const fetchCache = 'only-no-store';
