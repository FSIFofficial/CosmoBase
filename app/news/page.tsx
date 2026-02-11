"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// ニュース記事の型定義
type NewsArticle = {
  id: number
  title: string
  date: string
  category: "お知らせ" | "イベントレポート" | "メンバー紹介" | "コラム" | "パートナー情報"
  excerpt: string
  image?: string
  featured?: boolean
}

// サンプルニュースデータ
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Cosmo Base コミュニティ正式オープンのお知らせ",
    date: "2025-01-04",
    category: "お知らせ",
    excerpt:
      "「宇宙を楽しむ」をテーマに、初心者から専門家まで誰もが宇宙に触れられるコミュニティ「Cosmo Base」が正式にオープンしました。Discordを中心としたオンラインコミュニティで、気軽に質問したり、宇宙好きと交流できます。まずは観測会や講演会への参加から始めてみませんか？",
    image: "/space-community-launch.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "【イベントレポート】冬の星座観測会 - 50名が参加",
    date: "2025-01-03",
    category: "イベントレポート",
    excerpt:
      "12月23日に多摩地域で開催した冬の星座観測会のレポートです。初心者から経験者まで50名が参加し、オリオン座やプレアデス星団を観測しました。「初めて土星の環を見た」「星雲の美しさに感動した」など、参加者から多くの声をいただきました。次回は2月に春の銀河観測会を予定しています。",
    image: "/stargazing-winter-constellation.jpg",
  },
  {
    id: 3,
    title: "新パートナー団体のご紹介 - 宇宙教育NPO「スターキッズ」",
    date: "2025-01-02",
    category: "パートナー情報",
    excerpt:
      "子どもたちへの宇宙教育に力を入れる NPO法人「スターキッズ」がCosmo Baseのパートナーに加わりました。今後、親子で楽しめる観測会やワークショップを共同開催予定です。宇宙を次世代につなぐ活動を一緒に盛り上げていきます。",
  },
  {
    id: 4,
    title: "【メンバー紹介】天体物理学者・山田太郎さん「宇宙の謎を一緒に解き明かしましょう」",
    date: "2024-12-28",
    category: "メンバー紹介",
    excerpt:
      "Cosmo Baseのコアメンバーである天体物理学者・山田太郎さんにインタビュー。「専門的な知識がなくても、疑問に思ったことを気軽に質問してほしい」と語る山田さん。ブラックホールの研究をしながら、一般向けの講演活動にも力を入れています。コミュニティでは「宇宙の不思議Q&A」コーナーを担当予定。",
    image: "/astronomer-portrait.jpg",
  },
  {
    id: 5,
    title: "【コラム】2025年注目の宇宙イベント - 皆既月食から火星探査まで",
    date: "2024-12-25",
    category: "コラム",
    excerpt:
      "2025年は宇宙ファンにとって見逃せないイベントが目白押し！3月の皆既月食、8月のペルセウス座流星群、そしてNASAの火星サンプルリターン計画の進展など、天文イベントから宇宙開発まで注目トピックをまとめました。Cosmo Baseでは各イベントに合わせた観測会や解説セッションを企画中です。",
  },
  {
    id: 6,
    title: "1月のオンライン講演スケジュール公開 - 初心者向けから専門的な内容まで",
    date: "2024-12-20",
    category: "お知らせ",
    excerpt:
      "2025年1月開催予定のオンライン講演・イベント情報を公開しました。「初心者のための宇宙観測入門」「ロケット開発最前線」「月面探査の最新動向」など、幅広いテーマを用意。すべてオンラインで参加可能、録画視聴もできます。コミュニティメンバーは無料で参加できます。",
  },
  {
    id: 7,
    title: "【イベントレポート】種子島ロケット打ち上げ見学ツアー実施レポート",
    date: "2024-12-15",
    category: "イベントレポート",
    excerpt:
      "11月に開催した種子島宇宙センターでのロケット打ち上げ見学ツアーの様子をレポート。参加者20名が実際の打ち上げを見学し、轟音とともに空へ昇るロケットの迫力に圧倒されました。「映像で見るのとは全く違う感動」「宇宙開発の現場を肌で感じられた」など、参加者の興奮が伝わってきました。次回ツアーは2025年春予定。",
    image: "/rocket-launch-viewing.jpg",
  },
  {
    id: 8,
    title: "【コラム】宇宙開発の歴史を振り返る Vol.1 - 人類初の宇宙飛行から現代まで",
    date: "2024-12-10",
    category: "コラム",
    excerpt:
      "1961年のガガーリンによる人類初の宇宙飛行から60年以上。冷戦期の米ソ宇宙競争、スペースシャトル時代、国際宇宙ステーションの建設、そして民間企業による宇宙開発の時代へ。宇宙開発の歴史を5回シリーズで振り返ります。第1回は「宇宙時代の幕開け」をテーマに、初期の宇宙開発を解説します。",
  },
  {
    id: 9,
    title: "コミュニティ資料館に新コンテンツ追加 - 宇宙ビジネス最新動向レポート",
    date: "2024-12-05",
    category: "お知らせ",
    excerpt:
      "Cosmo Base資料館に、パートナー企業提供の「宇宙ビジネス最新動向レポート2024」を追加しました。衛星データビジネス、宇宙旅行、月面開発など、急成長する宇宙産業の最新情報を網羅。コミュニティメンバーは無料で閲覧できます。",
  },
  {
    id: 10,
    title: "【パートナー情報】スペーステクノロジー社との共同イベント開催決定",
    date: "2024-12-01",
    category: "パートナー情報",
    excerpt:
      "パートナー企業であるスペーステクノロジー株式会社と共同で、2025年2月に「ロケット技術の最前線」をテーマにしたハイブリッドイベントを開催します。現役エンジニアによる技術解説とワークショップを予定。オンライン・オフライン両方で参加可能です。",
  },
]

export default function NewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const featuredNews = newsArticles.find((article) => article.featured)
  const regularNews = newsArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#EEEEFF] mb-4">ニュース</h1>
          <p className="text-[#83CBEB] text-lg font-sans">Cosmo Baseの最新情報やイベントレポートをお届けします</p>
        </div>

        {/* 注目記事 */}
        {featuredNews && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-[#EEEEFF] mb-6">注目の記事</h2>
            <Link
              href={`/news/${featuredNews.id}`}
              className="block bg-[#000033] border border-[#83CBEB]/30 rounded-lg overflow-hidden hover:border-[#83CBEB] transition-colors group"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredNews.image || "/placeholder.svg"}
                    alt={featuredNews.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-[#83CBEB]/30 text-[#EEEEFF] mb-4">{featuredNews.category}</Badge>
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4 group-hover:text-[#83CBEB] transition-colors">
                    {featuredNews.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#EEEEFF]/60 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span className="font-sans text-sm">{featuredNews.date}</span>
                  </div>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed mb-4">{featuredNews.excerpt}</p>
                  <div className="flex items-center gap-2 text-[#83CBEB] font-sans">
                    記事を読む
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 記事一覧 */}
        <div>
          <h2 className="text-2xl font-serif text-[#EEEEFF] mb-6">最新記事</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="block bg-[#000033] border border-[#83CBEB]/30 rounded-lg overflow-hidden hover:border-[#83CBEB] transition-colors group"
              >
                {article.image && (
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <Badge className="bg-[#83CBEB]/30 text-[#EEEEFF] mb-3">{article.category}</Badge>
                  <h3 className="text-xl font-serif text-[#EEEEFF] mb-3 group-hover:text-[#83CBEB] transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#EEEEFF]/60 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="font-sans text-sm">{article.date}</span>
                  </div>
                  <p className="text-[#EEEEFF]/80 font-sans text-sm leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-[#83CBEB] font-sans text-sm">
                    続きを読む
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ページネーション */}
        <div className="flex justify-center gap-2 mt-12">
          <Button variant="outline" className="border-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/10 bg-transparent">
            前へ
          </Button>
          <Button className="bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033]">1</Button>
          <Button variant="outline" className="border-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/10 bg-transparent">
            2
          </Button>
          <Button variant="outline" className="border-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/10 bg-transparent">
            3
          </Button>
          <Button variant="outline" className="border-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/10 bg-transparent">
            次へ
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
