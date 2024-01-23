import Link from 'next/link';
import Image from 'next/image';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { Card, CardTitle, CardHeader, CardDescription, cn } from '@xyflow/xy-ui';
import { type ProExampleConfig } from '@/types';
import Pill from '@/components/Pill';

export type ExampleTeaserProps = {
  example: ProExampleConfig;
};

export default function ExampleTeaser({ example }: ExampleTeaserProps) {
  return (
    <Card className="flex flex-col">
      <div className="relative h-[200px]">
        <Image
          alt="Example Teaser"
          fill
          src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${example.id}/thumbnail.jpg`}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="flex-1">
        <CardTitle className="flex items-center gap-x-1.5">
          {example.name ?? example.id} {example.free && <Pill>free</Pill>}
        </CardTitle>
        {example.description && <CardDescription>{example.description}</CardDescription>}
        <Link
          className={cn('!mt-auto text-react font-bold items-center hover:text-slate-800 flex pt-4 w-full')}
          href={`/examples/${example.framework}/${example.id}`}
        >
          View Example
          <ArrowLongRightIcon className="ml-1 h-6 w-6" />
        </Link>
      </CardHeader>
    </Card>
  );
}
