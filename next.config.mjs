/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "publicdiaryapp.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
