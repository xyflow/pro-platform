import { NhostClient } from '@nhost/nhost-js';
import { Environment, Framework, ProExampleConfig } from '@/types';

export function isProduction() {
  return process.env.NODE_ENV === Environment.PRODUCTION;
}

export function isDevelopment() {
  return process.env.NODE_ENV === Environment.DEVELOPMENT;
}

export function isStaging() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
}

export function getNhostClient() {
  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
  });

  return nhost;
}

export async function getExampleList({ framework }: { framework?: Framework } = {}): Promise<ProExampleConfig[]> {
  const nhost = getNhostClient();
  const examples = await nhost.functions.call<ProExampleConfig[]>('/pro-examples/all', { framework });

  return examples.res.data;
}

export async function getExampleConfig({
  id,
  framework,
}: {
  id: string;
  framework: Framework;
}): Promise<ProExampleConfig> {
  const nhost = getNhostClient();
  const example = await nhost.functions.call<ProExampleConfig>('/pro-examples/config', { id });

  return example.res.data;
}
