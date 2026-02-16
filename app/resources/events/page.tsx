import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock, Calendar, MapPin, Camera, FileText } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "イベント・展示会レポート | 資料館", 
  description: "国内外の宇宙関連イベント、展示会の参加レポートと取材記事。",
    // OGPも個別で上書き
  openGraph: {
    title: "イベント・展示会レポート | 資料館 | Cosmo Base",
    description: "国内外の宇宙関連イベント、展示会の参加レポートと取材記事。",
  },
}

export default function EventReportPage() {
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
                イベント・展示会レポート
              </h1>
              <p className="text-lg text-[#EEEEFF]/80 font-sans leading-relaxed">
                国内外の宇宙関連イベント、展示会の参加レポートと取材記事。<br />
                現地の熱気や最新技術の動向を、写真と詳細な解説でお届けします。
              </p>
            </div>

            {/* コンテンツプレビュー（チラ見せ部分） */}
            <div className="bg-gradient-to-br from-[#EEEEBB]/10 to-[#83CBEB]/5 border border-[#EEEEBB]/30 rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-serif text-[#EEEEFF] mb-6 border-b border-[#EEEEFF]/20 pb-2">
                最新のレポート（概要プレビュー）
              </h2>

              <div className="space-y-8">
                {/* レポート1 */}
                <div>
                  <div className="flex items-center gap-2 text-[#83CBEB] mb-2 text-sm font-bold">
                    <Calendar className="w-4 h-4" /> 2026.01.28-30
                    <span className="text-[#EEEEFF]/40">|</span>
                    <MapPin className="w-4 h-4" /> 東京ビッグサイト
                  </div>
                  <h3 className="text-lg font-bold text-[#EEEEBB] mb-2">国際宇宙産業展 2026 参加レポート</h3>
                  <p className="text-[#EEEEFF]/70 text-sm leading-relaxed">
                    過去最大規模で開催された今年の宇宙産業展。
                    特に注目を集めたのは「月面開発向け建機」と「超小型衛星コンステレーション」のエリアでした。
                    大手ゼネコンと宇宙ベンチャーの協業事例が増えており、実用化に向けたフェーズに入ったことを実感させます。
                  </p>
                </div>

                {/* レポート2 */}
                <div>
                  <div className="flex items-center gap-2 text-[#83CBEB] mb-2 text-sm font-bold">
                    <Calendar className="w-4 h-4" /> 2026.02.05
                    <span className="text-[#EEEEFF]/40">|</span>
                    <MapPin className="w-4 h-4" /> アニヴェルセルみなとみらい横浜
                  </div>
                  <h3 className="text-lg font-bold text-[#EEEEBB] mb-2">神奈川宇宙サミット</h3>
                  <p className="text-[#EEEEFF]/70 text-sm leading-relaxed">
                    神奈川県初の大規模宇宙ビジネスカンファレンスをレポート。
                    有人宇宙探査の最前線から、衛星データの活用、宇宙でのサステナビリティまで、全11セッションを網羅。
                    三菱電機の新拠点構想など、地方創生とハイテク産業が融合する「宇宙県かながわ」の全貌が見えてきました。
                  </p>
                </div>
              </div>
            </div>

            {/* ロック部分（会員限定への誘導） */}
            <div className="bg-[#000033]/80 border border-[#83CBEB]/30 rounded-2xl p-10 text-center relative overflow-hidden group">
              {/* 背景の装飾（ぼかし） */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000033] opacity-80 z-10" />
              <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none z-0 text-left p-8 font-sans">
                 <p>展示ブースの技術解説詳細...</p>
                 <p>登壇者への独自インタビュー内容...</p>
                 <p>会場限定配布の資料データ...</p>
                 <p>高解像度フォトギャラリー...</p>
              </div>

              <div className="relative z-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EEEEBB]/10 rounded-full mb-6 text-[#EEEEBB]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">
                  詳細レポート・写真はコミュニティ限定です
                </h3>
                <p className="text-[#EEEEFF]/70 mb-8 max-w-lg mx-auto">
                  現地の様子を撮影した「高解像度フォトギャラリー」や、
                  出展企業への「独自インタビュー記事」、会場で入手した「配布資料の解説」などは
                  Cosmo Baseコミュニティ内でフル公開しています。
                </p>
                
                <Link href="/join">
                  <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-bold shadow-lg shadow-[#83CBEB]/20">
                    コミュニティに参加してレポートを読む
                  </Button>
                </Link>
                
                <div className="mt-6 flex justify-center gap-6 text-xs text-[#EEEEFF]/40 font-sans">
                  <span className="flex items-center gap-1"><Camera className="w-3 h-3"/> フォトギャラリーあり</span>
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> 限定インタビューあり</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )

}
