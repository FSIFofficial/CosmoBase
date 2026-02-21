import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "コミュニティーへの参加方法", 
  description: "Cosmo Baseへの参加はこちらから",
    // OGPも個別で上書き
  openGraph: {
    title: "コミュニティーへの参加方法 | Cosmo Base",
    description: "Cosmo Baseへの参加はこちらから",
  },
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">
                コミュニティーへの参加方法
              </h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                3つのステップで、すぐに宇宙コミュニティーの一員に
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-gradient-to-r from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#83CBEB]/20 rounded-full flex items-center justify-center text-2xl font-serif text-[#EEEEFF]">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">Discordアカウントを作成する</h3>
                    <p className="text-[#EEEEFF]/80 font-sans leading-relaxed mb-4">
                      まだDiscordアカウントをお持ちでない方は、Discord公式サイトから無料でアカウントを作成してください。
                      すでにアカウントをお持ちの方は、このステップはスキップできます。
                    </p>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans text-sm"
                    >
                      Discord公式サイト →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#EEEEBB]/10 to-transparent border-l-4 border-[#EEEEBB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#EEEEBB]/20 rounded-full flex items-center justify-center text-2xl font-serif text-[#EEEEFF]">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">招待リンクから参加する</h3>
                    <p className="text-[#EEEEFF]/80 font-sans leading-relaxed mb-4">
                      下のボタンをクリックして、Cosmo
                      BaseのDiscordサーバーに参加してください。簡単な参加ルールに同意するだけで、すぐにコミュニティーに入れます。
                    </p>
                    {/* ▼ 4/1のオープン以降はこちらを使う（今はコメントアウト） ▼ */}
                      {/* <a href="https://discord.gg/xVJDjuGyeM" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#EEEEBB] text-[#000033] hover:bg-[#EEEEBB]/90 text-base px-6 py-5 font-sans font-medium"> 
                        Discordに参加する
                      </Button>
                     </a>
                      */}
                    
                    {/* ▼ 3/1〜3/31まではこちらを表示 ▼ */}
                    <a href="/coming-soon" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#EEEEBB] text-[#000033] hover:bg-[#EEEEBB]/90 text-base px-6 py-5 font-sans font-medium">
                        Discordに参加する
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#83CBEB]/10 to-transparent border-l-4 border-[#83CBEB] rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#83CBEB]/20 rounded-full flex items-center justify-center text-2xl font-serif text-[#EEEEFF]">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-[#EEEEFF] mb-3">自己紹介して交流を始める</h3>
                    <p className="text-[#EEEEFF]/80 font-sans leading-relaxed mb-4">
                      参加したら、まずは自己紹介チャンネルで簡単に自己紹介をしてみましょう。興味のあるチャンネルを覗いて、気になる話題に参加してください。
                      最初は見ているだけでもOKです。
                    </p>
                    <ul className="space-y-2 text-[#EEEEFF]/70 font-sans text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>#自己紹介 で挨拶してみよう</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>#雑談 で気軽に会話を楽しもう</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#83CBEB] mt-1">•</span>
                        <span>#質問部屋で疑問を解決しよう</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-6 text-center">参加後にできること</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#83CBEB]/5 to-transparent rounded-lg p-6">
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">資料館にアクセス</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    限定公開の資料や企業情報にアクセスできます
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#EEEEBB]/5 to-transparent rounded-lg p-6">
                  <div className="text-3xl mb-3">🎤</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">イベントに参加</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    トークセッションやワークショップに参加
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#83CBEB]/5 to-transparent rounded-lg p-6">
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">専門家に質問</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                    宇宙の専門家に直接質問できる環境
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#EEEEBB]/5 to-transparent rounded-lg p-6">
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">仲間と出会う</h3>
                  <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">同じ興味を持つ仲間とつながれる</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#83CBEB]/10 to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">準備はできましたか？</h3>
              <p className="text-[#EEEEFF]/70 font-sans mb-6 leading-relaxed">
                今すぐDiscordに参加して、宇宙コミュニティーの一員になりましょう
              </p>
              
              {/* ▼ 4/1のオープン以降はこちらを使う（今はコメントアウト） ▼ */}
                {/* <a href="https://discord.gg/xVJDjuGyeM" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  Discordコミュニティーに参加する
                </Button>
              </a>
              */}
                    
              {/* ▼ 3/1〜3/31まではこちらを表示 ▼ */}
              <a href="/coming-soon" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  Discordコミュニティーに参加する
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
