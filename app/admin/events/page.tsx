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
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Tag } from "lucide-react"

export default function AdminEventsPage() {
  const router = useRouter()
  const [hashtags, setHashtags] = useState([
    "初心者向け",
    "中級者向け",
    "上級者向け",
    "観測会",
    "講演会",
    "ワークショップ",
    "オンライン",
    "オフライン",
  ])
  const [newHashtag, setNewHashtag] = useState("")
  const [showHashtagForm, setShowHashtagForm] = useState(false)

  const [eventForm, setEventForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    speakers: "",
    organizer: "",
    hashtags: [] as string[],
    description: "",
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
    if (eventForm.hashtags.includes(hashtag)) {
      setEventForm({
        ...eventForm,
        hashtags: eventForm.hashtags.filter((h) => h !== hashtag),
      })
    } else {
      setEventForm({
        ...eventForm,
        hashtags: [...eventForm.hashtags, hashtag],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] イベント登録:", eventForm)
    alert("イベントが登録されました")
    // Reset form
    setEventForm({
      name: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      speakers: "",
      organizer: "",
      hashtags: [],
      description: "",
    })
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
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">イベント登録</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">新しいイベント情報を登録します</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ハッシュタグ管理 */}
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

          {/* イベント登録フォーム */}
          <Card className="bg-[#000033] border-[#83CBEB]/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#EEEEFF]">イベント情報入力</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#EEEEFF] font-sans">
                      イベント名称 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={eventForm.name}
                      onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="例: 冬の星空観測会"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer" className="text-[#EEEEFF] font-sans">
                      主催 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="organizer"
                      required
                      value={eventForm.organizer}
                      onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="例: Cosmo Base"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-[#EEEEFF] font-sans">
                      開催日 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-[#EEEEFF] font-sans">
                      開催時間 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      required
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-[#EEEEFF] font-sans">
                      定員
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={eventForm.capacity}
                      onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                      placeholder="例: 30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[#EEEEFF] font-sans">
                    開催場所 <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="location"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    placeholder="例: 東京都渋谷区〇〇公園 または オンライン (Zoom)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speakers" className="text-[#EEEEFF] font-sans">
                    登壇者
                  </Label>
                  <Input
                    id="speakers"
                    value={eventForm.speakers}
                    onChange={(e) => setEventForm({ ...eventForm, speakers: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    placeholder="例: 山田太郎（天文学者）"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">
                    ハッシュタグ <span className="text-red-400">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-[#83CBEB]/30 min-h-[60px]">
                    {hashtags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={eventForm.hashtags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer font-sans ${
                          eventForm.hashtags.includes(tag)
                            ? "bg-[#83CBEB] text-[#000033]"
                            : "border-[#83CBEB]/50 text-[#EEEEFF] hover:bg-[#83CBEB]/20"
                        }`}
                        onClick={() => toggleHashtagSelection(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {eventForm.hashtags.length === 0 && (
                    <p className="text-[#EEEEFF]/50 text-sm font-sans">最低1つのハッシュタグを選択してください</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#EEEEFF] font-sans">
                    イベント詳細 <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[150px]"
                    placeholder="イベントの詳細な説明を入力してください"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    !eventForm.name ||
                    !eventForm.date ||
                    !eventForm.time ||
                    !eventForm.location ||
                    !eventForm.organizer ||
                    eventForm.hashtags.length === 0 ||
                    !eventForm.description
                  }
                  className="w-full bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans"
                >
                  イベントを登録
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
