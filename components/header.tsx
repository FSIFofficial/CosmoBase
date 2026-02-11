import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-[#83CBEB]/20 sticky top-0 bg-[#000033]/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/CosmoBase.png"
              alt="Cosmo Base Logo"
              width={300}
              height={100}
              className="h-14 w-auto"
            />
          </Link>
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
        </div>
      </div>
    </header>
  )
}
