import fetch from 'cross-fetch';

type GithubFile = { name: string; content: string; path: string };
type GetRepoContentOptions = { basePath?: string; result?: GithubFile[]; recursive?: boolean; repo?: string };
type GetRepoContentReturn = { files: GithubFile[] };

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
  const files = await getRepoContent(`examples/${exampleId}`);
  return { files };
}

export async function getProExampleList(): Promise<string[]> {
  const files = await getRepoContent('examples', { recursive: false });
  return files.map((file) => file.name);
}
