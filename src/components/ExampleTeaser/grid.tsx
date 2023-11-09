import ExampleTeaser from '.';
import { getExampleList } from '@/utils';
import { type Framework } from '@/types';

export default async function ExampleGrid({ framework }: { framework?: Framework }) {
  const examples = await getExampleList({ framework });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {examples.map((example) => (
        <ExampleTeaser key={example.id} example={example} />
      ))}
    </div>
  );
}
