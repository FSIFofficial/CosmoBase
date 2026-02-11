/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- ★ここが重要！これを足してください
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
