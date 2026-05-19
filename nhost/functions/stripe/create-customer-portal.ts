import { Request, Response } from 'express';
import stripe from '../_utils/stripe';
import { authPost } from '../_utils/middleware';
import { getOrCreateCustomer } from '../_utils/graphql/subscriptions';

async function createStripeCustomerPortal(req: Request, res: Response) {
  const userId = res.locals.userId;
  const stripeCustomerId = await getOrCreateCustomer(userId);

  const { returnUrl = req.headers.origin ? `https://${req.headers.origin}` : 'https://pro.reactflow.dev/account' } =
    req.body;

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });

  return res.json(session);
}

export default authPost(createStripeCustomerPortal);
