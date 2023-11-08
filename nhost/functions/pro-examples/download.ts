import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getProExampleContent } from '../_utils/github';

// @todo check if user is subscribed
async function downloadProExample(req: Request, res: Response, { userId }: { userId: string }) {
  const { id, framework } = req.body;

  if (!id || !framework) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const content = await getProExampleContent(id);

  console.log(content);

  return res.status(200).json(content);
}

export default authPost(downloadProExample);
