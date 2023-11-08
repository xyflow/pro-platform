import { Framework } from '@/types';

function ProExamplePreview({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  return (
    <iframe className="w-full h-full" src={`https://xyflow-${frameworkId}-pro-examples.vercel.app/${exampleId}`} />
  );
}

export default ProExamplePreview;
