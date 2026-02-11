import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-[#83CBEB]/20 sticky top-0 bg-[#000033]/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/e3-82-b9-e3-82-af-e3-83-aa-e3-83-bc-e3-83-b3-e3-82-b7-e3-83-a7-e3-83-83-e3-83-88-202025-12-31-20000017.png"
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
