import { Framework } from '@/types';
import { TabsContent } from '@xyflow/xy-ui';

function ProExamplePreview({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  return (
    <TabsContent value="preview">
      <div className="my-4 relative min-h-[400px] h-[60vh] max-h-[1200px] rounded-sm overflow-hidden border border-gray-200">
        <iframe className="w-full h-full" src={`https://xyflow-${frameworkId}-pro-examples.vercel.app/${exampleId}`} />
      </div>
    </TabsContent>
  );
}

export default ProExamplePreview;
