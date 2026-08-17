import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/tools/hourly-rate-reverse-engineer-calculator',
        destination: '/freelance/freelance-hourly-rate-calculator',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
