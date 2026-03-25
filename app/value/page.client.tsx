"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ValuePageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* ▼ ページヘッダー ▼ */}
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">
                Cosmo Baseのサービス
              </h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed max-w-3xl mx-auto">
                宇宙に対する関心度に合わせて設計された<br className="hidden md:block" />
                4つのレベルのコンテンツを提供し、継続的な接点を創出します。
              </p>
            </div>

            {/* ▼ Level 1 (Color: #83CBEB - 水色) ▼ */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#83CBEB] text-[#000033] font-bold px-4 py-2 rounded-lg text-xl font-sans">Level 1</div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF]">習慣化・体験</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-xl p-6 hover:border-[#83CBEB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBquiz_logo.png" alt="毎日宇宙クイズ" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">毎日宇宙クイズ</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    毎日、宇宙に関するクイズをSNS等で発信中。宇宙に関わる第一歩としてボタン1つで気軽に参加でき、Space Voyager検定にも繋がります。
                  </p>
                </div>
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-xl p-6 hover:border-[#83CBEB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBnews_logo.png" alt="週刊宇宙ニュース" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">週刊宇宙ニュース</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    毎週、宇宙に関するニュースをスライドにまとめて発信。初心者向けから中級・上級向けまで、メディア事業へと繋がるコンテンツです。
                  </p>
                </div>
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-xl p-6 hover:border-[#83CBEB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBtype_logo.png" alt="宇宙診断" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">宇宙診断</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    簡単な問題に回答することで自分のタイプが分かるコンテンツ。簡易版から、コミュニティー参加者が体験できる本格版まで準備しています。
                  </p>
                </div>
              </div>
            </div>

            {/* ▼ Level 2 (Color: #A6D7DB - 少し緑がかった水色) ▼ */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#A6D7DB] text-[#000033] font-bold px-4 py-2 rounded-lg text-xl font-sans">Level 2</div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF]">対話・学習</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#000033]/60 border border-[#A6D7DB]/20 rounded-xl p-6 hover:border-[#A6D7DB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBshittoku_logo.png" alt="Cosmo Baseで宇宙知っトク" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">Cosmo Baseで宇宙知っトク</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    毎週水曜日19:00から座談会や講座、トークセッションなどオンラインイベントを開催。出張版としてオフラインイベントも予定しています。
                  </p>
                </div>
                <div className="bg-[#000033]/60 border border-[#A6D7DB]/20 rounded-xl p-6 hover:border-[#A6D7DB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBoshiete_logo.png" alt="Cosmo Baseで宇宙教えて" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">Cosmo Baseで宇宙教えて</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    宇宙に関する質問をいつでもできるチャンネル。生成AIを用いた即時回答の仕組みと、コミュニケーションを円滑にする環境を整えます。
                  </p>
                </div>
                <div className="bg-[#000033]/60 border border-[#A6D7DB]/20 rounded-xl p-6 hover:border-[#A6D7DB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBittoide_logo.png" alt="宇宙に行っといで" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">宇宙に行っといで</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    運営がおすすめする宇宙に関するイベントを紹介。レベル別に分かれた情報で、次につながるきっかけやパートナーとの連携を創出します。
                  </p>
                </div>
              </div>
            </div>

            {/* ▼ Level 3 (Color: #C9E3CC - 淡い黄緑色) ▼ */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#C9E3CC] text-[#000033] font-bold px-4 py-2 rounded-lg text-xl font-sans">Level 3</div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF]">現実世界との接続</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#000033]/60 border border-[#C9E3CC]/20 rounded-xl p-6 hover:border-[#C9E3CC]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBED_logo.png" alt="Cosmo Base Event Database" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">Cosmo Base Event Database</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    全国で開催される宇宙に関するイベント一覧をカレンダー形式で公開。今後は検索性の向上など、データベースとしてさらに機能拡張していきます。
                  </p>
                </div>
                <div className="bg-[#000033]/60 border border-[#C9E3CC]/20 rounded-xl p-6 hover:border-[#C9E3CC]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBittekita_logo.png" alt="宇宙のイベント行ってきた" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">宇宙のイベント行ってきた</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    運営メンバーが実際に宇宙に関するイベントへ参加した際に、その様子をイベントレポートとして不定期に配信・公開するコンテンツです。
                  </p>
                </div>
              </div>
            </div>

            {/* ▼ Level 4 (Color: #EEEEBB - 淡い黄色) ▼ */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#EEEEBB] text-[#000033] font-bold px-4 py-2 rounded-lg text-xl font-sans">Level 4</div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF]">知識の体系化</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#000033]/60 border border-[#EEEEBB]/20 rounded-xl p-6 hover:border-[#EEEEBB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBL_logo.png" alt="Cosmo Base Library" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">Cosmo Base Library</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    コミュニティー内で公開された資料や収集した情報を格納するデータベース。パートナー企業・団体様もここへ資料のアップロードが可能です。
                  </p>
                </div>
                <div className="bg-[#000033]/60 border border-[#EEEEBB]/20 rounded-xl p-6 hover:border-[#EEEEBB]/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center mb-4 h-12">
                    <img src="/CosmoBase/CBvoyager_logo.png" alt="Space Voyager 検定" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3">Space Voyager 検定</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    参加者の学習意欲向上やレベル確認に利用できる検定制度。コミュニティーでの権限が増える「Space Navigator」認定なども行っています。
                  </p>
                </div>
              </div>
            </div>

            {/* ▼ 最後のメッセージ ▼ */}
            <div className="mt-16 p-8 bg-gradient-to-r from-[#83CBEB]/10 via-[#C9E3CC]/10 to-[#EEEEBB]/10 border border-[#83CBEB]/30 rounded-2xl text-center">
              <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">増え続けるコンテンツ</h3>
              <p className="text-[#EEEEFF]/80 font-sans leading-relaxed max-w-3xl mx-auto mb-8">
                Cosmo Baseでは様々な接点を生むことを目的に、毎月1つ以上の新しいコンテンツをリリースし、継続した接点を創出し続けます。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                          {/* ▼ 3/1〜3/31まではこちらを表示 ▼ */}
              <a href="https://fsifofficial.github.io/CosmoBase/coming-soon" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  コミュニティーに参加する
                </Button>
              </a>
                 {/* ▼ 4/1のオープン以降はこちらを使う（今はコメントアウト） ▼ */}
                {/* <a href="https://discord.gg/xVJDjuGyeM" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  コミュニティーに参加する
                </Button>
              </a>
              */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
