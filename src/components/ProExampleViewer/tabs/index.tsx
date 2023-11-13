'use client';

import { Button, Tabs, TabsContent, TabsList, TabsTrigger, cn } from '@xyflow/xy-ui';
import { Framework } from '@/types';

import PreviewTab from './preview';
import EditorTab from './editor';
import MarkdownTab from './markdown';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';

const TabButton = (props) => {
  const isActive = props['data-state'] === 'active';
  const className = cn(
    'border-b-2 border-transparent rounded-none -mb-px',
    {
      'border-primary text-primary hover:text-primary': isActive,
    },
    props.className
  );

  return <Button variant="ghost" {...props} className={className} />;
};

export default function ProExampleViewerTabs({
  exampleId,
  frameworkId,
  files,
}: {
  exampleId: string;
  frameworkId: Framework;
  files: null | SandpackFiles;
}) {
  // @ts-ignore
  const readme = files?.['/README.mdx']?.code;

  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList className="flex gap-x-0 mb-4 border-b border-gray-200">
          <TabsTrigger asChild value="preview">
            <TabButton>Preview</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="editor">
            <TabButton>Code</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="guide">
            <TabButton>Guide</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="installation">
            <TabButton>Installation</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="license">
            <TabButton>License</TabButton>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <PreviewTab exampleId={exampleId} frameworkId={frameworkId} />
        </TabsContent>

        <TabsContent value="editor">
          <EditorTab files={files} />
        </TabsContent>

        <TabsContent value="guide">
          <MarkdownTab markdown={readme} />
        </TabsContent>

        <TabsContent value="installation">
          <MarkdownTab markdown={`# installation`} />
        </TabsContent>

        <TabsContent value="license">
          <MarkdownTab markdown={`# license`} />
        </TabsContent>
      </Tabs>
    </>
  );
}
