import { Button, Tabs, TabsContent, TabsList, TabsTrigger, cn } from '@xyflow/xy-ui';
import { Framework } from '@/types';

import PreviewTab from './preview';
import EditorTab from './editor';

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
}: {
  exampleId: string;
  frameworkId: Framework;
}) {
  return (
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

      <PreviewTab exampleId={exampleId} frameworkId={frameworkId} />
      <EditorTab exampleId={exampleId} frameworkId={frameworkId} />

      <TabsContent value="guide">this is the guide</TabsContent>

      <TabsContent value="installation">this is the installation guide</TabsContent>

      <TabsContent value="license">this is the license</TabsContent>
    </Tabs>
  );
}
