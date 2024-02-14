import { ProExampleConfig, type Framework } from '@/types';

import ExampleTeaser from './teaser';

export default function ExampleGrid({ examples = [] }: { examples: ProExampleConfig[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {examples.map((example) => (
        <ExampleTeaser key={example.id} example={example} />
      ))}
    </div>
  );
}
