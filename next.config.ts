import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable smaller runtime image via .next/standalone output
  output: 'standalone',
};

export default nextConfig;
