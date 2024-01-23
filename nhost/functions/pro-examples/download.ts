import { Request, Response } from 'express';
import { getProExampleContent } from '../_utils/github';
import { isSubscribed } from '../_utils/graphql/subscriptions';
import { authPost } from '../_utils/middleware';

async function downloadProExample(req: Request, res: Response, { userId }: { userId: string }) {
  const { id, framework } = req.body;

  if (!id || !framework || !userId) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const { config, files } = await getProExampleContent(id);

  // either it's a free example or the user must be subscribed to access it
  const hasAccess = config.free || (await isSubscribed(userId));

  if (!hasAccess) {
    return res.status(403).send({ message: 'You must be subscribed to access this example.' });
  }

  return res.status(200).json({ timestamp: Date.now(), files });
}

export default authPost(downloadProExample);
