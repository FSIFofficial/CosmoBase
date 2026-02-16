import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { getNewsArticles, getNewsArticleById } from "@/lib/news"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Next.js 15/16向けの型定義: paramsはPromiseになります
type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const articles = getNewsArticles()
  return articles.map((article) => ({
    id: article.id.toString(),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 1. URLのIDを取得
  const id = params.id

  // 2. IDを使ってデータを探す（
  const title = `${article.title}` 
  const description = `${article.excerpt}`

  // 3. メタデータを返す
  return {
    title: title, 
    description: description,
    
    // OGPも個別に設定可能
    openGraph: {
      title: title,
      description: description,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  // ★重要: Next.js 16では params を await する必要があります
  const { id } = await params
  
  const articleId = Number(id)
  const article = getNewsArticleById(articleId)
  const allArticles = getNewsArticles();

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/news" className="inline-flex items-center text-[#83CBEB] hover:text-[#83CBEB]/80 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ニュース一覧に戻る
          </Link>

          <div className="mb-8">
            <Badge className="bg-[#83CBEB]/30 text-[#EEEEFF] mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-serif text-[#EEEEFF] mb-4 text-balance">{article.title}</h1>
            <div className="flex items-center gap-2 text-[#EEEEFF]/60">
              <Calendar className="h-4 w-4" />
              <span className="font-sans text-sm">{article.date}</span>
            </div>
          </div>

          {article.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-[#EEEEFF]/90 font-sans leading-relaxed whitespace-pre-wrap" style={{ lineHeight: "1.8" }}>
              {article.content}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-serif text-[#EEEEFF] mb-6">関連記事</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {allArticles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.id}`}
                    className="block bg-[#000033] border border-[#83CBEB]/30 rounded-lg overflow-hidden hover:border-[#83CBEB] transition-colors group"
                  >
                    <div className="p-4">
                      <h4 className="text-lg font-serif text-[#EEEEFF] mb-2 group-hover:text-[#83CBEB] transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[#EEEEFF]/60 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span className="font-sans">{relatedArticle.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
