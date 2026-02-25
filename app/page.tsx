"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Instagram } from "lucide-react"

interface StatsData {
  events: string
  participants: string
  collaborations: string
  media: string
}

export default function Home() {
  const [stats, setStats] = useState<StatsData>({
    events: "0",         //開催イベント数
    participants: "24",  //参加者数
    collaborations: "0", //コラボレーション実績
    media: "0",          //メディア掲載
  })

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem("activity_stats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <meta name="google-site-verification" content="KBDRGVtJakpozBGKSE9ELjeawwzt0ySBiN6bhEhOqEk" />
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#EEEEFF] rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-1 h-1 bg-[#83CBEB] rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[#EEEEBB] rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#EEEEFF] rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/4 w-1.5 h-1.5 bg-[#83CBEB] rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#EEEEFF] mb-6 text-balance leading-tight">
              宇宙を楽しむ。
            </h1>
            <p className="text-xl md:text-2xl text-[#EEEEFF]/90 mb-12 font-sans leading-relaxed max-w-3xl mx-auto">
              Cosmo Baseは、宇宙に興味を持つすべての人が集い、学び、つながるコミュニティです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium w-full sm:w-auto">
                  コミュニティをのぞいてみる
                </Button>
              </Link>
              <Link href="/value">
                <Button
                  variant="outline"
                  className="border-[#EEEEFF] text-[#EEEEFF] hover:bg-[#EEEEFF]/10 text-lg px-8 py-6 font-sans bg-transparent w-full sm:w-auto"
                >
                  Cosmo Baseについて知る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#000033] to-[#000033]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-12 text-center text-balance">
              Cosmo Baseでできること
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-[#83CBEB]/10 to-[#000033] border-[#83CBEB]/30 rounded-2xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#83CBEB]/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                    📚
                  </div>
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">学ぶ</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                    宇宙の基礎から最先端まで、わかりやすく学べるコンテンツ。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#EEEEBB]/10 to-[#000033] border-[#EEEEBB]/30 rounded-2xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#EEEEBB]/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                    🤝
                  </div>
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">つながる</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                    宇宙が好きな仲間と出会い、対話し、広がるコミュニティ。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#83CBEB]/10 to-[#000033] border-[#83CBEB]/30 rounded-2xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#83CBEB]/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                    🚀
                  </div>
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">体験する</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                    イベント・ワークショップ・プロジェクトで宇宙を実感。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#000033]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-12 text-center text-balance">
              こんな人におすすめ
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#83CBEB]/5 to-transparent border border-[#83CBEB]/30 rounded-xl p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#83CBEB]/20 rounded-full flex items-center justify-center text-lg mt-1">
                  ✓
                </div>
                <p className="text-[#EEEEFF]/90 font-sans leading-relaxed">
                  宇宙が好きだけど、何から学べばいいかわからない人
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#EEEEBB]/5 to-transparent border border-[#EEEEBB]/30 rounded-xl p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#EEEEBB]/20 rounded-full flex items-center justify-center text-lg mt-1">
                  ✓
                </div>
                <p className="text-[#EEEEFF]/90 font-sans leading-relaxed">宇宙・科学・未来にワクワクする人</p>
              </div>

              <div className="bg-gradient-to-br from-[#83CBEB]/5 to-transparent border border-[#83CBEB]/30 rounded-xl p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#83CBEB]/20 rounded-full flex items-center justify-center text-lg mt-1">
                  ✓
                </div>
                <p className="text-[#EEEEFF]/90 font-sans leading-relaxed">同じ興味を持つ仲間とつながりたい人</p>
              </div>

              <div className="bg-gradient-to-br from-[#EEEEBB]/5 to-transparent border border-[#EEEEBB]/30 rounded-xl p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#EEEEBB]/20 rounded-full flex items-center justify-center text-lg mt-1">
                  ✓
                </div>
                <p className="text-[#EEEEFF]/90 font-sans leading-relaxed">新しい学びや体験を探している人</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-gradient-to-b from-[#000033] to-[#000033]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-12 text-center text-balance">
              これまでの活動
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif text-[#83CBEB] mb-3">{stats.events}</div>
                <p className="text-[#EEEEFF]/80 font-sans">開催イベント数</p>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif text-[#83CBEB] mb-3">{stats.participants}</div>
                <p className="text-[#EEEEFF]/80 font-sans">参加者数</p>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif text-[#83CBEB] mb-3">{stats.collaborations}</div>
                <p className="text-[#EEEEFF]/80 font-sans">コラボレーション実績</p>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif text-[#83CBEB] mb-3">{stats.media}</div>
                <p className="text-[#EEEEFF]/80 font-sans">メディア掲載</p>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      <section className="py-20 bg-[#000033]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-12 text-center text-balance">
              提供する価値
            </h2>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">
                    📡
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">
                      自動的に情報が入ってくる仕組み
                    </h3>
                    <p className="text-base md:text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                      毎週のニュースまとめ、企業・団体の最新情報、イベント告知など、
                      Discordに参加するだけで宇宙業界の動きが自動的に手に入ります。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#EEEEBB]/10 to-transparent border-l-4 border-[#EEEEBB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#EEEEBB]/20 rounded-lg flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">相談・質問できる環境</h3>
                    <p className="text-base md:text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                      「こんな質問していいのかな？」そんな不安は不要です。
                      宇宙の専門家や仲間が、あなたの疑問に優しく答えます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#83CBEB]/20 rounded-lg flex items-center justify-center text-2xl">
                    📚
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">資料・ナレッジの蓄積</h3>
                    <p className="text-base md:text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                      一から調べる必要はありません。既にまとまった情報がここにあります。
                      企業情報、技術資料、イベントレポートなど、蓄積されたナレッジにアクセスできます。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/value">
                <Button
                  variant="outline"
                  className="border-[#83CBEB] text-[#83CBEB] hover:bg-[#83CBEB]/10 text-base px-6 py-5 font-sans bg-transparent"
                >
                  詳しく見る →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#000033] to-[#000033]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-6 text-balance">
                パートナー制度について
              </h2>
              <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                Cosmo Baseと一緒に、宇宙の未来を創りませんか
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#83CBEB]/10 via-[#000033] to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 text-center">
              <p className="text-lg md:text-xl text-[#EEEEFF]/90 font-sans leading-relaxed mb-8">
                企業・学生団体・教育機関など、様々な組織がパートナーとして参画いただけます。
              </p>

              <Link href="/partner">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  パートナー制度の詳細を見る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#000033]/80 to-[#000033]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-[#83CBEB]/10 via-[#000033] to-[#EEEEBB]/10 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-[#EEEEFF] mb-4 text-balance">
                宇宙への一歩を、ここから。
              </h2>
              <p className="text-lg md:text-xl text-[#EEEEFF]/80 font-sans mb-8 leading-relaxed">
                Cosmo Baseで、新しい学びとつながりを始めましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {/* ▼ 4/1のオープン以降はこちらを使う（今はコメントアウト） ▼ */}
              {/* <a href="https://discord.gg/xVJDjuGyeM" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium w-full sm:w-auto">
                    今すぐ参加する
                </Button>
              </a>
              */}
                    
                {/* ▼ 3/1〜3/31まではこちらを表示 ▼ */}
                <a href="https://fsifofficial.github.io/CosmoBase/coming-soon" rel="noopener noreferrer">
                  <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium w-full sm:w-auto">
                    今すぐ参加する
                  </Button>
                </a>
                <Link href="/events">
                  <Button variant="outline" className="border-[#EEEEFF] text-[#EEEEFF] hover:bg-[#EEEEFF]/10 text-lg px-8 py-6 font-sans bg-transparent w-full sm:w-auto">
                    最新イベントを見る
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col items-center gap-5 mt-8 mb-8">
                <span className="text-[#EEEEFF]/60 text-sm font-sans tracking-wider">
                  ＼ 最新情報はこちらで発信中！ ／
                </span>
                <div className="flex items-center gap-6">
                  {/* X (Twitter) */}
                  <a href="https://x.com/CosmoBase" target="_blank" rel="noopener noreferrer" className="text-[#EEEEFF]/80 hover:text-white transition-all hover:scale-110">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a href="https://instagram.com/cosmobase.official" target="_blank" rel="noopener noreferrer" className="text-[#EEEEFF]/80 hover:text-white transition-all hover:scale-110">
                    <Instagram className="w-6 h-6" />
                  </a>
    
                  {/* note */}
                  <a href="https://note.com/cosmobase" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-all hover:scale-110 flex items-center">
                    <img src="/CosmoBase/note-logo.svg" alt="note" className="h-8 w-auto" />
                  </a>
                </div>
              </div>
                   
              <div className="pt-6 border-t border-[#83CBEB]/20">
                <p className="text-sm text-[#EEEEFF]/60 font-sans mb-3">お問い合わせ</p>
                <a href="mailto:cosmobase.official@gmail.com" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans">
                  cosmobase.official@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
