import { Request, Response } from 'express';
import { getProExampleList } from '../_utils/github';

async function listProExamples(req: Request, res: Response) {
  const list = await getProExampleList();

  return res.status(200).json(list.map((config) => ({ ...config, framework: 'react' })));
}

export default listProExamples;
