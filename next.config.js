/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn-images-1.medium.com",
      },
    ],
  },
};

module.exports = nextConfig;
