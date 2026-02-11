"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Edit } from "lucide-react"

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  organizer: string
  hashtags: string[]
  description: string
  published: boolean
}

export default function EventsManagePage() {
  const router = useRouter()
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "冬の星座観測会",
      date: "2026-02-15",
      time: "19:00",
      location: "東京都渋谷区〇〇公園",
      organizer: "Cosmo Base",
      hashtags: ["初心者向け", "観測会", "オフライン"],
      description: "冬の星座を観測する初心者向けイベントです",
      published: true,
    },
    {
      id: "2",
      name: "宇宙ビジネスセミナー",
      date: "2026-03-10",
      time: "14:00",
      location: "オンライン (Zoom)",
      organizer: "Cosmo Base",
      hashtags: ["中級者向け", "講演会", "オンライン"],
      description: "宇宙ビジネスの最新動向を解説します",
      published: true,
    },
    {
      id: "3",
      name: "ロケット打ち上げ見学ツアー",
      date: "2026-04-20",
      time: "10:00",
      location: "鹿児島県種子島",
      organizer: "宇宙開発協会",
      hashtags: ["中級者向け", "見学", "オフライン"],
      description: "実際のロケット打ち上げを見学できます",
      published: false,
    },
  ])

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const togglePublish = (id: string) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, published: !event.published } : event)))
  }

  const handleSaveEdit = () => {
    if (editingEvent) {
      setEvents((prev) => prev.map((event) => (event.id === editingEvent.id ? editingEvent : event)))
      setEditingEvent(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              管理画面に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">イベント管理</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">未開催イベントの編集と掲載制御（開催日順）</p>
        </div>

        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="bg-[#000033] border-[#83CBEB]/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-[#83CBEB]" />
                      <h3 className="text-lg font-serif text-[#EEEEFF]">{event.name}</h3>
                    </div>
                    <div className="space-y-1 mb-3">
                      <p className="text-[#EEEEFF]/80 text-sm font-sans">
                        📅 {event.date} {event.time}
                      </p>
                      <p className="text-[#EEEEFF]/80 text-sm font-sans">📍 {event.location}</p>
                      <p className="text-[#EEEEFF]/80 text-sm font-sans">👤 主催: {event.organizer}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.hashtags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-[#83CBEB]/50 text-[#83CBEB] font-sans text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Button
                      onClick={() => setEditingEvent(event)}
                      variant="outline"
                      size="sm"
                      className="border-[#83CBEB]/30 text-[#83CBEB] hover:bg-[#83CBEB]/10 font-sans"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      編集
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#EEEEFF]/60 font-sans whitespace-nowrap">
                        {event.published ? "HP掲載中" : "非掲載"}
                      </span>
                      <Switch
                        checked={event.published}
                        onCheckedChange={() => togglePublish(event.id)}
                        className="data-[state=checked]:bg-[#83CBEB]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#EEEEFF]">イベント編集</DialogTitle>
            </DialogHeader>
            {editingEvent && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">イベント名称</Label>
                  <Input
                    value={editingEvent.name}
                    onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#EEEEFF] font-sans">開催日</Label>
                    <Input
                      type="date"
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#EEEEFF] font-sans">開催時間</Label>
                    <Input
                      type="time"
                      value={editingEvent.time}
                      onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                      className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">開催場所</Label>
                  <Input
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">主催</Label>
                  <Input
                    value={editingEvent.organizer}
                    onChange={(e) => setEditingEvent({ ...editingEvent, organizer: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">イベント詳細</Label>
                  <Textarea
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setEditingEvent(null)}
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
      </div>
    </div>
  )
}
