'use client';

import { useState, useEffect } from 'react';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import {
  Sandpack,
  SandpackProvider,
  SandpackCodeEditor,
  SandpackFileExplorer,
  type SandpackFiles,
  SandpackLayout,
  SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react';
import useNhostFunction from '@/hooks/useNhostFunction';
import { Framework, type GithubFile } from '@/types';
import { TabsContent } from '@xyflow/xy-ui';

function ProExampleCodeEditor({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  const [files, setFiles] = useState<SandpackFiles>(null);
  const callNhostFunction = useNhostFunction();
  const template = `vite-${frameworkId}-ts` as SandpackPredefinedTemplate;

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

      setFiles(sandpackFiles);
    };

    fetchExample();
  }, []);

  return (
    <TabsContent value="editor">
      <SandpackProvider files={files} template={template} theme={aquaBlue} className="h-[500px] relative">
        <div className="h-full flex w-full overflow-scroll">
          <SandpackFileExplorer className="!w-[300px]" />
          <SandpackCodeEditor
            className="!flex-shrink-0 !flex-grow-0 overflow-scroll"
            showLineNumbers
            showTabs={false}
          />
        </div>
      </SandpackProvider>
    </TabsContent>
  );
}

export default ProExampleCodeEditor;
