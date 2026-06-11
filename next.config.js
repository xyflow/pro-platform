/** @type {import('next').NextConfig} */

const redirects = require('./redirects.json');

const nextConfig = {
  transpilePackages: ['@xyflow/xy-ui'],
  reactStrictMode: true,
  typescript: {
    // @todo remove this when ts errors in xy-ui are resolved
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.reactflow.dev',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
  },

  async redirects() {
    return redirects;
  },
};

module.exports = nextConfig;
