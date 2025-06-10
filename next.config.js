/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
    largePageDataBytes: 128 * 100000
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zylq-002.dx.commercecloud.salesforce.com",
      },
      {
        protocol: "https",
        hostname: "edge.disstg.commercecloud.salesforce.com",
      },
    ],
  },
};

module.exports = nextConfig; 