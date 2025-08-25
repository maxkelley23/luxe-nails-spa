/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // May be required for static deployment
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Ensure the nested structure exists
      if (!config.optimization) config.optimization = {}
      if (!config.optimization.splitChunks) config.optimization.splitChunks = {}
      if (!config.optimization.splitChunks.cacheGroups) config.optimization.splitChunks.cacheGroups = {}
      
      // Set default minChunks if it exists
      if (config.optimization.splitChunks.cacheGroups.default) {
        config.optimization.splitChunks.cacheGroups.default.minChunks = 2
      }
      
      // Add vendor cache group
      config.optimization.splitChunks.cacheGroups.vendor = {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      }
    }
    return config
  },
}

export default nextConfig
