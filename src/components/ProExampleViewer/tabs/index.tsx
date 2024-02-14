'use client';

import { Button, Tabs, TabsContent, TabsList, TabsTrigger, cn } from '@xyflow/xy-ui';
import { Framework } from '@/types';

import PreviewTab from './preview';
import EditorTab from './editor';
import MarkdownTab from './markdown';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import { BookOpenIcon, CodeBracketIcon, ComputerDesktopIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Loader from '@/components/Loader';

const TabButton = (props) => {
  const isActive = props['data-state'] === 'active';
  const className = cn(
    'border-b-2 border-transparent rounded-none -mb-px',
    {
      'border-primary text-primary hover:text-primary': isActive,
    },
    props.className
  );

  return (
    <Button variant="ghost" {...props} className={className}>
      <div className="mr-2">{props.disabled ? <LockClosedIcon className="w-4 h-4 stroke-2" /> : props.icon}</div>
      {props.children}
    </Button>
  );
};

const TabContent = (props: { value: string; loading?: boolean; children: React.ReactNode }) => {
  const children = props.loading ? (
    <div className="flex items-center justify-center h-[300px]">
      <Loader />
    </div>
  ) : (
    props.children
  );

  return <TabsContent value={props.value}>{children}</TabsContent>;
};

export default function ProExampleViewerTabs({
  previewUrl,
  files,
  isUnlocked,
}: {
  previewUrl: string;
  files: null | SandpackFiles;
  isUnlocked: boolean;
}) {
  // @ts-ignore
  const readme = files?.['/README.mdx']?.code || files?.['/README.md']?.code;

  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList className="flex gap-x-0 mb-4 border-b border-gray-200">
          <TabsTrigger asChild value="preview">
            <TabButton icon={<ComputerDesktopIcon className="w-4 h-4 stroke-2" />}>Preview</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="editor" disabled={!isUnlocked}>
            <TabButton icon={<CodeBracketIcon className="w-4 h-4 stroke-2" />}>Code</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="readme" disabled={!isUnlocked}>
            <TabButton icon={<BookOpenIcon className="w-4 h-4 stroke-2" />}>Readme</TabButton>
          </TabsTrigger>
          {/* <TabsTrigger asChild value="installation">
            <TabButton>Installation</TabButton>
          </TabsTrigger>
          <TabsTrigger asChild value="license">
            <TabButton>License</TabButton>
          </TabsTrigger> */}
        </TabsList>

        {!isUnlocked && (
          <NotSubscribedNotification description="Please subscribe to download this and all other pro examples" />
        )}

        <TabContent value="preview">
          <PreviewTab src={previewUrl} />
        </TabContent>

        {isUnlocked && (
          <TabContent value="editor" loading={!files}>
            <EditorTab files={files} />
          </TabContent>
        )}

        {isUnlocked && (
          <TabContent value="readme" loading={!files}>
            <MarkdownTab markdown={readme} />
          </TabContent>
        )}

        {/* <TabsContent value="installation">
          <MarkdownTab markdown={`# installation`} />
        </TabsContent>

        <TabsContent value="license">
          <MarkdownTab markdown={`## Pro Example License`} />
        </TabsContent> */}
      </Tabs>
    </>
  );
}
