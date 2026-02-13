"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">資料館</h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                宇宙に関する知識とデータが集まる場所
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#83CBEB]/10 to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">📚</div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF]">資料・ナレッジの蓄積</h2>
              </div>
              <p className="text-lg text-[#EEEEFF]/80 font-sans mb-6 leading-relaxed">
                宇宙を「自分ごと」にするための、最初の一冊。<br/>
                イベントや勉強会で使用した資料を、初心者にも分かりやすい形で公開しています。<br/>
                ※資料は随時追加されます
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Link href="/resources/event">
                <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB]/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-xl">
                          📊
                        </div>
                        <h3 className="text-xl font-serif text-[#EEEEFF]">イベント資料</h3>
                      </div>
                      <span className="text-xs text-[#83CBEB] bg-[#83CBEB]/10 px-2 py-1 rounded font-sans">
                        公開
                      </span>
                    </div>
                    <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-4">
                      ワークショップ開催時に使用した資料を公開
                    </p>
                    <div className="flex items-center gap-2 text-[#EEEEFF]/50 text-xs font-sans">
                      <span>イベント開催ごとに更新</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/resources/news">
                <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB]/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-xl">
                          📰
                        </div>
                        <h3 className="text-xl font-serif text-[#EEEEFF]">週間ニュースまとめ</h3>
                      </div>
                      <span className="text-xs text-[#EEEEBB] bg-[#EEEEBB]/10 px-2 py-1 rounded font-sans">コミュニティー内で公開</span>
                    </div>
                    <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-4">
                      国内外の宇宙関連ニュースを厳選してまとめた週次レポート
                    </p>
                    <div className="flex items-center gap-2 text-[#EEEEFF]/50 text-xs font-sans">
                      <span>毎週更新</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="https://fsifofficial.wixsite.com/future-space-industr/library-1">
                <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB]/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-xl">
                          🎓
                        </div>
                        <h3 className="text-xl font-serif text-[#EEEEFF]">イベント報告書</h3>
                      </div>
                      <span className="text-xs text-[#83CBEB] bg-[#83CBEB]/10 px-2 py-1 rounded font-sans">公開</span>
                    </div>
                    <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-4">
                      ​イベントの実施内容・振り返りをまとめています。
                    </p>
                    <div className="flex items-center gap-2 text-[#EEEEFF]/50 text-xs font-sans">
                      <span>イベント開催ごとに更新</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/resources/events">
                <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB]/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-xl">
                          📅
                        </div>
                        <h3 className="text-xl font-serif text-[#EEEEFF]">イベント・展示会レポート</h3>
                      </div>
                      <span className="text-xs text-[#EEEEBB] bg-[#EEEEBB]/10 px-2 py-1 rounded font-sans">
                        コミュニティー内で公開
                      </span>
                    </div>
                    <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-4">
                      国内外の宇宙関連イベント、展示会の参加レポートと取材記事
                    </p>
                    <div className="flex items-center gap-2 text-[#EEEEFF]/50 text-xs font-sans">
                      <span>写真と詳細レポート付き</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/resources/ventures">
                <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB]/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-xl">
                          🚀
                        </div>
                        <h3 className="text-xl font-serif text-[#EEEEFF]">宇宙ベンチャー企業一覧</h3>
                      </div>
                      <span className="text-xs text-[#83CBEB] bg-[#83CBEB]/10 px-2 py-1 rounded font-sans">公開</span>
                    </div>
                    <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-4">
                      国内外の宇宙ベンチャー企業の事業内容、設立年、資金調達状況などをまとめたデータベース
                    </p>
                    <div className="flex items-center gap-2 text-[#EEEEFF]/50 text-xs font-sans">
                      <span>150社以上のデータを収録</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/resources/technology">
                <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB]/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-xl">
                          🛰️
                        </div>
                        <h3 className="text-xl font-serif text-[#EEEEFF]">ロケット・衛星技術比較</h3>
                      </div>
                      <span className="text-xs text-[#EEEEBB] bg-[#EEEEBB]/10 px-2 py-1 rounded font-sans">
                        コミュニティー内で公開
                      </span>
                    </div>
                    <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-4">
                      各種ロケットの性能比較、衛星技術の種類と用途、打ち上げコスト分析など
                    </p>
                    <div className="flex items-center gap-2 text-[#EEEEFF]/50 text-xs font-sans">
                      <span>詳細な技術資料と比較表</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="bg-gradient-to-r from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">
                  ℹ️
                </div>
                <div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">資料館のご利用について</h3>
                  <ul className="space-y-2 text-[#EEEEFF]/70 font-sans text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#83CBEB] mt-1">•</span>
                      <span>公開資料は誰でも閲覧可能です</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#83CBEB] mt-1">•</span>
                      <span>コミュニティー内で公開資料はメンバー登録後にアクセスできます</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#83CBEB] mt-1">•</span>
                      <span>資料は随時追加・更新されます</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-serif text-[#EEEEFF] mb-4">より多くの資料にアクセスするには</h2>
              <p className="text-[#EEEEFF]/70 font-sans mb-6 leading-relaxed">
                コミュニティーに参加すると、限定資料や詳細な分析レポートにアクセスできます
              </p>
              <Link href="/join">
                <button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium rounded-md transition-colors">
                  コミュニティーに参加する
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
