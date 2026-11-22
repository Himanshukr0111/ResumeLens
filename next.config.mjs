/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Prevent Next.js from bundling this CJS-native package.
    // It must be resolved by Node.js at runtime, not compiled by webpack,
    // otherwise its internal Object.defineProperty calls crash.
    serverComponentsExternalPackages: ["pdf-parse"],
  },
};

export default nextConfig;
