import { Framework } from '@/types';

function ProExamplePreview({ src }: { src: string }) {
  return (
    <div className="my-4 relative min-h-[400px] h-[75vh] max-h-[650px] rounded-sm overflow-hidden border border-gray-200">
      <iframe className="w-full h-full" src={src} />
    </div>
  );
}

export default ProExamplePreview;
