import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, ArrowLeft } from "lucide-react"

// 資料データの型定義
type Resource = {
  id: number
  title: string
  description: string
  target: string
  time: string
  tag: string
  link: string
}

// 画像に基づいたモックデータ
const resources: Resource[] = [
  {
    id: 1,
    title: "火星への旅 宇宙法とは",
    description: "事故や資源開発など、みんなが宇宙で仲良く過ごすための法律を優しく解説します。",
    target: "宇宙のきまりを知りたい人",
    time: "10分",
    tag: "職業別",
    link: "/resources/space-law"
  },
  {
    id: 2,
    title: "火星への旅 医療従事者と宇宙",
    description: "宇宙での治療や専門医の役割、無重力が体に与える影響について案内します。",
    target: "医療や健康に関心がある人",
    time: "15分",
    tag: "職業別",
    link: "/resources/medical"
  },
  {
    id: 3,
    title: "火星への旅 科学者と宇宙",
    description: "物理や生物の視点から、宇宙ステーションで行われているワクワクする実験を紹介します。",
    target: "実験や研究に興味がある人",
    time: "10分",
    tag: "職業別",
    link: "/resources/scientist"
  },
  {
    id: 4,
    title: "火星への旅 エンジニアと宇宙",
    description: "火星旅行を支える設計の役割や、宇宙ならではの難しい条件が分かります。",
    target: "宇宙開発に興味がある人",
    time: "10分",
    tag: "職業別",
    link: "/resources/engineer"
  },
  {
    id: 5,
    title: "趣味×宇宙 火星資料",
    description: "地球と似ている？全然ちがう？火星の不思議な気候や重力が分かります。",
    target: "火星の暮らしを知りたい人",
    time: "10分",
    tag: "初心者向け",
    link: "/resources/mars-hobby"
  },
  {
    id: 6,
    title: "趣味×宇宙 月面調査",
    description: "月の温度や砂の正体、将来の月面基地に向けた面白い工夫をのぞいてみましょう。",
    target: "月に興味がある人",
    time: "10分",
    tag: "初心者向け",
    link: "/resources/moon-survey"
  },
  {
    id: 7,
    title: "趣味×宇宙 宇宙ステーション",
    description: "宇宙ステーションでの暮らしや、これからの民間旅行の展望について案内します。",
    target: "宇宙旅行を夢見る人",
    time: "10分",
    tag: "概要",
    link: "/resources/iss"
  },
  {
    id: 8,
    title: "趣味×宇宙 参考資料",
    description: "無重力や温度差、打ち上げコストなど、宇宙へ行くための基本をまとめました。",
    target: "宇宙の環境を詳しく知りたい人",
    time: "15分",
    tag: "初心者向け",
    link: "/resources/basic-ref"
  },
  {
    id: 9,
    title: "趣味×宇宙 課題例",
    description: "技術的な問題から文化の違いまで、宇宙進出のために乗り越えるべき課題を紹介します。",
    target: "宇宙の課題を知りたい人",
    time: "5分",
    tag: "入門",
    link: "/resources/challenges"
  },
]

export default function EventResourcesPage() {
  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        
        {/* 戻るボタン */}
        <div className="max-w-7xl mx-auto mb-8">
          <Link
            href="/resources"
            className="inline-flex items-center text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans text-sm transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            資料館一覧に戻る
          </Link>
        </div>

        {/* ページヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#EEEEFF] mb-6">イベント資料</h1>
          <p className="text-[#83CBEB] text-lg font-sans">
            ワークショップ開催時に使用した資料を公開しています。
          </p>
        </div>

        {/* リソースグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {resources.map((resource) => (
            <div 
              key={resource.id} 
              className="bg-[#EEEEFF] rounded-lg p-6 md:p-8 flex flex-col relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* 右上のタグ */}
              <span className="absolute top-0 right-0 bg-[#83CBEB] text-[#000033] text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                {resource.tag}
              </span>

              {/* タイトル（色分け処理） */}
              <h3 className="text-xl font-bold text-[#000033] mt-4 mb-4 font-serif tracking-wide leading-tight">
                {resource.title.startsWith("火星への旅") ? (
                  <>
                    <span className="text-[#e5494a]">火星への旅</span>
                    {resource.title.replace("火星への旅", "")}
                  </>
                ) : resource.title.startsWith("趣味×宇宙") ? (
                  <>
                    <span className="text-[#0b3b1e]">趣味×宇宙</span>
                    {resource.title.replace("趣味×宇宙", "")}
                  </>
                ) : (
                  resource.title
                )}
              </h3>

              {/* 説明文 */}
              <p className="text-[#000033]/80 text-sm mb-6 flex-grow leading-relaxed font-sans">
                {resource.description}
              </p>

              {/* メタ情報（対象・目安） */}
              <div className="space-y-1.5 mb-8 text-sm text-[#000033]/70 font-sans">
                <div className="flex gap-2">
                  <span className="font-bold min-w-[3em]">対象：</span>
                  <span>{resource.target}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold min-w-[3em]">目安：</span>
                  <span>{resource.time}</span>
                </div>
              </div>

              {/* リンクボタン */}
              <div className="text-right mt-auto border-t border-[#000033]/10 pt-4">
                <Link 
                  href={resource.link} 
                  className="inline-flex items-center text-[#000033] font-bold text-sm hover:text-[#000033]/70 transition-colors gap-1 group-hover:translate-x-1 duration-300"
                >
                  資料を見る <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}