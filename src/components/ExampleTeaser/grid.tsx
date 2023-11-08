import ExampleTeaser from '.';
import { getNhostClient } from '@/utils';
import { type ProExampleConfig, type Framework } from '@/types';

export default async function ExampleGrid({ framework }: { framework?: Framework }) {
  const nhostClient = getNhostClient();
  const { res } = await nhostClient.functions.call<ProExampleConfig[]>('/pro-examples/list');
  const examples = res?.data ?? [];
  const visibleExamples = examples.filter((example) =>
    framework ? example.framework === framework && !example.hidden : !example.hidden
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {visibleExamples.map((example) => (
        <ExampleTeaser key={example.id} example={example} />
      ))}
    </div>
  );
}
