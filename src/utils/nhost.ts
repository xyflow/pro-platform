import { NhostClient } from '@nhost/nhost-js';

export function getNhostClient() {
  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
  });

  return nhost;
}
