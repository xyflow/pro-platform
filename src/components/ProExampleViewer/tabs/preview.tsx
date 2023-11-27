import { Framework } from '@/types';

function ProExamplePreview({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  return (
    <div className="my-4 relative min-h-[400px] h-[75vh] max-h-[650px] rounded-sm overflow-hidden border border-gray-200">
      <iframe className="w-full h-full" src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${exampleId}`} />
    </div>
  );
}

export default ProExamplePreview;
