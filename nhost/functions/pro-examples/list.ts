import { Request, Response } from 'express';
import { getRepoContent } from '../_utils/github';

async function listProExamples(req: Request, res: Response) {
  const exampleFolders = await getRepoContent('examples', { recursive: false });
  console.log(exampleFolders);
  return res.status(200).send(exampleFolders.map((file) => ({ id: file.name, name: file.name, framework: 'react' })));
}

export default listProExamples;
