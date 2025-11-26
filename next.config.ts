import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  compress: true, // Enable gzip compression
  
  // ❌ REMOVE THIS LINE - swcMinify is default in Next.js 13+
  // swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true, // Optimize CSS loading
    optimizePackageImports: ['framer-motion', 'lucide-react'], // Tree-shake these packages
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default withNextIntl(config);