import { Request, Response } from 'express';
import { getPrices } from '../_utils/stripe';

export default async function getPricingInfo(req: Request, res: Response) {
  const prices = await getPrices();

  return res.status(200).send(prices);
}
