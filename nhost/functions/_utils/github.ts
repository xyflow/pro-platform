import fetch from 'node-fetch';
import NodeCache from 'node-cache';

type GithubFile = { name: string; content: string; path: string };
type GetRepoContentReturn = Promise<GithubFile[]>;

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export async function getRepoContent(
  path: string,
  basePath: string = '',
  result: GithubFile[] = []
): GetRepoContentReturn {
  const response = await fetch(`https://api.github.com/repos/xyflow/pro-example-apps/contents/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  const files: any = await response.json();

  for (const file of files) {
    const { name } = file;

    if (file.type === 'dir') {
      await getRepoContent(file.path, `${basePath}/${name}`, result);
    } else {
      const content = await fetch(file.download_url).then((res: any) => res.text());
      result.push({ name, content, path: `${basePath}/${name}` });
    }
  }

  return result;
}

export async function getProExampleContent(exampleId: string): GetRepoContentReturn {
  if (cache.has(exampleId)) {
    return cache.get(exampleId) as GithubFile[];
  }

  const content = await getRepoContent(`examples/${exampleId}`);

  // @todo cache example here

  return content;
}
