import { notFound } from 'next/navigation';
import ProExampleViewer from '@/components/ProExampleViewer';
import { Framework } from '@/types';
import { getExampleList, getExampleConfig } from '@/utils';

export default async function ProExamplePage({ params }: { params: { id: string; framework: Framework } }) {
  let exampleConfig = null;

  try {
    exampleConfig = await getExampleConfig(params);
  } catch (err) {
    console.log(err);
  }

  if (!exampleConfig || !Object.values(Framework).includes(params.framework)) {
    notFound();
  }

  return <ProExampleViewer config={exampleConfig} exampleId={params.id} frameworkId={params.framework} />;
}

export async function generateStaticParams() {
  const examples = await getExampleList();
  return examples.map((example) => ({ id: example.id, framework: example.framework }));
}

export const dynamic = 'force-static';
export const dynamicParams = true;
