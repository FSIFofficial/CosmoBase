"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// イベントデータの型定義
type Event = {
  id: number
  title: string
  date: Date
  time: string
  location: string
  type: "講演会" | "ワークショップ" | "観測会" | "交流会" | "オンライン"
  difficulty: "初心者向け" | "中級者向け" | "上級者向け" | "全レベル"
  capacity: number
  description: string
  speaker?: string
  organizer?: string
}

// サンプルイベントデータ（Cosmo Base主催・他団体共催含む）
const sampleEvents: Event[] = [
  {
    id: 1,
    title: "初心者のための宇宙観測入門",
    date: new Date(2026, 0, 15),
    time: "19:00 - 21:00",
    location: "オンライン（Zoom）",
    type: "オンライン",
    difficulty: "初心者向け",
    capacity: 50,
    description:
      "望遠鏡の選び方から星座の見つけ方まで、宇宙観測の基礎を学べる入門講座です。「何から始めればいいかわからない」という方に最適。質問タイムも充実しており、気軽に疑問を解消できます。録画視聴も可能です。",
    speaker: "山田太郎 博士（天体物理学者）",
    organizer: "Cosmo Base",
  },
  {
    id: 2,
    title: "ロケット開発最前線 - 民間宇宙開発の今",
    date: new Date(2026, 0, 20),
    time: "14:00 - 16:00",
    location: "東京都渋谷区",
    type: "講演会",
    difficulty: "中級者向け",
    capacity: 100,
    description:
      "スペースX、ブルーオリジンなど、民間企業によるロケット開発の最前線を現役エンジニアが解説。再使用ロケット技術や今後の宇宙輸送の展望について、技術的な視点から深掘りします。質疑応答時間も設けています。",
    speaker: "佐藤花子 氏（ロケットエンジニア）",
    organizer: "Cosmo Base × スペーステクノロジー株式会社",
  },
  {
    id: 3,
    title: "冬の星空観測会 - オリオン座を見よう",
    date: new Date(2026, 0, 25),
    time: "18:00 - 21:00",
    location: "多摩地域（詳細は参加者にお知らせ）",
    type: "観測会",
    difficulty: "全レベル",
    capacity: 30,
    description:
      "冬の代表的な星座・オリオン座とその周辺の天体を観測します。望遠鏡の無料レンタルあり。天体写真の撮り方ミニ講座も実施。天候不良の場合は室内で宇宙クイズ大会を開催します。",
    organizer: "Cosmo Base × 天文愛好会",
  },
  {
    id: 4,
    title: "宇宙ビジネス交流会 - 産業をつなぐ夜",
    date: new Date(2026, 1, 5),
    time: "19:00 - 22:00",
    location: "東京都渋谷区",
    type: "交流会",
    difficulty: "全レベル",
    capacity: 80,
    description:
      "宇宙関連企業・団体・研究機関の方々とのネットワーキングイベント。宇宙ビジネスに興味がある方、異業種連携を考えている方、学生の方も大歓迎。軽食・ドリンク付き。名刺交換会や5分間プレゼンテーションタイムもあります。",
    organizer: "Cosmo Base × 未来宇宙産業フォーラム",
  },
  {
    id: 5,
    title: "人工衛星データ解析ワークショップ",
    date: new Date(2026, 1, 10),
    time: "10:00 - 17:00",
    location: "オンライン（Zoom + 資料配布）",
    type: "ワークショップ",
    difficulty: "上級者向け",
    capacity: 25,
    description:
      "実際の衛星画像データを使って、データ解析の手法を実践的に学びます。Pythonの基礎知識が必要です。農業、災害監視、都市計画など、様々な分野での活用事例を紹介。ハンズオン形式で進めるため、PCをご用意ください。",
    speaker: "田中一郎 教授（リモートセンシング専門）",
    organizer: "Cosmo Base",
  },
  {
    id: 6,
    title: "月面探査の最新動向 - アルテミス計画とその先",
    date: new Date(2026, 1, 18),
    time: "19:00 - 20:30",
    location: "オンライン（YouTube Live）",
    type: "オンライン",
    difficulty: "初心者向け",
    capacity: 100,
    description:
      "NASAのアルテミス計画や各国の月面探査プロジェクトについて、最新情報をわかりやすく解説。月面基地の構想や、月の資源利用についても触れます。初心者でも理解できる内容です。アーカイブ視聴可能。",
    organizer: "Cosmo Base",
  },
  {
    id: 7,
    title: "親子で楽しむ宇宙工作教室",
    date: new Date(2026, 1, 22),
    time: "13:00 - 16:00",
    location: "東京都内（詳細は参加者にお知らせ）",
    type: "ワークショップ",
    difficulty: "初心者向け",
    capacity: 20,
    description:
      "小学生とその保護者を対象にした宇宙工作イベント。ペットボトルロケットを作って飛ばしたり、星座早見盤を作成します。宇宙の不思議を楽しく学べる内容です。材料費込み。",
    organizer: "Cosmo Base × NPO法人スターキッズ",
  },
  {
    id: 8,
    title: "【他団体主催】JAXA相模原キャンパス特別公開",
    date: new Date(2026, 2, 1),
    time: "10:00 - 16:00",
    location: "神奈川県相模原市 JAXA相模原キャンパス",
    type: "講演会",
    difficulty: "全レベル",
    capacity: 1000,
    description:
      "JAXA宇宙科学研究所が年に一度開催する特別公開イベント。ロケットや人工衛星の実物展示、研究者による講演、実験体験コーナーなど、盛りだくさんの内容です。入場無料・事前申込不要。Cosmo Baseからも見学ツアーを企画予定です。",
    organizer: "JAXA宇宙科学研究所（※Cosmo Base主催ではありません）",
  },
  {
    id: 9,
    title: "宇宙食試食＆トークイベント",
    date: new Date(2026, 2, 8),
    time: "15:00 - 17:00",
    location: "東京都内",
    type: "交流会",
    difficulty: "全レベル",
    capacity: 40,
    description:
      "実際の宇宙食を試食しながら、宇宙飛行士の生活や宇宙での食事について学ぶイベント。JAXA出身の講師が宇宙ステーションでの体験談を語ります。宇宙食のお土産付き。",
    organizer: "Cosmo Base",
  },
  {
    id: 10,
    title: "【他団体主催】全国プラネタリウム巡り - 多摩六都科学館",
    date: new Date(2026, 2, 15),
    time: "14:00 - 17:00",
    location: "東京都西東京市 多摩六都科学館",
    type: "観測会",
    difficulty: "全レベル",
    capacity: 50,
    description:
      "世界最大級のプラネタリウムを誇る多摩六都科学館での特別上映会。最新の投映システムで、まるで宇宙に行ったかのような体験ができます。Cosmo Baseメンバーの団体割引あり。上映後には解説員との質疑応答タイムも。",
    organizer: "多摩六都科学館（※Cosmo Base主催ではありません）",
  },
  {
    id: 11,
    title: "ブラックホールの謎に迫る",
    date: new Date(2026, 2, 20),
    time: "19:00 - 21:00",
    location: "オンライン（Zoom）",
    type: "オンライン",
    difficulty: "中級者向け",
    capacity: 60,
    description:
      "天体物理学の最大の謎の一つ、ブラックホール。その正体と最新研究について、専門家が詳しく解説します。事象の地平線、ホーキング放射、ブラックホール撮影成功の舞台裏など、興味深いトピック満載です。",
    speaker: "山田太郎 博士",
    organizer: "Cosmo Base",
  },
  {
    id: 12,
    title: "春の銀河観測会 - M87を見よう",
    date: new Date(2026, 2, 28),
    time: "19:00 - 22:00",
    location: "多摩地域",
    type: "観測会",
    difficulty: "全レベル",
    capacity: 35,
    description:
      "春の銀河シーズン到来！おとめ座銀河団を中心に、数多くの銀河を観測します。ブラックホール撮影で有名なM87銀河も観測予定。望遠鏡レンタル無料。初心者向けレクチャーあり。",
    organizer: "Cosmo Base × 天文愛好会",
  },
]

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 月の初日と最終日を取得
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // カレンダーの日付配列を生成
  const daysInMonth = lastDayOfMonth.getDate()
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDayOfWeek + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
    }
    return null
  })

  // フィルタリングされたイベント
  const filteredEvents = sampleEvents.filter((event) => {
    const typeMatch = typeFilter === "all" || event.type === typeFilter
    const difficultyMatch = difficultyFilter === "all" || event.difficulty === difficultyFilter
    return typeMatch && difficultyMatch
  })

  // 特定の日付のイベントを取得
  const getEventsForDay = (date: Date | null) => {
    if (!date) return []
    return filteredEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // 前月へ
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  // 次月へ
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"]

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#EEEEFF] mb-4">イベントカレンダー</h1>
          <p className="text-[#83CBEB] text-lg font-sans">Cosmo Baseが主催・共催するイベントをご確認いただけます</p>
          <p className="text-[#EEEEFF]/60 text-sm font-sans mt-2">※他団体との共催イベントも含まれます</p>
        </div>

        {/* フィルター */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-[#EEEEFF] font-sans text-sm">種別:</span>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                <SelectItem value="all" className="text-[#EEEEFF]">
                  すべて
                </SelectItem>
                <SelectItem value="講演会" className="text-[#EEEEFF]">
                  講演会
                </SelectItem>
                <SelectItem value="ワークショップ" className="text-[#EEEEFF]">
                  ワークショップ
                </SelectItem>
                <SelectItem value="観測会" className="text-[#EEEEFF]">
                  観測会
                </SelectItem>
                <SelectItem value="交流会" className="text-[#EEEEFF]">
                  交流会
                </SelectItem>
                <SelectItem value="オンライン" className="text-[#EEEEFF]">
                  オンライン
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#EEEEFF] font-sans text-sm">難易度:</span>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[180px] bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                <SelectItem value="all" className="text-[#EEEEFF]">
                  すべて
                </SelectItem>
                <SelectItem value="初心者向け" className="text-[#EEEEFF]">
                  初心者向け
                </SelectItem>
                <SelectItem value="中級者向け" className="text-[#EEEEFF]">
                  中級者向け
                </SelectItem>
                <SelectItem value="上級者向け" className="text-[#EEEEFF]">
                  上級者向け
                </SelectItem>
                <SelectItem value="全レベル" className="text-[#EEEEFF]">
                  全レベル
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* カレンダー */}
        <div className="max-w-6xl mx-auto bg-[#000033] border border-[#83CBEB]/30 rounded-lg p-6">
          {/* カレンダーヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={previousMonth}
              variant="ghost"
              size="icon"
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h2 className="text-2xl font-serif text-[#EEEEFF]">
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </h2>
            <Button
              onClick={nextMonth}
              variant="ghost"
              size="icon"
              className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`text-center py-2 font-sans text-sm ${
                  index === 0 ? "text-red-400" : index === 6 ? "text-blue-400" : "text-[#EEEEFF]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* カレンダーグリッド */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const events = getEventsForDay(day)
              const isToday =
                day &&
                day.getDate() === new Date().getDate() &&
                day.getMonth() === new Date().getMonth() &&
                day.getFullYear() === new Date().getFullYear()

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 rounded border ${
                    day
                      ? isToday
                        ? "bg-[#83CBEB]/20 border-[#83CBEB]"
                        : "bg-[#000033] border-[#83CBEB]/20 hover:border-[#83CBEB]/50"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  {day && (
                    <>
                      <div
                        className={`text-right mb-1 font-sans text-sm ${
                          index % 7 === 0 ? "text-red-400" : index % 7 === 6 ? "text-blue-400" : "text-[#EEEEFF]"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {events.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="w-full text-left text-xs p-1 rounded bg-[#83CBEB]/30 hover:bg-[#83CBEB]/50 text-[#EEEEFF] transition-colors"
                          >
                            {event.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* イベント詳細モーダル */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#000033] border border-[#83CBEB]/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-serif text-[#EEEEFF] pr-8">{selectedEvent.title}</h2>
                  <Button
                    onClick={() => setSelectedEvent(null)}
                    variant="ghost"
                    size="icon"
                    className="text-[#EEEEFF] hover:text-[#83CBEB] flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-[#EEEEFF]">
                    <Calendar className="h-5 w-5 text-[#83CBEB]" />
                    <span className="font-sans">
                      {selectedEvent.date.getFullYear()}年{selectedEvent.date.getMonth() + 1}月
                      {selectedEvent.date.getDate()}日 {selectedEvent.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#EEEEFF]">
                    <MapPin className="h-5 w-5 text-[#83CBEB]" />
                    <span className="font-sans">{selectedEvent.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#EEEEFF]">
                    <Users className="h-5 w-5 text-[#83CBEB]" />
                    <span className="font-sans">定員: {selectedEvent.capacity}名</span>
                  </div>

                  {selectedEvent.speaker && (
                    <div className="flex items-center gap-2 text-[#EEEEFF]">
                      <Award className="h-5 w-5 text-[#83CBEB]" />
                      <span className="font-sans">講師: {selectedEvent.speaker}</span>
                    </div>
                  )}

                  {selectedEvent.organizer && (
                    <div className="text-[#EEEEFF]/70 font-sans text-sm">主催: {selectedEvent.organizer}</div>
                  )}

                  <div className="flex gap-2">
                    <Badge className="bg-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/40">{selectedEvent.type}</Badge>
                    <Badge className="bg-[#EEEEBB]/30 text-[#000033] hover:bg-[#EEEEBB]/40">
                      {selectedEvent.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">イベント詳細</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">{selectedEvent.description}</p>
                </div>

                <Button className="w-full bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-sans">
                  <a href="https://discord.gg/TEnAD8Db8g" target="_blank" rel="noopener noreferrer" className="block">
                    参加申し込み（Discordへ）
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
