'use client';

import Link from 'next/link';
import { Framework } from '@/types';
import DashboardHeader from '@/components/DashboardHeader';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectSeparator, Button } from '@xyflow/xy-ui';

import DownloadButton from './download-button';
import OverviewButton from './overview-button';
import Tabs from './tabs';

// @todo how to turn this into a server component?
function ProExampleViewer({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  return (
    <div>
      <OverviewButton />
      <DashboardHeader
        title={
          <>
            <div>Auto Layout</div>
            <div className="ml-auto flex gap-x-2">
              <Select>
                <SelectTrigger className="w-[80px] h-[36px] sm:w-auto">
                  <div className="font-bold overflow-hidden text-left text-ellipsis">
                    <div className="font-normal text-xs text-gray-700">Variant:</div>
                    <div className="text-xs">d3-hierarchy</div>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <Link href="/">
                      <SelectLabel className="hover:bg-slate-100">dagre.js</SelectLabel>
                    </Link>
                    <SelectSeparator />
                    <Link href="/account">
                      <SelectLabel className="hover:bg-slate-100">d3-hierarchy</SelectLabel>
                    </Link>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DownloadButton />
            </div>
          </>
        }
        description="This example shows how you can automatically arrange nodes after adding items from a sidebar. This a common UI pattern for workflow editors and lets you create a flow quickly. The layout is calculated every time a node is added with the help of the d3-hierarchy library. "
        descriptionClassName="max-w-4xl"
        className="my-4"
      />
      <Tabs exampleId={exampleId} frameworkId={frameworkId} />
    </div>
  );
}

export default ProExampleViewer;
