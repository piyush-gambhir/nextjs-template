import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable smaller runtime image via .next/standalone output
  output: 'standalone',
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
