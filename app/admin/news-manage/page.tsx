"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, Trash2 } from "lucide-react"

const sampleNews = [
  {
    id: "1",
    title: "Cosmo Base コミュニティ正式オープン！",
    category: "コミュニティ",
    tags: ["#コミュニティ", "#開始"],
    published: true,
    date: "2026-01-15",
    content: "Cosmo Baseコミュニティが正式にオープンしました。宇宙を楽しむ全ての方々が集う場所として活動を開始します。",
  },
  {
    id: "2",
    title: "冬の天体観測会を開催しました",
    category: "イベント",
    tags: ["#イベント", "#天体観測"],
    published: true,
    date: "2026-01-20",
    content: "2026年1月20日に冬の天体観測会を開催し、30名以上の参加者とともに冬の星座を観測しました。",
  },
  {
    id: "3",
    title: "新パートナー企業の参画が決定",
    category: "パートナー",
    tags: ["#パートナー", "#企業"],
    published: false,
    date: "2026-01-25",
    content: "宇宙開発関連企業2社が新たにパートナーとして参画することが決定しました。",
  },
]

export default function NewsManagePage() {
  const router = useRouter()
  const [newsList, setNewsList] = useState(sampleNews)
  const [searchTitle, setSearchTitle] = useState("")
  const [searchTag, setSearchTag] = useState("")
  const [editingNews, setEditingNews] = useState<(typeof sampleNews)[0] | null>(null)

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const handleTogglePublish = (id: string) => {
    setNewsList((prev) => prev.map((news) => (news.id === id ? { ...news, published: !news.published } : news)))
  }

  const handleDelete = (id: string) => {
    if (confirm("このニュースを削除してもよろしいですか？")) {
      setNewsList((prev) => prev.filter((news) => news.id !== id))
    }
  }

  const handleSaveEdit = () => {
    if (editingNews) {
      setNewsList((prev) => prev.map((news) => (news.id === editingNews.id ? editingNews : news)))
      setEditingNews(null)
    }
  }

  const filteredNews = newsList.filter((news) => {
    const matchTitle = news.title.toLowerCase().includes(searchTitle.toLowerCase())
    const matchTag = searchTag === "" || news.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase()))
    return matchTitle && matchTag
  })

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              管理画面に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">ニュース管理</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">既存ニュースの編集、掲載制御と削除を行います</p>
        </div>

        <Card className="bg-[#000033] border-[#83CBEB]/30 mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#EEEEFF] flex items-center gap-2">
              <Search className="h-5 w-5" />
              検索フィルター
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchTitle" className="text-[#EEEEFF] font-sans">
                題名で検索
              </Label>
              <Input
                id="searchTitle"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                placeholder="例: コミュニティ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchTag" className="text-[#EEEEFF] font-sans">
                ハッシュタグで検索
              </Label>
              <Input
                id="searchTag"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                placeholder="例: イベント"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {filteredNews.map((news) => (
            <Card key={news.id} className="bg-[#000033] border-[#83CBEB]/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="flex-1 min-w-0 cursor-pointer hover:bg-[#83CBEB]/5 p-2 rounded transition-colors"
                    onClick={() => setEditingNews(news)}
                  >
                    <h3 className="text-lg font-serif text-[#EEEEFF] mb-1 truncate">{news.title}</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge variant="outline" className="border-[#83CBEB] text-[#83CBEB] font-sans">
                        {news.category}
                      </Badge>
                      {news.tags.map((tag) => (
                        <span key={tag} className="text-xs text-[#EEEEFF]/60 font-sans">
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-[#EEEEFF]/40 font-sans">{news.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#EEEEFF]/60 font-sans whitespace-nowrap">
                        {news.published ? "HP掲載中" : "非掲載"}
                      </span>
                      <Switch
                        checked={news.published}
                        onCheckedChange={() => handleTogglePublish(news.id)}
                        className="data-[state=checked]:bg-[#83CBEB]"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(news.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!editingNews} onOpenChange={() => setEditingNews(null)}>
          <DialogContent className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#EEEEFF]">ニュース記事の編集</DialogTitle>
            </DialogHeader>
            {editingNews && (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">タイトル</Label>
                  <Input
                    value={editingNews.title}
                    onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">カテゴリ</Label>
                  <Input
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">本文</Label>
                  <Textarea
                    value={editingNews.content}
                    onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[300px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setEditingNews(null)}
                    variant="outline"
                    className="border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  >
                    キャンセル
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans"
                  >
                    保存
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#EEEEFF]/60 font-sans">検索条件に一致するニュースが見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  )
}
