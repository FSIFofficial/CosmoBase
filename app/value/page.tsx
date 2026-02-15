"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ValuePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">
                Cosmo Baseが提供する価値
              </h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                参加することで得られる具体的なメリット
              </p>
            </div>

            <div className="space-y-8 mb-16">
              <div className="bg-gradient-to-r from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">
                    📰
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">
                      自動的に情報が入ってくる仕組み
                    </h3>
                    <p className="text-[#EEEEFF]/80 font-sans mb-4 leading-relaxed">
                      忙しい日々の中でも、宇宙の最新動向を見逃しません
                    </p>
                    <ul className="space-y-2 text-[#EEEEFF]/70 font-sans text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>週1回の宇宙ニュースまとめ配信</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>国内外のイベント・展示会レポート</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>打ち上げ予定・天文イベント情報</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#EEEEBB]/10 to-transparent border-l-4 border-[#EEEEBB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">相談・質問できる環境</h3>
                    <p className="text-[#EEEEFF]/80 font-sans mb-4 leading-relaxed">
                      専門家に気軽に聞ける、頼れる存在がここにあります
                    </p>
                    <ul className="space-y-2 text-[#EEEEFF]/70 font-sans text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-[#EEEEBB] mt-1">•</span>
                        <span>宇宙の専門家にフラットに質問できるチャンネル</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#EEEEBB] mt-1">•</span>
                        <span>企業・学生団体・個人の人脈形成とマッチング</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#EEEEBB] mt-1">•</span>
                        <span>事業アイデアの相談・壁打ち相手</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">
                    📚
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">資料・ナレッジの蓄積</h3>
                    <p className="text-[#EEEEFF]/80 font-sans mb-4 leading-relaxed">
                      一から調べる必要はありません。既にまとまった情報がここに
                    </p>
                    <ul className="space-y-2 text-[#EEEEFF]/70 font-sans text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>宇宙産業に関する考察</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>ワークショップなどで使用した調査資料</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>イベントレポートやニュース記事</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#83CBEB]/10 to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-6 text-center">具体的なイベント例</h2>
              <div className="space-y-6">
                <div className="bg-[#000033]/60 rounded-lg p-6">
                  <h4 className="text-lg font-serif text-[#EEEEFF] mb-2">🎤 専門家トークセッション</h4>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-3">
                    宇宙開発に取り組み、宇宙産業を知る学生とのフリートークイベント。オンラインで入退室自由な場で月に一度宇宙を語ろう。
                  </p>
                  <p className="text-[#83CBEB] font-sans text-xs">開催頻度：月1回程度</p>
                </div>

                <div className="bg-[#000033]/60 rounded-lg p-6">
                  <h4 className="text-lg font-serif text-[#EEEEFF] mb-2">🔭 オンライン天体観測会</h4>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-3">
                    流星群や月食など、天文イベントをみんなで観測。専門家の解説付きで楽しめます。
                  </p>
                  <p className="text-[#83CBEB] font-sans text-xs">開催：天文イベントに合わせて</p>
                </div>

                <div className="bg-[#000033]/60 rounded-lg p-6">
                  <h4 className="text-lg font-serif text-[#EEEEFF] mb-2">💡 アイデアソン・ハッカソン</h4>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-3">
                    宇宙×他産業をテーマに、新しいビジネスアイデアを創出。学生・企業・個人が協力します。
                  </p>
                  <p className="text-[#83CBEB] font-sans text-xs">開催頻度：年2-3回</p>
                </div>

                <div className="bg-[#000033]/60 rounded-lg p-6">
                  <h4 className="text-lg font-serif text-[#EEEEFF] mb-2">📖 勉強会・ワークショップ</h4>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-3">
                    ロケット技術、衛星データ活用など、テーマごとに深く学べる勉強会を定期開催。
                  </p>
                  <p className="text-[#83CBEB] font-sans text-xs">{/*開催頻度：*/}サービス準備中</p>
                </div>

                <div className="bg-[#000033]/60 rounded-lg p-6">
                  <h4 className="text-lg font-serif text-[#EEEEFF] mb-2">🎙️ ライブ配信・感想戦</h4>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-3">
                    ロケット打ち上げのライブ視聴会や、宇宙関連イベント後の感想戦で盛り上がります。
                  </p>
                  <p className="text-[#83CBEB] font-sans text-xs">開催：イベント発生時</p>
                </div>

                <div className="bg-[#000033]/60 rounded-lg p-6">
                  <h4 className="text-lg font-serif text-[#EEEEFF] mb-2">🤝 交流会・懇親会</h4>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed mb-3">
                    オンライン・オフラインで気軽に交流。業界の枠を超えた新しいつながりが生まれます。
                  </p>
                  <p className="text-[#83CBEB] font-sans text-xs">開催頻度：不定期</p>
                </div>
              </div>
            </div>

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">コミュニティーに参加してみませんか？</h3>
              <p className="text-[#EEEEFF]/70 font-sans mb-6 leading-relaxed">
                これらのイベントに参加して、宇宙をもっと身近に感じましょう
              </p>
              <a href="https://discord.gg/xVJDjuGyeM" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  コミュニティーに参加する
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
