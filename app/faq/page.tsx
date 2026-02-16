"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "よくある質問", 
  description: "Cosmo Baseについてよくいただく質問にお答えします",
    // OGPも個別で上書き
  openGraph: {
    title: "よくある質問 | Cosmo Base",
    description: "Cosmo Baseについてよくいただく質問にお答えします",
  },
}

const faqs = [
  {
    category: "コミュニティー参加について",
    questions: [
      {
        q: "参加費用はかかりますか？",
        a: "基本的な参加は無料です。Discordコミュニティへの参加や、基本的な情報へのアクセスには費用はかかりません。一部の特別なイベントやワークショップは有料の場合があります。",
      },
      {
        q: "どのような人が参加していますか？",
        a: "学生、社会人、研究者、企業の方など、宇宙に興味を持つ様々なバックグラウンドの方が参加しています。宇宙業界の経験は問いません。",
      },
      {
        q: "参加するにはどうすればいいですか？",
        a: "「参加方法」ページから、Discordコミュニティへの招待リンクを取得できます。アカウントを作成して参加するだけで、すぐに活動を始められます。",
      },
    ],
  },
  {
    category: "活動内容について",
    questions: [
      {
        q: "どのようなイベントが開催されていますか？",
        a: "専門家トークセッション、オンライン天体観測会、勉強会、アイデアソン、交流会など、多様なイベントを開催しています。詳しくは「提供する価値」ページをご覧ください。",
      },
      {
        q: "オンラインだけの参加も可能ですか？",
        a: "はい、可能です。多くのイベントはオンラインで開催されており、全国どこからでも参加できます。一部、オフラインイベントも企画しています。",
      },
      {
        q: "初心者でも大丈夫ですか？",
        a: "もちろんです。知識ゼロからでも学べるコンテンツを用意しており、気軽に質問できる環境があります。むしろ初心者の方も大歓迎です。",
      },
    ],
  },
  {
    category: "パートナー制度について",
    questions: [
      {
        q: "パートナーになるにはどうすればいいですか？",
        a: "「パートナー制度」ページから資料請求、またはカジュアル面談をお申し込みください。まずは話を聞いてみたい、という段階でも大歓迎です。",
      },
      {
        q: "個人でもパートナーになれますか？",
        a: "パートナー制度は企業・学生団体・研究機関などの組織向けですが、個人の方は通常のコミュニティーメンバーとして全ての基本機能をご利用いただけます。",
      },
      {
        q: "パートナーになるとどんなメリットがありますか？",
        a: "コミュニティー内での情報発信、他産業・学生との接点創出、イベント企画への優先参画、採用・共同研究のマッチング機会などが得られます。",
      },
    ],
  },
  {
    category: "その他",
    questions: [
      {
        q: "資料館の資料はすべて見られますか？",
        a: "一部の資料は公開されていますが、多くの詳細な資料はコミュニティーメンバー限定で公開しています。参加することで、蓄積されたナレッジにアクセスできます。",
      },
      {
        q: "企業の採用情報などはありますか？",
        a: "パートナー企業からの採用情報や、インターンシップ情報などは定期的にコミュニティー内で共有されています。",
      },
      {
        q: "退会はいつでもできますか？",
        a: "はい、いつでも自由に退会できます。Discordから退出するだけで完了します。",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">よくある質問</h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                Cosmo Baseについてよくいただく質問にお答えします
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-serif text-[#EEEEFF] mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-[#83CBEB] rounded-full"></span>
                    {category.category}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const key = `${categoryIndex}-${itemIndex}`
                      const isOpen = openItems[key]

                      return (
                        <div
                          key={itemIndex}
                          className="bg-gradient-to-r from-[#83CBEB]/5 to-transparent border border-[#83CBEB]/10 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full text-left p-4 md:p-6 flex items-start justify-between gap-4 hover:bg-[#83CBEB]/5 transition-colors"
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <span className="text-[#83CBEB] font-serif text-lg flex-shrink-0 mt-0.5">Q</span>
                              <span className="text-[#EEEEFF] font-sans text-base md:text-lg leading-relaxed">
                                {item.q}
                              </span>
                            </div>
                            <span
                              className={`text-[#83CBEB] text-2xl flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            >
                              ↓
                            </span>
                          </button>

                          {isOpen && (
                            <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                              <div className="flex items-start gap-3 bg-[#000033]/40 rounded-lg p-4">
                                <span className="text-[#EEEEBB] font-serif text-lg flex-shrink-0 mt-0.5">A</span>
                                <p className="text-[#EEEEFF]/80 font-sans text-sm md:text-base leading-relaxed">
                                  {item.a}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-[#83CBEB]/10 to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 text-center">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">他にご質問がありますか？</h3>
                <p className="text-[#EEEEFF]/70 font-sans mb-6 leading-relaxed">
                  こちらで解決しない質問は、お気軽にお問い合わせください
                </p>
                <a href="https://discord.gg/xVJDjuGyeM" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                    Discordで質問する
                  </Button>
                </a>
              </div>

              <div className="border-t border-[#83CBEB]/20 mt-8 pt-8 text-center">
                <h4 className="text-xl font-serif text-[#EEEEFF] mb-4">コミュニティーに参加する</h4>
                <p className="text-[#EEEEFF]/70 font-sans mb-6 leading-relaxed">
                  Discordコミュニティで、宇宙への一歩を踏み出しましょう
                </p>
                <Link href="/join">
                  <Button
                    variant="outline"
                    className="border-[#EEEEFF] text-[#EEEEFF] hover:bg-[#EEEEFF]/10 text-lg px-8 py-6 font-sans bg-transparent"
                  >
                    参加方法を見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
