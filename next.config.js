/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allows images from these domains:
  images: {
    domains: ["rickandmortyapi.com"],
    // For imageLoader
    loader: "custom",
    path: "/",
  },
};

module.exports = nextConfig;
