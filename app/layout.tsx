import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
  title: "Cosmo Base - パートナー制度 | 一番身近な宇宙の専門家",
  description:
    "宇宙を、もっと身近な選択肢に。Cosmo Baseは宇宙に興味がある人・産業をつなぐコミュニティーです。パートナー制度への参画団体を募集しています。",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        <Analytics />
      </body>
    </html>
  )
}
