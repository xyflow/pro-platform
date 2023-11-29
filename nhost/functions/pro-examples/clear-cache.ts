import { Request, Response } from 'express';
import crypto from 'crypto';

import { clearCache } from '../_utils/github';

type NhostRequest = Request & {
  rawBody: string;
};

// this webhook is called once the pro examples repo is updated
// it's used to clear the cache so that users download the latest version of the examples
export default async function proExamplesVercelWebhook(req: NhostRequest, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  // const bodySignature = sha1(req.rawBody, process.env.VERCEL_WEBHOOK_SECRET as string);

  // if (bodySignature !== req.headers['x-vercel-signature']) {
  //   return res.status(403).json({
  //     code: 'invalid_signature',
  //     error: "signature didn't match",
  //   });
  // }

  clearCache();
  return res.status(200).json({ status: 'ok' });
}

function sha1(data: string, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}
