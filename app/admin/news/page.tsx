"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Tag, Plus } from "lucide-react"

export default function AdminNewsPage() {
  const router = useRouter()
  const [hashtags, setHashtags] = useState(["速報", "イベント", "技術", "パートナー", "コミュニティ", "宇宙開発"])
  const [newHashtag, setNewHashtag] = useState("")
  const [showHashtagForm, setShowHashtagForm] = useState(false)

  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "community",
    thumbnail: "",
    content: "",
    hashtags: [] as string[],
  })

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag])
      setNewHashtag("")
      setShowHashtagForm(false)
    }
  }

  const toggleHashtagSelection = (hashtag: string) => {
    if (newsForm.hashtags.includes(hashtag)) {
      setNewsForm({
        ...newsForm,
        hashtags: newsForm.hashtags.filter((h) => h !== hashtag),
      })
    } else {
      setNewsForm({
        ...newsForm,
        hashtags: [...newsForm.hashtags, hashtag],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] ニュース公開:", newsForm)
    alert("ニュースが公開されました")
    setNewsForm({
      title: "",
      category: "community",
      thumbnail: "",
      content: "",
      hashtags: [],
    })
  }

  const categories = [
    { value: "community", label: "コミュニティ" },
    { value: "event", label: "イベント" },
    { value: "technology", label: "技術" },
    { value: "partner", label: "パートナー" },
    { value: "space", label: "宇宙ニュース" },
  ]

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
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">ニュース発行</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">noteスタイルで記事を作成・公開します</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="bg-[#000033] border-[#83CBEB]/30 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-[#EEEEFF] flex items-center gap-2">
                <Tag className="h-5 w-5" />
                ハッシュタグ管理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-[#83CBEB]/50 text-[#EEEEFF] font-sans">
                    {tag}
                  </Badge>
                ))}
              </div>
              {!showHashtagForm ? (
                <Button
                  onClick={() => setShowHashtagForm(true)}
                  variant="outline"
                  size="sm"
                  className="w-full border-[#83CBEB]/30 text-[#83CBEB] hover:bg-[#83CBEB]/10 font-sans"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  新しいハッシュタグを追加
                </Button>
              ) : (
                <div className="space-y-2">
                  <Input
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                    placeholder="ハッシュタグ名"
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={addHashtag}
                      size="sm"
                      className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans"
                    >
                      追加
                    </Button>
                    <Button
                      onClick={() => {
                        setShowHashtagForm(false)
                        setNewHashtag("")
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-[#EEEEFF]/60 font-sans"
                    >
                      キャンセル
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#000033] border-[#83CBEB]/30 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#EEEEFF]">記事作成</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#EEEEFF] font-sans text-lg">
                    タイトル
                  </Label>
                  <Input
                    id="title"
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-serif text-xl"
                    placeholder="記事のタイトルを入力"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#EEEEFF] font-sans">
                      カテゴリ
                    </Label>
                    <Select
                      value={newsForm.category}
                      onValueChange={(value) => setNewsForm({ ...newsForm, category: value })}
                    >
                      <SelectTrigger className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value} className="text-[#EEEEFF] font-sans">
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="text-[#EEEEFF] font-sans">
                      サムネイルURL
                    </Label>
                    <Input
                      id="thumbnail"
                      value={newsForm.thumbnail}
                      onChange={(e) => setNewsForm({ ...newsForm, thumbnail: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="画像URLを入力（任意）"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">ハッシュタグ</Label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-[#83CBEB]/30 min-h-[60px]">
                    {hashtags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={newsForm.hashtags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer font-sans ${
                          newsForm.hashtags.includes(tag)
                            ? "bg-[#83CBEB] text-[#000033]"
                            : "border-[#83CBEB]/50 text-[#EEEEFF] hover:bg-[#83CBEB]/20"
                        }`}
                        onClick={() => toggleHashtagSelection(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-[#EEEEFF] font-sans">
                    本文
                  </Label>
                  <Textarea
                    id="content"
                    required
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[400px]"
                    placeholder="記事の本文を入力してください。Markdown形式にも対応しています。

## 見出し2
### 見出し3

段落は空行で区切ります。

- リスト項目1
- リスト項目2

**太字** や *斜体* も使えます。"
                  />
                  <p className="text-[#EEEEFF]/50 text-sm font-sans">Markdown形式で記述できます</p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans">
                    <Save className="mr-2 h-4 w-4" />
                    公開する
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#83CBEB]/30 text-[#83CBEB] hover:bg-[#83CBEB]/10 font-sans bg-transparent"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    プレビュー
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
