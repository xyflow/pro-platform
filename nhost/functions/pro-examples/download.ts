import { Request, Response } from 'express';
import { subscribedPost } from '../_utils/middleware';
import { getProExampleContent } from '../_utils/github';
import redis from '../_utils/redis';

async function downloadProExample(req: Request, res: Response) {
  const { id, framework } = req.body;

  if (!id || !framework) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const data = await redis.json.get(id, '$');

  if (data && data[0]) {
    return res.status(200).json({ timestamp: Date.now(), files: data[0] });
  }

  const { files } = await getProExampleContent(id);

  await redis.json.set(id, '$', files);

  return res.status(200).json({ timestamp: Date.now(), files });
}

export default subscribedPost(downloadProExample);
