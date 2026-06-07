import Header from "@/components/header"
import Footer from "@/components/footer"
import PartnerList from "./partner-list"
import { getPartners } from "@/lib/partners"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "パートナー",
  description: "Cosmo Baseのビジョンに共感し、共に宇宙産業を盛り上げるパートナー企業・団体をご紹介します。",
  openGraph: {
    title: "パートナー | Cosmo Base",
    description: "Cosmo Baseのビジョンに共感し、共に宇宙産業を盛り上げるパートナー企業・団体をご紹介します。",
  },
}

export default async function PartnersPage() {
  // ▼ サーバーサイドでCSV（スプレッドシート）からパートナー情報を取得
  const partners = await getPartners()

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      
      <main className="container mx-auto px-4 py-16 sm:py-24">
        {/* ページヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#EEEEFF] mb-6">パートナー</h1>
          <p className="text-[#83CBEB] text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Cosmo Baseのビジョンに共感し、共に宇宙界隈を盛り上げる<br className="hidden sm:block" />
            企業・団体の皆様をご紹介します。
          </p>
        </div>

        {/* 検索・絞り込み機能付きのリスト（クライアントコンポーネント） */}
        <PartnerList initialPartners={partners} />

      </main>

      <Footer />
    </div>
  )
}