import { Framework } from '@/types';

function ProExamplePreview({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  return (
    <div className="my-4 relative min-h-[400px] h-[60vh] max-h-[550px] rounded-sm overflow-hidden border border-gray-200">
      <iframe className="w-full h-full" src={`https://pro-example-apps.vercel.app/${exampleId}`} />
    </div>
  );
}

export default ProExamplePreview;
