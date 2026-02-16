import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
//import { Analytics } from "@vercel/analytics/next"
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
  // ▼ 1. URLの基準を設定（これがないとOGP画像が出ません）
  metadataBase: new URL("https://fsifofficial.github.io/CosmoBase"), 

  // ▼ 2. タイトルのテンプレート設定
  title: {
    template: "%s | Cosmo Base", // 子ページで "News" と設定すると "News | Cosmo Base" になる
    default: "Cosmo Base", // 子で設定がない場合に表示される
  },

  description: "宇宙を、もっと身近な選択肢に。Cosmo Baseは宇宙に興味がある人・産業をつなぐコミュニティーです。",

  // ▼ 3. SNSシェア用の設定（OGP）
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

  // ▼ アイコン設定
  icons: {
    icon: "/CosmoBase/icon.png", 
    apple: "/CosmoBase/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}>
        <div id="top" />
        {children}
        {/*<Analytics />*/}
      </body>
    </html>
  )
}
