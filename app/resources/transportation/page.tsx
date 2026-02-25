import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "日本の宇宙輸送の現状 | 資料館", 
  description: "宇宙輸送の歴史から、国・民間・学生によるロケット開発まで、日本の宇宙輸送エコシステムを網羅した資料",
  openGraph: {
    title: "日本の宇宙輸送の現状 | 資料館 | Cosmo Base",
    description: "宇宙輸送の歴史から、国・民間・学生によるロケット開発まで、日本の宇宙輸送エコシステムを網羅した資料",
  },
}

export default function JapanSpaceTransportationPage() {
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
                <div className="w-12 h-12 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-2xl">🚀</div>
                <h1 className="text-3xl md:text-5xl font-serif text-[#EEEEFF]">日本の宇宙輸送の現状</h1>
              </div>
              <span className="inline-block text-xs text-[#EEEEBB] bg-[#EEEEBB]/10 px-3 py-1 rounded font-sans mb-4">
                コミュニティー内で公開
              </span>
              <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed mb-6">
                宇宙輸送の歴史や現状から、国（JAXAなど）・民間ベンチャー・学生団体それぞれの取り組みまで、日本の宇宙エコシステムの全体像を解説した資料。
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#EEEEBB]/10 to-[#83CBEB]/5 border border-[#EEEEBB]/30 rounded-2xl p-8 mb-8 opacity-60">
              <h2 className="text-2xl font-serif text-[#EEEEFF] mb-6">コンテンツプレビュー</h2>

              <div className="space-y-6">
                <div className="bg-[#000033]/60 border border-[#EEEEBB]/20 rounded-lg p-6">
                  <h3 className="text-xl font-sans text-[#EEEEFF] mb-4">資料の目次（Index）</h3>
                  <ul className="space-y-2 text-[#EEEEFF]/60 font-sans text-sm">
                    <li>• 01 宇宙輸送の歴史：軍事から科学へ、そして官から民へ</li>
                    <li>• 02 宇宙輸送の現状：SpaceX一強の時代と、垂直統合・水平分業</li>
                    <li>• 03 国による宇宙輸送：基幹ロケットの苦悩と独自技術</li>
                    <li>• 04 民間による宇宙輸送：小型・独自アプローチで挑む日本のベンチャー</li>
                    <li>• 05 学生のロケット開発：日本の宇宙輸送を支える学生・全国の団体</li>
                  </ul>
                </div>

                <div className="bg-[#000033]/60 border border-[#EEEEBB]/20 rounded-lg p-6">
                  <h3 className="text-xl font-sans text-[#EEEEFF] mb-4">主なトピックピックアップ</h3>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-md font-sans text-[#83CBEB] mb-1">なぜ宇宙輸送は「官から民へ」移ったのか</h4>
                      <p className="text-[#EEEEFF]/60 font-sans text-sm">
                        国家安全保障や技術覇権を目的とした高信頼性重視の官需から、通信・観測などの商業需要拡大を背景にしたコスト・スピード重視の民需へのシフトを図解で解説しています。
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-sans text-[#83CBEB] mb-1">多様化する日本のロケット開発アプローチ</h4>
                      <p className="text-[#EEEEFF]/60 font-sans text-sm">
                        H3やイプシロンといった国の基幹ロケットの技術的挑戦から、ISTやスペースワンなどの民間ベンチャーの動向、さらに全国42団体にも及ぶ学生ロケット開発の強みと弱みを徹底比較。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#000033]/80 border border-[#EEEEBB]/30 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-[#EEEEBB] mb-4">
                  <span className="text-2xl">🔒</span>
                  <span className="font-sans">コミュニティー限定資料</span>
                </div>
                <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                  この資料の全編（PDF）はコミュニティーメンバーのみ閲覧・ダウンロード可能です
                </p>
              </div>
              <Link href="/join">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  コミュニティーに入る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
