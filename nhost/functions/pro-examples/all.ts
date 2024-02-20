import type { Request, Response } from 'express';
import type { ProExampleConfig } from '../_utils/types';

import { post } from '../_utils/middleware';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';
import { redis } from '../_utils/redis';
import { IS_DEVELOPMENT } from '../_utils/constants';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

type GetAllProExamplesOptions = {
  framework?: 'react' | 'svelte';
  includeHidden?: boolean;
};

async function getAllProExamples(req: Request, res: Response) {
  const { framework = 'react', includeHidden = false } = req.body as GetAllProExamplesOptions;
  const examplesById = await getRedisProExamples(framework, includeHidden);

  if (IS_DEVELOPMENT) {
    await getLocalProExamples(framework, includeHidden, examplesById);
  }

  const examples = Object.values(examplesById).sort((a, b) => (a.free === b.free ? 0 : a.free ? -1 : 1));

  return res.status(200).json(examples);
}

export default post(getAllProExamples);

async function getRedisProExamples(framework: string, includeHidden: boolean) {
  const ids = await redis.keys('*');
  const all = (await redis.json.mget(ids, '$.config')) as ProExampleConfig[][];

  return Object.fromEntries<ProExampleConfig>(
    all
      // We get an array of arrays from redis for some reason, so we flatten that
      // down first.
      .flat()
      // Filter out any examples that don't match the framework or are hidden
      // if we're not including hidden examples.
      .filter((config) => {
        const isCorrectFramework = config.framework ? config.framework === framework : true;
        const isVisible = includeHidden ? true : !config.hidden;

        return isCorrectFramework && isVisible;
      })
      // For each example config we retreive, we need to inject a few more properties
      // that were once hardcoded by the frontend and should now be provided by
      // the config.
      .map((config) => {
        const { id } = config;
        const thumbnail = `${process.env.PUBLIC_PRO_EXAMPLES_URL}/${id}/thumbnail.jpg`;
        const preview = `${process.env.PUBLIC_PRO_EXAMPLES_URL}/${id}`;

        return [id, { ...config, thumbnail, framework, preview }];
      })
  );
}

async function getLocalProExamples(
  framework: string,
  includeHidden: boolean,
  examplesById: Record<string, ProExampleConfig> = {}
) {
  const examples = join(__dirname, './_examples');

  for (const id of await readdir(examples)) {
    const config = JSON.parse(await readFile(join(examples, id, 'config.json'), 'utf-8')) as ProExampleConfig;
    const isCorrectFramework = config.framework ? config.framework === framework : true;
    const isVisible = includeHidden ? true : !config.hidden;
    // The LOCAL_PRO_EXAMPLES_URL can optionally be set to serve the live demos
    // from a local server (duh) but it doesn't have to be set.
    //
    // We fall back to the live demo URL if it's not set, which was the old behaviour
    // before any sort of local development was possible.
    const preview = `${process.env.LOCAL_PRO_EXAMPLES_URL ?? process.env.PUBLIC_PRO_EXAMPLES_URL}/${id}`;

    if (isCorrectFramework && isVisible) {
      examplesById[id] = { ...config, local: true, framework, preview };
    }
  }

  return examplesById;
}
