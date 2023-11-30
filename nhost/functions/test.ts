import { Request, Response } from 'express';
import { redirectUrl } from './_utils/graphql/users';
import { stdTTL, cache } from './_utils/github';

const test = (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      `Hello ${
        process.env.NHOST_SUBDOMAIN
      }! The base url is: ${redirectUrl} and the stdTTL is: ${stdTTL}, cache items: ${JSON.stringify(cache.getStats())}`
    );
};

export default test;
