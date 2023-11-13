'use client';
import { useState } from 'react';

import { Button } from '@xyflow/xy-ui';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';

export default function DownloadButton({ fileName, files }: { fileName: string; files: null | SandpackFiles }) {
  const [isLoading, setLoading] = useState(false);

  if (!files) {
    return null;
  }

  const downloadZip = async () => {
    setLoading(true);
    const zip = new JSZip();

    Object.entries(files).map(([fileName, fileContent]) => {
      console.log(fileName);
      const content = typeof fileContent === 'string' ? fileContent : fileContent.code;
      zip.file(fileName, content);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${fileName}.zip`);
    setLoading(false);
  };

  return (
    <Button onClick={downloadZip} loading={isLoading} variant="default">
      <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
      Download ZIP
    </Button>
  );
}
