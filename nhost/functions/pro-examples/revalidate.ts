import { Request, Response } from 'express';
import redis from '../_utils/redis';

type NhostRequest = Request & {
  rawBody: string;
};

// this webhook is called once the pro examples repo is updated
// it's used to clear the cache so that users download the latest version of the examples
export default async function revalidateProExamples(req: NhostRequest, res: Response) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  // const bodySignature = sha1(req.rawBody, process.env.VERCEL_WEBHOOK_SECRET as string);

  // if (bodySignature !== req.headers['x-vercel-signature']) {
  //   return res.status(403).json({
  //     code: 'invalid_signature',
  //     error: "signature didn't match",
  //   });
  // }

  const status = redis.flushall();

  return res.status(200).json({ status });
}
