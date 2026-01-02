import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'skilltestnextjs.evidam.zybotechlab.com',
      },
      {
        protocol: 'https',
        hostname: 'skilltestnextjs.evidam.zybotechlab.com',
      },
    ],
  },
};

export default nextConfig;
