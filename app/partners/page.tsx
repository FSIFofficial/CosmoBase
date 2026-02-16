import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPartners } from "@/lib/partners"
import PartnerList from "./partner-list" // 作成したクライアントコンポーネント
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "パートナー企業・団体", 
  description: "Cosmo Baseと共に宇宙の未来を創るパートナー企業・団体をご紹介します。",
    // OGPも個別で上書き
  openGraph: {
    title: "パートナー企業・団体 | Cosmo Base",
    description: "Cosmo Baseと共に宇宙の未来を創るパートナー企業・団体をご紹介します。",
  },
}

export default function PartnersPage() {
  // サーバーサイドでデータを取得
  const partners = getPartners();

  return (
    <div className="min-h-screen bg-[#000033]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#EEEEFF] sm:text-5xl lg:text-6xl text-balance">
              パートナー企業・団体
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#EEEEFF]/80 text-pretty">
              Cosmo Baseと共に宇宙の未来を創るパートナー企業・団体をご紹介します。
            </p>
          </div>
        </div>
      </section>

      {/* 検索・一覧部分はクライアントコンポーネントに任せる */}
      <PartnerList initialPartners={partners} />

      {/* Partner Program Section */}
      <section className="border-t border-[#83CBEB]/20 bg-gradient-to-br from-[#83CBEB]/5 to-[#EEEEBB]/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#EEEEFF] sm:text-4xl text-balance mb-4">
              パートナー制度について
            </h2>
            <p className="text-lg text-[#EEEEFF]/80 max-w-3xl mx-auto text-pretty">
              Cosmo Baseと一緒に宇宙の可能性を広げていきましょう
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#000033]/60 border border-[#83CBEB]/30 rounded-xl p-6">
              <h3 className="font-serif text-xl text-[#EEEEFF] mb-4">パートナー対象</h3>
              <ul className="space-y-3 text-[#EEEEFF]/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>企業（宇宙系・非宇宙系問わず）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>学生団体（大学・高専サークル等）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>教育・研究団体</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#000033]/60 border border-[#EEEEBB]/30 rounded-xl p-6">
              <h3 className="font-serif text-xl text-[#EEEEFF] mb-4">主なメリット</h3>
              <ul className="space-y-3 text-[#EEEEFF]/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>コミュニティー内での情報発信</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>学生・他産業との接点創出</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>イベント・企画への参画機会</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>将来の事業・人材の種まき</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/partner">
              <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6">
                パートナー制度の詳細を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
