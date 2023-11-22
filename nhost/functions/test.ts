import { Request, Response } from 'express';
import { redirectUrl } from './_utils/graphql/users';

const test = (req: Request, res: Response) => {
  res.status(200).send(`Hello ${process.env.NHOST_SUBDOMAIN}! The base url is: ${redirectUrl}`);
};

export default test;
