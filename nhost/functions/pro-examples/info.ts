import { Request, Response } from 'express';
import { getProExampleConfig } from '../_utils/github';

async function getProExampleInfo(req: Request, res: Response) {
  const { id, framework } = req.body;

  if (!id || !framework) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const content = await getProExampleConfig(id);
  return res.status(200).json(content);
}

export default getProExampleInfo;
