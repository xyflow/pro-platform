import fetch from 'node-fetch';
import NodeCache from 'node-cache';

type GithubFile = { name: string; content: string; path: string };
type GetRepoContentOptions = { basePath?: string; result?: GithubFile[]; recursive?: boolean; repo?: string };
type GetRepoContentReturn = Promise<GithubFile[]>;

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export async function getRepoContent(
  path: string,
  { basePath = '', result = [], recursive = true, repo = 'xyflow/pro-example-apps' }: GetRepoContentOptions = {}
): GetRepoContentReturn {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  const files: any = await response.json();

  for (const file of files) {
    const { name } = file;
    const relativePath = `${basePath}/${name}`;

    if (file.type === 'dir') {
      if (recursive) {
        await getRepoContent(file.path, { basePath: relativePath, result });
      } else {
        result.push({ name, content: '', path: relativePath });
      }
    } else {
      const content = await fetch(file.download_url).then((res: any) => res.text());
      result.push({ name, content, path: relativePath });
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
