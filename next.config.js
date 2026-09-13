/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/projects/nebula-vault', destination: '/projects/galacia-vault', permanent: true },
    ]
  },
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
