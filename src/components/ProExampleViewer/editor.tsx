import { aquaBlue } from '@codesandbox/sandpack-themes';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  type SandpackFiles,
  SandpackLayout,
} from '@codesandbox/sandpack-react';

const customSetup = {
  dependencies: {
    'd3-drag': '3.0.0',
    'd3-dispatch': '3.0.0',
    // reactflow: '11.9.4',
  },
};

function ProExampleCodeEditor({ files }: { files: SandpackFiles }) {
  return (
    <SandpackProvider
      // options={{ bundlerURL: 'https://sandpack-bundler.pages.dev' }}
      customSetup={customSetup}
      // files={files}
      template="vite-svelte-ts"
      theme={aquaBlue}
      className="h-[100vh] relative"
    >
      <SandpackLayout>
        <SandpackPreview className="!flex-[1_1_100%]" />
        <SandpackFileExplorer />
        <SandpackCodeEditor showLineNumbers showTabs={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default ProExampleCodeEditor;
