import { Request, Response } from 'express';

async function downloadProExample(req: Request, res: Response) {
  console.log(req.headers);

  return res.status(200).send([{ id: 'auto-layout', framework: 'react' }]);
}

export default downloadProExample;
