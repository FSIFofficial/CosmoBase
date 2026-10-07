/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // カスタムドメイン(cosmobase.fsif.jp)のルートで配信するため、
  // GitHub Pagesのプロジェクトページ用basePath('/CosmoBase')は不要。
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
