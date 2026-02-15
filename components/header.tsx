"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // リンクをクリックしたらメニューを閉じる
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="border-b border-[#83CBEB]/20 sticky top-0 bg-[#000033]/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-4" onClick={closeMenu}>
            <Image
              src="/CosmoBase.png"
              alt="Cosmo Base Logo"
              width={300}
              height={100}
              className="h-10 w-auto md:h-14" // スマホでは少し小さく
            />
          </Link>

          {/* デスクトップ用ナビゲーション (PCで見える) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/value" className="text-[#EEEEFF] hover:text-[#83CBEB] transition-colors font-sans text-sm">
              提供する価値
            </Link>
            <Link href="/partners" className="text-[#EEEEFF] hover:text-[#83CBEB] transition-colors font-sans text-sm">
              パートナー
            </Link>
            <Link href="/resources" className="text-[#EEEEFF] hover:text-[#83CBEB] transition-colors font-sans text-sm">
              資料館
            </Link>
            <Link href="/events" className="text-[#EEEEFF] hover:text-[#83CBEB] transition-colors font-sans text-sm">
              イベント
            </Link>
            <Link href="/news" className="text-[#EEEEFF] hover:text-[#83CBEB] transition-colors font-sans text-sm">
              ニュース
            </Link>
            <Link href="/faq" className="text-[#EEEEFF] hover:text-[#83CBEB] transition-colors font-sans text-sm">
              よくある質問
            </Link>
          </nav>

          {/* モバイル用ハンバーガーボタン (スマホで見える) */}
          <button
            className="md:hidden text-[#EEEEFF] p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="メニューを開く"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* モバイル用ナビゲーションメニュー */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#000033] border-b border-[#83CBEB]/20 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/value"
              onClick={closeMenu}
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10 px-4 py-3 rounded-md transition-colors font-sans text-sm"
            >
              提供する価値
            </Link>
            <Link
              href="/partners"
              onClick={closeMenu}
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10 px-4 py-3 rounded-md transition-colors font-sans text-sm"
            >
              パートナー
            </Link>
            <Link
              href="/resources"
              onClick={closeMenu}
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10 px-4 py-3 rounded-md transition-colors font-sans text-sm"
            >
              資料館
            </Link>
            <Link
              href="/events"
              onClick={closeMenu}
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10 px-4 py-3 rounded-md transition-colors font-sans text-sm"
            >
              イベント
            </Link>
            <Link
              href="/news"
              onClick={closeMenu}
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10 px-4 py-3 rounded-md transition-colors font-sans text-sm"
            >
              ニュース
            </Link>
            <Link
              href="/faq"
              onClick={closeMenu}
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10 px-4 py-3 rounded-md transition-colors font-sans text-sm"
            >
              よくある質問
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
