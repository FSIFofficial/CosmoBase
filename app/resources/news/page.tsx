import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "週刊宇宙ニュースまとめ| 資料館", 
  description: "その週の宇宙ニュースをスライドにまとめて配信しています。",
    // OGPも個別で上書き
  openGraph: {
    title: "週刊宇宙ニュースまとめ | 資料館 | Cosmo Base",
    description: "その週の宇宙ニュースをスライドにまとめて配信しています。",
  },
}

export default function WeeklyNewsPage() {
  return (
    <div className="min-h-screen bg-[#000033] text-[#EEEEFF]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 戻るボタン */}
            <Link
              href="/resources"
              className="inline-flex items-center text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans text-sm mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              資料館一覧に戻る
            </Link>

            {/* 記事ヘッダー */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-balance">
                週刊宇宙ニュースまとめ
              </h1>
              <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                初心者でもわかる、人類の宇宙進出とビジネスの最前線。<br />
                その週の宇宙ニュースをスライドにまとめて配信しています。
              </p>
            </div>

            {/* コンテンツプレビュー（チラ見せ部分） */}
            <div className="bg-gradient-to-br from-[#EEEEBB]/10 to-[#83CBEB]/5 border border-[#EEEEBB]/30 rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-serif text-[#EEEEFF] mb-6 border-b border-[#EEEEFF]/20 pb-2">
                ハイライト
              </h2>

              <div className="space-y-8">
                {/* トピック1 */}
                <div>
                  <h3 className="text-lg font-bold text-[#83CBEB] mb-2">油井宇宙飛行士、無事帰還</h3>
                  <p className="text-[#EEEEFF]/70 text-sm leading-relaxed">
                    JAXA油井亀美也宇宙飛行士ら「Crew-11」が地球に帰還しました。
                    チームの医療的事情により予定を早めましたが、全員無事です。
                    来年は諏訪理宇宙飛行士の初飛行も控えており、日本人の活躍が続きます。
                  </p>
                </div>

                {/* トピック2 */}
                <div>
                  <h3 className="text-lg font-bold text-[#83CBEB] mb-2">アルテミスIIロケット、発射台へ</h3>
                  <p className="text-[#EEEEFF]/70 text-sm leading-relaxed">
                    有人月探査に向け、NASAの巨大ロケット「SLS」が移動を開始。
                    2026年2月の打ち上げに向け、いよいよカウントダウンが始まりました。
                  </p>
                </div>

                {/* トピック3 */}
                <div>
                  <h3 className="text-lg font-bold text-[#83CBEB] mb-2">日本の宇宙ベンチャーに巨額投資</h3>
                  <p className="text-[#EEEEFF]/70 text-sm leading-relaxed">
                    北海道のインターステラテクノロジズ等が総額200億円を超える資金調達を実施。
                    国産ロケットや衛星開発など、日本の宇宙ビジネスが加速しています。
                  </p>
                </div>
              </div>
            </div>

            {/* ロック部分（会員限定への誘導） */}
            <div className="bg-[#000033]/80 border border-[#83CBEB]/30 rounded-2xl p-10 text-center relative overflow-hidden group">
              {/* 背景の装飾（ぼかし） */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000033] opacity-80 z-10" />
              <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none z-0">
                <p>詳細なレポートテキスト...</p>
                <p>ロケット打ち上げ成功率の分析データ...</p>
                <p>最新の天体観測画像ギャラリー...</p>
              </div>

              <div className="relative z-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EEEEBB]/10 rounded-full mb-6 text-[#EEEEBB]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">
                  ここから先はコミュニティ限定です
                </h3>
                <p className="text-[#EEEEFF]/70 mb-8 max-w-lg mx-auto">
                  「ロケット打ち上げレポート」や「最新の宇宙画像」など、<br/>
                  詳細なニュース解説はCosmo Baseコミュニティ内で公開しています。
                </p>
                
                <Link href="/join">
                  <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-bold shadow-lg shadow-[#83CBEB]/20">
                    コミュニティに参加して続きを読む
                  </Button>
                </Link>
                <p className="mt-4 text-xs text-[#EEEEFF]/40">
                  ※Discordコミュニティへの参加は無料です
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )

}
