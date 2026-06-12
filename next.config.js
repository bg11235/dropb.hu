/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.bandcamp.com' },
      { protocol: 'https', hostname: 'f4.bcbits.com' }, // Bandcamp CDN
      { protocol: 'https', hostname: '**.wordpress.com' },
    ],
  },
}

module.exports = nextConfig
