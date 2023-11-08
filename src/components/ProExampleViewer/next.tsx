'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Framework } from '@/types';
import useNhostFunction from '@/hooks/useNhostFunction';
import DashboardHeader from '@/components/DashboardHeader';
import {
  Button,
  Select,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@xyflow/xy-ui';
import {
  ArrowDownOnSquareIcon,
  ArrowTopRightOnSquareIcon,
  Squares2X2Icon,
  MapIcon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline';
import { GithubFile } from '@/types';
import OverviewButton from './overview-button';
import Editor from './editor';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';

function ProExampleViewer({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  const [data, setData] = useState<SandpackFiles>(null);
  const callNhostFunction = useNhostFunction();

  useEffect(() => {
    const fetchExample = async () => {
      const { res } = await callNhostFunction<GithubFile[]>('/pro-examples/download', {
        id: exampleId,
        framework: frameworkId,
      });

      const sandpackFiles = res?.data?.reduce((acc, file) => {
        if (file.path.includes('package-lock.json')) {
          return acc;
        }

        return {
          ...acc,
          [file.path]: {
            code: file.content,
          },
        };
      }, {});

      setData(sandpackFiles);
    };

    fetchExample();
  }, []);

  // if (!data) {
  //   return null;
  // }

  console.log(data);

  return (
    <div>
      <OverviewButton />
      <DashboardHeader
        title="Auto Layout"
        description="This example shows how you can automatically arrange nodes after adding items from a sidebar. This a common UI pattern for workflow editors and lets you create a flow quickly. The layout is calculated every time a node is added with the help of the d3-hierarchy library. "
        descriptionClassName="max-w-4xl"
        className="mt-4"
      />
      <Tabs defaultValue="editor">
        <TabsList className="flex gap-x-2 mb-4">
          <TabsTrigger asChild value="editor">
            <Button variant="outline">
              <CodeBracketSquareIcon className="w-5 h-5" />
              Editor
            </Button>
          </TabsTrigger>
          <TabsTrigger asChild value="guide">
            <Button variant="outline">
              <MapIcon className="w-5 h-5" />
              Guide
            </Button>
          </TabsTrigger>
          <Button variant="outline">
            <ArrowDownOnSquareIcon className="w-5 h-5" />
            Download
          </Button>
          <Button variant="outline">
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            Fullscreen
          </Button>
          <Select>
            <SelectTrigger className="w-[80px] sm:w-[180px]">
              <div className="font-bold overflow-hidden text-ellipsis">Variants:</div>
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
        </TabsList>
        <TabsContent value="editor">
          <Editor files={data} />
        </TabsContent>
        <TabsContent value="guide">this is the guide</TabsContent>
      </Tabs>
    </div>
  );
}

export default ProExampleViewer;
