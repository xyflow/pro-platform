import { aquaBlue } from '@codesandbox/sandpack-themes';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackFileExplorer,
  type SandpackFiles,
  SandpackLayout,
} from '@codesandbox/sandpack-react';

function ProExampleCodeEditor({ files }: { files: SandpackFiles }) {
  return (
    <SandpackProvider files={files} template="vite-svelte-ts" theme={aquaBlue} className="h-[100vh] relative">
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor showLineNumbers showTabs={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default ProExampleCodeEditor;
