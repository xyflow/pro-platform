import { Request, Response } from 'express';
import { clearCache } from '../_utils/github';

export default function clearProExampleCache(req: Request, res: Response) {
  clearCache();
  return res.status(200).json({ status: 'ok' });
}
