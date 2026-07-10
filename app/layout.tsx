import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import Script from "next/script";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
})

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  // ▼ 1. URLの基準（重要）
  metadataBase: new URL("https://fsifofficial.github.io/CosmoBase"),

  // ▼ SEO強化：titleに主要キーワードを含める
  title: {
    template: "%s | Cosmo Base",
    default: "Cosmo Base | 宇宙を身近にする宇宙コミュニティ",
  },
  
  // ▼ SEO強化：検索結果に表示される説明文を具体化し、ビジョンとターゲットを含める
  description:
    "「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ『Cosmo Base（コスモベース）』。初心者から宇宙産業に関心がある人まで、誰もが交流できる優しい場所です。",
  
  // ▼ SEO強化：関連キーワードを明示
  keywords: [
    "宇宙コミュニティ",
    "宇宙コミュニティー",
    "Cosmo Base",
    "コスモベース",
    "宇宙産業",
    "宇宙ビジネス",
    "初心者",
    "未来宇宙産業フォーラム"
  ],
  
  openGraph: {
    title: "Cosmo Base | 宇宙を身近にする宇宙コミュニティ",
    description: "「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ『Cosmo Base（コスモベース）』。初心者から宇宙産業に関心がある人まで、誰もが交流できる優しい場所です。",
    url: "https://fsifofficial.github.io/CosmoBase",
    siteName: "Cosmo Base",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/CosmoBase/icon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmo Base | 宇宙を身近にする宇宙コミュニティ",
    description: "「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ『Cosmo Base（コスモベース）』。",
  },

  // ▼ 2. アイコン設定
  icons: {
    icon: [
      {
        url: "https://fsifofficial.github.io/CosmoBase/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    // iPhone等のホーム画面用
    apple: [
      {
        url: "/CosmoBase/icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
}

// ▼ 構造化データ（JSON-LD）を強化
// WebSiteからOrganization（組織/コミュニティ）に変更し、運営元情報を追加
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cosmo Base",
  "alternateName": ["CosmoBase", "コスモベース"],
  "url": "https://fsifofficial.github.io/CosmoBase/",
  "description": "「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ。",
  "parentOrganization": {
    "@type": "Organization",
    "name": "未来宇宙産業フォーラム"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        {/* アナリティクスのコード */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-3CH0EB23BR`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3CH0EB23BR', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}>
        {/* JSON-LDを出力 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div id="top" />
        {children}
      </body>
    </html>
  )
}
