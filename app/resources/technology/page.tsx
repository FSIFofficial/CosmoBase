import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ロケット・衛星技術比較| 資料館", 
  description: "宇宙に関する知識とデータはこちらから",
    // OGPも個別で上書き
  openGraph: {
    title: "ロケット・衛星技術比較 | 資料館 | Cosmo Base",
    description: "宇宙に関する知識とデータはこちらから",
  },
}

export default function TechnologyPage() {
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
                <div className="w-12 h-12 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-2xl">🛰️</div>
                <h1 className="text-3xl md:text-5xl font-serif text-[#EEEEFF]">ロケット・衛星技術比較</h1>
              </div>
              <span className="inline-block text-xs text-[#EEEEBB] bg-[#EEEEBB]/10 px-3 py-1 rounded font-sans mb-4">
                コミュニティー内で公開
              </span>
              <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed mb-6">
                各種ロケットの性能比較、衛星技術の種類と用途、打ち上げコスト分析など
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#EEEEBB]/10 to-[#83CBEB]/5 border border-[#EEEEBB]/30 rounded-2xl p-8 mb-8 opacity-60">
              <h2 className="text-2xl font-serif text-[#EEEEFF] mb-6">コンテンツプレビュー</h2>

              <div className="space-y-6">
                <div className="bg-[#000033]/60 border border-[#EEEEBB]/20 rounded-lg p-6">
                  <h3 className="text-xl font-sans text-[#EEEEFF] mb-4">主要ロケット性能比較表</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#EEEEBB]/20">
                          <th className="text-left py-2 px-3 text-[#EEEEFF]/80 font-sans">ロケット名</th>
                          <th className="text-left py-2 px-3 text-[#EEEEFF]/80 font-sans">ペイロード</th>
                          <th className="text-left py-2 px-3 text-[#EEEEFF]/80 font-sans">打ち上げコスト</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#EEEEBB]/10">
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">Falcon 9</td>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">22.8t (LEO)</td>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">$67M</td>
                        </tr>
                        <tr className="border-b border-[#EEEEBB]/10">
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">H3</td>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">6.5t (LEO)</td>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">$51M</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">...</td>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">...</td>
                          <td className="py-2 px-3 text-[#EEEEFF]/60 font-sans">...</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#000033]/60 border border-[#EEEEBB]/20 rounded-lg p-6">
                  <h3 className="text-xl font-sans text-[#EEEEFF] mb-3">衛星技術の種類と用途</h3>
                  <ul className="space-y-2 text-[#EEEEFF]/60 font-sans text-sm">
                    <li>• 地球観測衛星：リモートセンシング、気象観測</li>
                    <li>• 通信衛星：衛星インターネット、放送</li>
                    <li>• 測位衛星：GPS、位置情報サービス</li>
                    <li>• その他詳細データ...</li>
                  </ul>
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
                  この資料はコミュニティーメンバーのみ閲覧可能です
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
