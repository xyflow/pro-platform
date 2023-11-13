import Link from 'next/link';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel } from '@xyflow/xy-ui';
import { ProExampleVariant } from '@/types';

function VariantSelect({ variants, exampleId }: { exampleId: string; variants?: ProExampleVariant[] }) {
  if (!variants) {
    return null;
  }

  return (
    <Select value={exampleId}>
      <SelectTrigger className="w-[80px] h-[36px] sm:w-auto">
        <div className="font-bold overflow-hidden text-left text-ellipsis">
          <div className="font-normal text-xs text-gray-700">Variant:</div>
          <div className="text-xs">d3-hierarchy</div>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {variants.map((variant) => (
            <Link href={`/examples/react/${variant.id}`} key={variant.id}>
              <SelectLabel className="hover:bg-slate-100">{variant.label}</SelectLabel>
            </Link>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default VariantSelect;
