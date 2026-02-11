"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"

interface StatsData {
  events: string
  participants: string
  collaborations: string
  media: string
}

export default function StatsManagement() {
  const router = useRouter()
  const [stats, setStats] = useState<StatsData>({
    events: "12",
    participants: "300",
    collaborations: "8",
    media: "5",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }

    // Load saved stats from localStorage
    const savedStats = localStorage.getItem("activity_stats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [router])

  const handleInputChange = (field: keyof StatsData, value: string) => {
    setStats((prev) => ({
      ...prev,
      [field]: value,
    }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem("activity_stats", JSON.stringify(stats))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/admin">
            <Button
              variant="outline"
              className="border-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/10 font-sans bg-transparent mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              管理画面に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF] mb-2">活動実績数値管理</h1>
          <p className="text-[#EEEEFF]/60 font-sans">「これまでの活動」セクションに表示される数値を変更できます</p>
        </div>

        <Card className="bg-[#000033] border-[#83CBEB]/30">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#EEEEFF]">実績数値設定</CardTitle>
            <CardDescription className="text-[#EEEEFF]/60 font-sans">
              各項目の数値を入力してください（数字のみ、単位は自動で「+」が付きます）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="events" className="text-[#EEEEFF] font-sans">
                開催イベント数
              </Label>
              <Input
                id="events"
                type="text"
                value={stats.events}
                onChange={(e) => handleInputChange("events", e.target.value)}
                placeholder="12"
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] placeholder:text-[#EEEEFF]/30 font-sans focus:border-[#83CBEB]"
              />
              <p className="text-sm text-[#EEEEFF]/40 font-sans">表示例: {stats.events}+ 開催イベント数</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants" className="text-[#EEEEFF] font-sans">
                参加者数
              </Label>
              <Input
                id="participants"
                type="text"
                value={stats.participants}
                onChange={(e) => handleInputChange("participants", e.target.value)}
                placeholder="300"
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] placeholder:text-[#EEEEFF]/30 font-sans focus:border-[#83CBEB]"
              />
              <p className="text-sm text-[#EEEEFF]/40 font-sans">表示例: {stats.participants}+ 参加者数</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collaborations" className="text-[#EEEEFF] font-sans">
                コラボレーション実績
              </Label>
              <Input
                id="collaborations"
                type="text"
                value={stats.collaborations}
                onChange={(e) => handleInputChange("collaborations", e.target.value)}
                placeholder="8"
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] placeholder:text-[#EEEEFF]/30 font-sans focus:border-[#83CBEB]"
              />
              <p className="text-sm text-[#EEEEFF]/40 font-sans">
                表示例: {stats.collaborations}+ コラボレーション実績
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="media" className="text-[#EEEEFF] font-sans">
                メディア掲載
              </Label>
              <Input
                id="media"
                type="text"
                value={stats.media}
                onChange={(e) => handleInputChange("media", e.target.value)}
                placeholder="5"
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] placeholder:text-[#EEEEFF]/30 font-sans focus:border-[#83CBEB]"
              />
              <p className="text-sm text-[#EEEEFF]/40 font-sans">表示例: {stats.media}+ メディア掲載</p>
            </div>

            <div className="pt-6 border-t border-[#83CBEB]/20">
              <Button
                onClick={handleSave}
                className="w-full bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans font-medium"
              >
                <Save className="mr-2 h-4 w-4" />
                {saved ? "保存しました！" : "変更を保存"}
              </Button>
              {saved && <p className="text-center text-[#83CBEB] mt-2 font-sans text-sm">✓ 変更が保存されました</p>}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-[#83CBEB]/10 border border-[#83CBEB]/30 rounded-lg">
          <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">注意事項</h3>
          <ul className="list-disc list-inside space-y-1 text-[#EEEEFF]/60 font-sans text-sm">
            <li>数値のみを入力してください（単位や記号は不要です）</li>
            <li>保存した内容は即座にホームページに反映されます</li>
            <li>ブラウザのキャッシュをクリアすると、設定がリセットされる場合があります</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
