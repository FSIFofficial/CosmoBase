"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Plus, Tag } from "lucide-react"

export default function AdminResourcesPage() {
  const router = useRouter()
  const [hashtags, setHashtags] = useState(["入門", "中級", "上級", "ビジネス", "技術", "教育", "研究"])
  const [newHashtag, setNewHashtag] = useState("")
  const [showHashtagForm, setShowHashtagForm] = useState(false)

  const [newResource, setNewResource] = useState({
    title: "",
    category: "ventures",
    file: null as File | null,
    hashtags: [] as string[],
  })

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewResource({ ...newResource, file: e.target.files[0] })
    }
  }

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag])
      setNewHashtag("")
      setShowHashtagForm(false)
    }
  }

  const toggleHashtagSelection = (hashtag: string) => {
    if (newResource.hashtags.includes(hashtag)) {
      setNewResource({
        ...newResource,
        hashtags: newResource.hashtags.filter((h) => h !== hashtag),
      })
    } else {
      setNewResource({
        ...newResource,
        hashtags: [...newResource.hashtags, hashtag],
      })
    }
  }

  const handleUpload = () => {
    if (newResource.title && newResource.file) {
      alert("資料がアップロードされました")
      setNewResource({ title: "", category: "ventures", file: null, hashtags: [] })
    }
  }

  const categoryNames: Record<string, string> = {
    ventures: "宇宙ビジネス",
    technology: "技術資料",
    education: "教育・啓発",
    research: "研究論文",
    policy: "政策・制度",
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              管理画面に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">資料登録</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">新しい資料をアップロードします</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
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

          <Card className="bg-[#000033] border-[#83CBEB]/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#EEEEFF] flex items-center gap-2">
                <Upload className="h-5 w-5" />
                新しい資料をアップロード
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#EEEEFF] font-sans">
                    資料タイトル
                  </Label>
                  <Input
                    id="title"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    placeholder="例: 宇宙ビジネス入門ガイド"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#EEEEFF] font-sans">
                    カテゴリ
                  </Label>
                  <Select
                    value={newResource.category}
                    onValueChange={(value) => setNewResource({ ...newResource, category: value })}
                  >
                    <SelectTrigger className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                      {Object.entries(categoryNames).map(([key, name]) => (
                        <SelectItem key={key} value={key} className="text-[#EEEEFF] font-sans">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file" className="text-[#EEEEFF] font-sans">
                  ファイル (Word形式)
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileChange}
                  className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                />
                {newResource.file && (
                  <p className="text-[#83CBEB] text-sm font-sans">選択ファイル: {newResource.file.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-[#EEEEFF] font-sans">ハッシュタグ</Label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-[#83CBEB]/30 min-h-[60px]">
                  {hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={newResource.hashtags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer font-sans ${
                        newResource.hashtags.includes(tag)
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
              <Button
                onClick={handleUpload}
                disabled={!newResource.title || !newResource.file}
                className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans"
              >
                <Upload className="mr-2 h-4 w-4" />
                アップロード
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
