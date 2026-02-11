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
import { ArrowLeft, Upload, Building2, Users, Tag, Plus } from "lucide-react"

export default function AdminPartnersPage() {
  const router = useRouter()
  const [hashtags, setHashtags] = useState(["テクノロジー", "教育", "研究", "製造", "スタートアップ", "大企業", "NPO"])
  const [newHashtag, setNewHashtag] = useState("")
  const [showHashtagForm, setShowHashtagForm] = useState(false)

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    type: "company",
    category: "technology",
    tagline: "",
    website: "",
    twitter: "",
    instagram: "",
    facebook: "",
    note: "",
    tiktok: "",
    other: "",
    overview: "",
    activities: "",
    achievements: "",
    logo: null as File | null,
    hashtags: [] as string[],
  })

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPartnerForm({ ...partnerForm, logo: e.target.files[0] })
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
    if (partnerForm.hashtags.includes(hashtag)) {
      setPartnerForm({
        ...partnerForm,
        hashtags: partnerForm.hashtags.filter((h) => h !== hashtag),
      })
    } else {
      setPartnerForm({
        ...partnerForm,
        hashtags: [...partnerForm.hashtags, hashtag],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] パートナー登録:", partnerForm)
    alert("パートナーが登録されました")
    setPartnerForm({
      name: "",
      type: "company",
      category: "technology",
      tagline: "",
      website: "",
      twitter: "",
      instagram: "",
      facebook: "",
      note: "",
      tiktok: "",
      other: "",
      overview: "",
      activities: "",
      achievements: "",
      logo: null,
      hashtags: [],
    })
  }

  const types = [
    { value: "company", label: "企業" },
    { value: "organization", label: "団体" },
  ]

  const categories = [
    { value: "technology", label: "テクノロジー" },
    { value: "education", label: "教育" },
    { value: "research", label: "研究" },
    { value: "media", label: "メディア" },
    { value: "consulting", label: "コンサルティング" },
    { value: "manufacturing", label: "製造" },
    { value: "other", label: "その他" },
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
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">パートナー登録</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">新しいパートナー企業・団体を登録します</p>
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
              <CardTitle className="text-xl font-serif text-[#EEEEFF]">パートナー情報入力</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#EEEEFF] font-sans">
                      企業・団体名 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="例: 株式会社スペーステクノロジー"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-[#EEEEFF] font-sans">
                      登録形態 <span className="text-red-400">*</span>
                    </Label>
                    <Select
                      value={partnerForm.type}
                      onValueChange={(value) => setPartnerForm({ ...partnerForm, type: value })}
                    >
                      <SelectTrigger className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                        {types.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-[#EEEEFF] font-sans">
                            <div className="flex items-center gap-2">
                              {type.value === "company" ? (
                                <Building2 className="h-4 w-4" />
                              ) : (
                                <Users className="h-4 w-4" />
                              )}
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#EEEEFF] font-sans">
                      事業の大枠 <span className="text-red-400">*</span>
                    </Label>
                    <Select
                      value={partnerForm.category}
                      onValueChange={(value) => setPartnerForm({ ...partnerForm, category: value })}
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
                    <Label htmlFor="tagline" className="text-[#EEEEFF] font-sans">
                      一言活動・事業内容 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="tagline"
                      required
                      value={partnerForm.tagline}
                      onChange={(e) => setPartnerForm({ ...partnerForm, tagline: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="例: 小型衛星の開発・製造を行う宇宙ベンチャー"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-[#EEEEFF]/80 font-sans text-sm">
                      ホームページ
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={partnerForm.website}
                      onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-[#EEEEFF]/80 font-sans text-sm">
                      X (Twitter)
                    </Label>
                    <Input
                      id="twitter"
                      type="url"
                      value={partnerForm.twitter}
                      onChange={(e) => setPartnerForm({ ...partnerForm, twitter: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-[#EEEEFF]/80 font-sans text-sm">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      type="url"
                      value={partnerForm.instagram}
                      onChange={(e) => setPartnerForm({ ...partnerForm, instagram: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="text-[#EEEEFF]/80 font-sans text-sm">
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      type="url"
                      value={partnerForm.facebook}
                      onChange={(e) => setPartnerForm({ ...partnerForm, facebook: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note" className="text-[#EEEEFF]/80 font-sans text-sm">
                      note
                    </Label>
                    <Input
                      id="note"
                      type="url"
                      value={partnerForm.note}
                      onChange={(e) => setPartnerForm({ ...partnerForm, note: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://note.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiktok" className="text-[#EEEEFF]/80 font-sans text-sm">
                      TikTok
                    </Label>
                    <Input
                      id="tiktok"
                      type="url"
                      value={partnerForm.tiktok}
                      onChange={(e) => setPartnerForm({ ...partnerForm, tiktok: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://tiktok.com/@username"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="other" className="text-[#EEEEFF]/80 font-sans text-sm">
                      その他のリンク
                    </Label>
                    <Input
                      id="other"
                      type="url"
                      value={partnerForm.other}
                      onChange={(e) => setPartnerForm({ ...partnerForm, other: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">ハッシュタグ</Label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-[#83CBEB]/30 min-h-[60px]">
                    {hashtags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={partnerForm.hashtags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer font-sans ${
                          partnerForm.hashtags.includes(tag)
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
                  <Label htmlFor="overview" className="text-[#EEEEFF] font-sans">
                    概要 <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="overview"
                    required
                    value={partnerForm.overview}
                    onChange={(e) => setPartnerForm({ ...partnerForm, overview: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                    placeholder="企業・団体の概要を入力してください"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities" className="text-[#EEEEFF] font-sans">
                    主な活動内容 <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="activities"
                    required
                    value={partnerForm.activities}
                    onChange={(e) => setPartnerForm({ ...partnerForm, activities: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                    placeholder="主な活動内容を箇条書きで入力してください"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievements" className="text-[#EEEEFF] font-sans">
                    主な実績
                  </Label>
                  <Textarea
                    id="achievements"
                    value={partnerForm.achievements}
                    onChange={(e) => setPartnerForm({ ...partnerForm, achievements: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                    placeholder="主な実績を入力してください"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-[#EEEEFF] font-sans">
                    ロゴ画像
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                  {partnerForm.logo && (
                    <p className="text-[#83CBEB] text-sm font-sans">選択ファイル: {partnerForm.logo.name}</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans">
                  <Upload className="mr-2 h-4 w-4" />
                  パートナーを登録
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
