/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Galacia was renamed Everfrost on 17 November 2026; Nebula Vault was its earlier name.
      { source: '/galacia', destination: '/everfrost', permanent: true },
      { source: '/projects/galacia', destination: '/projects/everfrost', permanent: true },
      { source: '/projects/galacia-vault', destination: '/projects/everfrost-vault', permanent: true },
      { source: '/projects/nebula-vault', destination: '/projects/everfrost-vault', permanent: true },
      // Renamed to match the product's name, Infinity Dox.
      { source: '/projects/infinity-docs', destination: '/projects/infinity-dox', permanent: true },
    ]
  },
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
