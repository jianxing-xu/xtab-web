import * as UnoCSS from '@unocss/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.resolve.fallback = {
      child_process: false,
    }
    // for unocss
    config.plugins.push(UnoCSS.default())

    return config
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
}

export default nextConfig
