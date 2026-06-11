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

  async redirects() {
    return redirects;
  },
};

module.exports = nextConfig;
