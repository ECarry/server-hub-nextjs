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
        destination: "/servers/all",
        permanent: true,
      },
      {
        source: "/servers/undefined",
        destination: "/servers/all",
        permanent: true,
      },
      {
        source: "/storage/undefined",
        destination: "/storage/all",
        permanent: true,
      },
      {
        source: "/networking/undefined",
        destination: "/networking/all",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
