/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "out",
    register: true,
    disable: process.env.NODE_ENV === "development",
    skipWaiting: true,
  },
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/random",
      },
    ],
  },
};

module.exports = nextConfig;
