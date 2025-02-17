import { notFound } from 'next/navigation';
import ProExampleViewer from '@/components/ProExampleViewer';
import { getExampleConfig } from '@/utils';
import { Framework } from '@/types';

export default async function ProTemplatePage({ params }: { params: { id: string } }) {
  let exampleConfig = null;

  try {
    exampleConfig = await getExampleConfig(params);
  } catch (err) {
    console.log(err);
  }

  if (!exampleConfig) {
    notFound();
  }

  return <ProExampleViewer config={exampleConfig} exampleId={params.id} frameworkId={Framework.REACT} />;
}

export async function generateStaticParams() {
  return [];
  // const examples = await getExampleList();
  // return examples.map((example) => ({ id: example.id, framework: example.framework }));
}

// https://github.com/leerob/on-demand-isr/blob/main/app/%5Bid%5D/page.tsx
export const dynamic = 'force-static';
export const dynamicParams = true;
