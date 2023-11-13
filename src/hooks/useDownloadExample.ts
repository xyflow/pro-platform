import { useCallback } from 'react';
import { GithubFile } from '@/types';

import useNhostFunction from './useNhostFunction';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';

export type UseDownloadProExampleOptions = {
  exampleId?: string;
  framework?: string;
  ignoreFiles?: string[];
};

function useDownloadExample({ exampleId, framework, ignoreFiles = [] }: UseDownloadProExampleOptions = {}) {
  const callNhostFunction = useNhostFunction();

  const fetchExample = useCallback(async (): Promise<SandpackFiles> => {
    const { res } = await callNhostFunction<GithubFile[]>('/pro-examples/download', {
      id: exampleId,
      framework,
    });

    const sandpackFiles = res?.data?.reduce((acc, file) => {
      if (ignoreFiles.includes(file.path)) {
        return acc;
      }

      return {
        ...acc,
        [file.path]: {
          code: file.content,
        },
      };
    }, {});

    return sandpackFiles;
  }, [exampleId, framework, callNhostFunction, ignoreFiles]);

  return fetchExample;
}

export default useDownloadExample;
