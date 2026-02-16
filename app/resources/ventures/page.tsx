import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "宇宙ベンチャー企業一覧 | 資料館", 
  description: "宇宙に関する知識とデータはこちらから",
    // OGPも個別で上書き
  openGraph: {
    title: "宇宙ベンチャー企業一覧 | 資料館 | Cosmo Base",
    description: "宇宙に関する知識とデータはこちらから",
  },
}

export default function VenturesPage() {
  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/resources"
              className="inline-flex items-center text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans text-sm mb-6"
            >
              ← 資料館に戻る
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">🚀</div>
                <h1 className="text-3xl md:text-5xl font-serif text-[#EEEEFF]">宇宙ベンチャー企業一覧</h1>
              </div>
              <span className="inline-block text-xs text-[#83CBEB] bg-[#83CBEB]/10 px-3 py-1 rounded font-sans mb-4">
                公開
              </span>
              <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                国内外の宇宙ベンチャー企業の事業内容、設立年、資金調達状況などをまとめたデータベース
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#83CBEB]/10 to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-serif text-[#EEEEFF] mb-6">掲載企業一覧（抜粋）</h2>

              <div className="space-y-4">
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-sans text-[#EEEEFF]">SpaceX</h3>
                    <span className="text-xs text-[#EEEEFF]/60 bg-[#000033]/40 px-2 py-1 rounded">米国</span>
                  </div>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm mb-3">
                    ロケット開発・打ち上げサービス、衛星通信（Starlink）
                  </p>
                  <div className="flex gap-3 text-xs text-[#EEEEFF]/60">
                    <span>設立：2002年</span>
                    <span>|</span>
                    <span>従業員：13,000名以上</span>
                  </div>
                </div>

                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-sans text-[#EEEEFF]">ispace</h3>
                    <span className="text-xs text-[#EEEEFF]/60 bg-[#000033]/40 px-2 py-1 rounded">日本</span>
                  </div>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm mb-3">月面着陸船開発、月面輸送サービス</p>
                  <div className="flex gap-3 text-xs text-[#EEEEFF]/60">
                    <span>設立：2010年</span>
                    <span>|</span>
                    <span>上場：東証グロース</span>
                  </div>
                </div>

                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-sans text-[#EEEEFF]">Rocket Lab</h3>
                    <span className="text-xs text-[#EEEEFF]/60 bg-[#000033]/40 px-2 py-1 rounded">米国/NZ</span>
                  </div>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm mb-3">小型ロケット開発・打ち上げサービス</p>
                  <div className="flex gap-3 text-xs text-[#EEEEFF]/60">
                    <span>設立：2006年</span>
                    <span>|</span>
                    <span>上場：NASDAQ</span>
                  </div>
                </div>

                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-sans text-[#EEEEFF]">Astroscale</h3>
                    <span className="text-xs text-[#EEEEFF]/60 bg-[#000033]/40 px-2 py-1 rounded">日本</span>
                  </div>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm mb-3">スペースデブリ除去サービス</p>
                  <div className="flex gap-3 text-xs text-[#EEEEFF]/60">
                    <span>設立：2013年</span>
                    <span>|</span>
                    <span>累計資金調達：300億円以上</span>
                  </div>
                </div>

                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-sans text-[#EEEEFF]">Axiom Space</h3>
                    <span className="text-xs text-[#EEEEFF]/60 bg-[#000033]/40 px-2 py-1 rounded">米国</span>
                  </div>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm mb-3">商業宇宙ステーション開発</p>
                  <div className="flex gap-3 text-xs text-[#EEEEFF]/60">
                    <span>設立：2016年</span>
                    <span>|</span>
                    <span>累計資金調達：500億円以上</span>
                  </div>
                </div>

                <div className="bg-[#000033]/40 border border-[#83CBEB]/10 rounded-lg p-6 text-center">
                  <p className="text-[#EEEEFF]/60 font-sans text-sm">他145社のデータを収録</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6">
              <h3 className="text-lg font-serif text-[#EEEEFF] mb-3">データベースについて</h3>
              <ul className="space-y-2 text-[#EEEEFF]/70 font-sans text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>更新日：2026年1月</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>収録企業数：150社以上</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>対象地域：日本、米国、欧州、アジア</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>更新頻度：四半期ごと</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
