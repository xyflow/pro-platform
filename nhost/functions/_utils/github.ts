import fetch from 'cross-fetch';
import redis from './redis';

type ProExampleConfig = { id: string; free?: boolean; name: string };
type GithubFile = { name: string; content: string; path: string };
type GetRepoContentOptions = { basePath?: string; result?: GithubFile[]; recursive?: boolean; repo?: string };
type GetRepoContentReturn = { files: GithubFile[]; config: ProExampleConfig };

export async function getRepoContent(
  path: string,
  { basePath = '', result = [], recursive = true, repo = 'xyflow/pro-example-apps' }: GetRepoContentOptions = {}
): Promise<GetRepoContentReturn['files']> {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  const files: any = await response.json();
  const iterableFiles = Array.isArray(files) ? files : [files];

  for (const file of iterableFiles) {
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

export async function getProExampleContent(exampleId: string): Promise<GetRepoContentReturn> {
  const data = await redis.json.get(exampleId, '$');

  if (data && data[0]) {
    return data[0];
  }

  const configArr = await getRepoContent(`examples/${exampleId}/config.json`, { recursive: false });
  const config = JSON.parse(configArr[0].content);
  const files = await getRepoContent(`examples/${exampleId}/app`);

  await redis.json.set(exampleId, '$', { files, config });

  return { config, files };
}
