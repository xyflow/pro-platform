import { Request, Response } from 'express';
import { getPrices } from '../_utils/stripe';
import Stripe from 'stripe';

export default async function getPricingInfo(req: Request, res: Response) {
  const prices = await getPrices();

  const response = prices.reduce((res, curr) => {
    if (typeof curr.lookup_key === 'string' && curr.currency_options) {
      // @ts-expect-error
      res[curr.lookup_key] = curr.currency_options;
    }
    return res;
  }, {} as Record<string, Stripe.Price.CurrencyOptions>);

  return res.status(200).send(response);
}
