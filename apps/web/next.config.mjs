/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@workspace/api",
    "@workspace/auth",
    "@workspace/env",
    "@workspace/ui",
  ],
}

export default nextConfig
