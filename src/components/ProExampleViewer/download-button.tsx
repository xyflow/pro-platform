'use client';
import { Button } from '@xyflow/xy-ui';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';

export default function DownloadButton({ fileName, files }: { fileName: string; files: null | SandpackFiles }) {
  const downloadZip = async () => {
    const zip = new JSZip();

    Object.entries(files).map(([fileName, fileContent]) => {
      console.log(fileName);
      const content = typeof fileContent === 'string' ? fileContent : fileContent.code;
      zip.file(fileName, content);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${fileName}.zip`);
  };

  return (
    <Button disabled={!files} onClick={downloadZip} loading={!files} variant="default">
      <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
      Download ZIP
    </Button>
  );
}
