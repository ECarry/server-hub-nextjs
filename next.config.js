/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/server/all",
        permanent: true,
      },
      {
        source: "/server/undefined",
        destination: "/server/all",
        permanent: true,
      },
      {
        source: "/storage/undefined",
        destination: "/storage/all",
        permanent: true,
      },
      {
        source: "/network/undefined",
        destination: "/network/all",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
