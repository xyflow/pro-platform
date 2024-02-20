import type { Request, Response } from 'express';
import type { ProExample } from '../_utils/types';

import { isSubscribed } from '../_utils/graphql/subscriptions';
import { authPost } from '../_utils/middleware';
import { redis } from '../_utils/redis';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { existsSync } from 'node:fs';
import { IS_DEVELOPMENT } from '../_utils/constants';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function downloadProExample(req: Request, res: Response, { userId }: { userId: string }) {
  const { id, framework } = req.body;

  if (!id || !framework || !userId) {
    return res.status(500).send({ message: 'Bad request.' });
  }

  if (IS_DEVELOPMENT && hasLocalProExample(id)) {
    return downloadLocalProExample(id, res);
  } else {
    return downloadRedisProExample(id, userId, res);
  }
}

export default authPost(downloadProExample);

async function downloadRedisProExample(id: string, userId: string, res: Response) {
  const data = await redis.json.get(id, '$');

  if (!data || !data[0]) {
    return res.status(500).send({ message: 'Example does not exist.' });
  }

  const { config, files } = data[0];

  // either it's a free example or the user must be subscribed to access it
  const hasAccess = config.free || (await isSubscribed(userId));

  if (!hasAccess) {
    return res.status(403).send({ message: 'You must be subscribed to access this example.' });
  }

  return res.status(200).json({ timestamp: Date.now(), files });
}

function hasLocalProExample(id: string) {
  return existsSync(join(__dirname, './_examples', id));
}

async function downloadLocalProExample(id: string, res: Response) {
  if (!existsSync(join(__dirname, './_examples', id))) {
    return res.status(500).send({ message: 'Example does not exist.' });
  }

  try {
    const payload = { timestamp: Date.now(), files: [] } as ProExample;
    const src = join(__dirname, './_examples', id, 'app');

    for (const file of await readdir(src, { withFileTypes: true, recursive: true })) {
      if (!file.isFile()) continue;

      const relativePath = relative(src, file.path);
      const path = relativePath === '' ? `/${file.name}` : `/${relativePath}/${file.name}`;
      const content = await readFile(join(file.path, file.name), 'utf-8');

      payload.files.push({ path, content });
    }

    return res.status(200).json(payload);
  } catch {
    return res.status(500).send({ message: 'Bad request.' });
  }
}
