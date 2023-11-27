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
  const response = await fetch(`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/examples.json`);
  const examples = await response.json();
  return examples
    .filter((example) => (framework ? example.framework === framework : true))
    .map((example) => ({ ...example, framework: 'react' }));
}

export async function getExampleConfig({ id, framework }: { id: string; framework: Framework }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${id}/config.json`);
  const config = await response.json();
  return config;
}

// @todo this is not necessary once we deploy at pro.reactflow.dev
export function getBaseUrl() {
  if (isDevelopment() || isStaging()) {
    return '/';
  }

  return isProduction() && process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://pro-beta.reactflow.dev' : '/';
}
