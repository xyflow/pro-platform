import { Button } from '@xyflow/xy-ui';

import { Framework } from '@/types';

function ProExamplePreview({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  const iframeLink = `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${exampleId}`;

  return (
    <>
      <div className="mt-4 mb-2relative min-h-[400px] h-[75vh] max-h-[650px] rounded-sm overflow-hidden border border-gray-200">
        <iframe className="w-full h-full" src={iframeLink} />
      </div>
      <a target="_blank" href={iframeLink}>
        <Button variant="link">Open example in a new tab</Button>
      </a>
    </>
  );
}

export default ProExamplePreview;
