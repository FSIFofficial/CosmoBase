import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { getNewsArticles } from "@/lib/news"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ニュース", 
  description: "Cosmo Baseの最新情報やイベントレポートをお届けします。",
    // OGPも個別で上書き
  openGraph: {
    title: "ニュース | Cosmo Base",
    description: "Cosmo Baseの最新情報やイベントレポートをお届けします。",
  },
}

export default function NewsPage() {
  // データを取得
  const newsArticles = getNewsArticles();
  
  // 日付順に並び替え（新しい順）
  const sortedArticles = [...newsArticles].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredNews = sortedArticles.find((article) => article.featured)
  const regularNews = sortedArticles.filter((article) => !article.featured)

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
            <Link href={`/news/${featuredNews.id}`} className="block bg-[#000033] border border-[#83CBEB]/30 rounded-lg overflow-hidden hover:border-[#83CBEB] transition-colors group">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image src={featuredNews.image || "/placeholder.svg"} alt={featuredNews.title} width={600} height={400} className="w-full h-64 md:h-full object-cover"/>
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
                  <div className="text-[#EEEEFF]/80 font-sans leading-relaxed mb-4　[&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 space-y-4" dangerouslySetInnerHTML={{ __html: featuredNews.excerpt }} />
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
              <Link key={article.id} href={`/news/${article.id}`} className="block bg-[#000033] border border-[#83CBEB]/30 rounded-lg overflow-hidden hover:border-[#83CBEB] transition-colors group">
                {article.image && (
                  <Image src={article.image} alt={article.title} width={400} height={300} className="w-full h-48 object-cover"/>
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
                  <div className="text-[#EEEEFF]/80 font-sans text-sm leading-relaxed mb-4　[&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 space-y-4" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
                  <div className="flex items-center gap-2 text-[#83CBEB] font-sans text-sm">
                    続きを読む
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
