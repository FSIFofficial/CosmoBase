import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
import "./globals.css"

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

  title: {
    template: "%s | CosmoBase",
    default: "CosmoBase",
  },
  description:
    "宇宙を、もっと身近な選択肢に。CosmoBaseは宇宙に興味がある人・産業をつなぐコミュニティーです。",
  
  openGraph: {
    title: "Cosmo Base",
    description: "宇宙を、もっと身近な選択肢に。",
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
    title: "Cosmo Base",
    description: "宇宙を、もっと身近な選択肢に。",
  },

  // ▼ 2. アイコン設定（ここを強化しました）
  icons: {
    // 一般的なアイコン（Google検索用にはこれを重視させる）
    icon: [
      {
        url: "https://fsifofficial.github.io/CosmoBase/CosmoBase/icon.png", // ←★ここに高画質画像のフルパスを入れる
        sizes: "192x192",
        type: "image/png",
      },
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

// ▼ ここに追加：サイト名をGoogleに伝えるためのデータ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cosmo Base",
  "alternateName": ["CosmoBase", "コスモベース"],
  "url": "https://fsifofficial.github.io/CosmoBase/",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}>
        {/* ▼ ここに追加：JSON-LDを出力 */}
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
