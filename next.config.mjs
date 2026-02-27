/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16+ uses serverExternalPackages at root level
  serverExternalPackages: ["@noble/hashes", "@noble/curves"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
