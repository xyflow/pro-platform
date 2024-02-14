import type { Request, Response } from 'express';
import type { ProExampleConfig } from '../_utils/types';

import { post } from '../_utils/middleware';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { redis } from '../_utils/redis';
import { existsSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

type GetProExampleConfigOptions = {
  id: string;
};

async function getProExampleConfig(req: Request, res: Response) {
  const { id } = req.body as GetProExampleConfigOptions;

  if (!id) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  if (process.env.NODE_ENV === 'development' && hasLocalProExample(id)) {
    return getLocalProExampleConfig(id, res);
  } else {
    return getRedisProExampleConfig(id, res);
  }
}

export default post(getProExampleConfig);

async function getRedisProExampleConfig(id: string, res: Response) {
  const config = await redis.json.get(id, '$.config');
  const thumbnail = `${process.env.PUBLIC_PRO_EXAMPLES_URL}/${id}/thumbnail.jpg`;
  const preview = `${process.env.PUBLIC_PRO_EXAMPLES_URL}/${id}`;

  if (!config) {
    return res.status(500).send({ message: 'Example does not exist.' });
  }

  return res.status(200).json({ ...config, thumbnail, preview });
}

function hasLocalProExample(id: string) {
  return existsSync(join(__dirname, './_examples', id));
}

async function getLocalProExampleConfig(id: string, res: Response) {
  try {
    const example = join(__dirname, './_examples', id);
    const config = JSON.parse(await readFile(join(example, 'config.json'), 'utf-8')) as ProExampleConfig;
    // The LOCAL_PRO_EXAMPLES_URL can optionally be set to serve the live demos
    // from a local server (duh) but it doesn't have to be set.
    //
    // We fall back to the live demo URL if it's not set, which was the old behaviour
    // before any sort of local development was possible.
    const preview = `${process.env.LOCAL_PRO_EXAMPLES_URL ?? process.env.PUBLIC_PRO_EXAMPLES_URL}/${id}`;

    return res.status(200).json({ ...config, preview });
  } catch {
    return res.status(500).send({ message: 'Example does not exist.' });
  }
}
