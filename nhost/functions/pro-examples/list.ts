import { Request, Response } from 'express';

function listProExamples(req: Request, res: Response) {
  return res.status(200).send([{ id: 'auto-layout', framework: 'react' }]);
}

export default listProExamples;
