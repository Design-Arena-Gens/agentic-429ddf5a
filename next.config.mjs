/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true
  },
  output: 'standalone'
};

export default nextConfig;
