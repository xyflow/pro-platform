import ExampleTeaser from '.';
import { getNhostClient } from '@/utils';
import { type ProExampleConfig } from '@/types';

export default async function ExampleGrid() {
  const nhostClient = getNhostClient();
  const { res } = await nhostClient.functions.call<ProExampleConfig[]>('/pro-examples/list');
  const examples = res?.data ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {examples
        .filter((example) => !example.hidden)
        .map((example) => (
          <ExampleTeaser key={example.id} example={example} />
        ))}
    </div>
  );
}
