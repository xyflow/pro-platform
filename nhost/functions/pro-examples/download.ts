import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getProExampleContent } from '../_utils/github';
import { getSubscription } from '../_utils/graphql/subscriptions';

// @todo check if user is subscribed
async function downloadProExample(req: Request, res: Response, { userId }: { userId: string }) {
  const { id, framework } = req.body;

  if (!id || !framework) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  const subscription = await getSubscription(userId);

  if (!subscription || subscription.subscription_plan_id === 'free') {
    return res.status(400).send({
      message: 'You are not subscribed. To download pro examples, you need to create a subscription first.',
    });
  }

  const content = await getProExampleContent(id);

  return res.status(200).json(content);
}

export default authPost(downloadProExample);
