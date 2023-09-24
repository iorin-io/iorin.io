/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { runtime: 'edge'}
};

module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  images: {
      domains: ["iorin.io"],
      formats: ["image/webp"],
  },
};