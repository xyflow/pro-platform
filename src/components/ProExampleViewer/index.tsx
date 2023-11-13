'use client';

import { useState, useEffect } from 'react';
import { type SandpackFiles } from '@codesandbox/sandpack-react';

import { Framework, ProExampleConfig } from '@/types';
import DashboardHeader from '@/components/DashboardHeader';
import useDownloadExample from '@/hooks/useDownloadExample';

import DownloadButton from './download-button';
import OverviewButton from './overview-button';
import Tabs from './tabs';
import VariantSelect from './variant-select';

function ProExampleViewer({
  exampleId,
  frameworkId,
  config,
}: {
  exampleId: string;
  frameworkId: Framework;
  config: ProExampleConfig;
}) {
  const [files, setFiles] = useState<SandpackFiles>(null);
  const downloadExample = useDownloadExample({ exampleId, framework: frameworkId });

  useEffect(() => {
    const loadFiles = async () => {
      const sandpackFiles = await downloadExample();
      setFiles(sandpackFiles);
    };

    loadFiles();
  }, []);

  return (
    <div>
      <OverviewButton />
      <DashboardHeader
        title={
          <>
            <div>{config.name}</div>
            <div className="ml-auto flex gap-x-2">
              <VariantSelect exampleId={exampleId} variants={config.variants} />
              <DownloadButton files={files} fileName={`${exampleId}-pro-example`} />
            </div>
          </>
        }
        description={config.description}
        descriptionClassName="max-w-4xl"
        className="my-4"
      />
      <Tabs files={files} exampleId={exampleId} frameworkId={frameworkId} />
    </div>
  );
}

export default ProExampleViewer;
