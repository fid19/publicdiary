/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
