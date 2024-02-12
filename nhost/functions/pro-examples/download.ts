import { Request, Response } from 'express';
import { isSubscribed } from '../_utils/graphql/subscriptions';
import { authPost } from '../_utils/middleware';
import { redis } from '../_utils/redis';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { existsSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function downloadProExample(req: Request, res: Response, { userId }: { userId: string }) {
  const { id, framework } = req.body;

  if (process.env.NODE_ENV === 'development') {
    return downloadLocalProExample(req, res);
  }

  if (!id || !framework || !userId) {
    return res.status(500).send({ message: 'Bad request.' });
  }

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

export default authPost(downloadProExample);

type ProExampleContent = {
  timestamp: number;
  files: { path: string; content: string }[];
};

async function downloadLocalProExample(req: Request, res: Response) {
  const { id } = req.body;

  if (!existsSync(join(__dirname, './_examples', id))) {
    return res.status(500).send({ message: 'Example does not exist.' });
  }

  try {
    const payload = { timestamp: Date.now(), files: [] } as ProExampleContent;
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
