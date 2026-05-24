"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, X, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Event } from "@/lib/events"
import { LaunchEvent } from "@/lib/launches" // 追加

// propsに launches を追加
export default function EventCalendar({ events, launches }: { events: Event[], launches: LaunchEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  // イベントかロケット打ち上げのどちらかが入るように型を変更
  const [selectedEvent, setSelectedEvent] = useState<Event | LaunchEvent | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const daysInMonth = lastDayOfMonth.getDate()
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDayOfWeek + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
    }
    return null
  })

  const filteredEvents = events.filter((event) => {
    const typeMatch = typeFilter === "all" || event.type === typeFilter
    const difficultyMatch = difficultyFilter === "all" || event.difficulty === difficultyFilter
    return typeMatch && difficultyMatch
  })

  // 日付ごとのイベントと打ち上げを取得
  const getEventsForDay = (date: Date | null) => {
    if (!date) return { dayEvents: [], dayLaunches: [] }
    
    const dayEvents = filteredEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )

    const dayLaunches = launches.filter(
      (launch) =>
        launch.date.getDate() === date.getDate() &&
        launch.date.getMonth() === date.getMonth() &&
        launch.date.getFullYear() === date.getFullYear(),
    )

    return { dayEvents, dayLaunches }
  }

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"]

  return (
    <>
      {/* フィルター部分はそのまま */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <span className="text-[#EEEEFF] font-sans text-sm">種別:</span>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
              <SelectItem value="all" className="text-[#EEEEFF]">すべて</SelectItem>
              <SelectItem value="講演会" className="text-[#EEEEFF]">講演会</SelectItem>
              <SelectItem value="ワークショップ" className="text-[#EEEEFF]">ワークショップ</SelectItem>
              <SelectItem value="観測会" className="text-[#EEEEFF]">観測会</SelectItem>
              <SelectItem value="交流会" className="text-[#EEEEFF]">交流会</SelectItem>
              <SelectItem value="オンライン" className="text-[#EEEEFF]">オンライン</SelectItem>
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
              <SelectItem value="all" className="text-[#EEEEFF]">すべて</SelectItem>
              <SelectItem value="初心者向け" className="text-[#EEEEFF]">初心者向け</SelectItem>
              <SelectItem value="中級者向け" className="text-[#EEEEFF]">中級者向け</SelectItem>
              <SelectItem value="上級者向け" className="text-[#EEEEFF]">上級者向け</SelectItem>
              <SelectItem value="全レベル" className="text-[#EEEEFF]">全レベル</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* カレンダー */}
      <div className="max-w-6xl mx-auto bg-[#000033] border border-[#83CBEB]/30 rounded-lg p-6">
        {/* ヘッダー省略... */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={previousMonth} variant="ghost" size="icon" className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10"><ChevronLeft className="h-6 w-6" /></Button>
          <h2 className="text-2xl font-serif text-[#EEEEFF]">{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</h2>
          <Button onClick={nextMonth} variant="ghost" size="icon" className="text-[#EEEEFF] hover:text-[#83CBEB] hover:bg-[#83CBEB]/10"><ChevronRight className="h-6 w-6" /></Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day, index) => (
            <div key={day} className={`text-center py-2 font-sans text-sm ${index === 0 ? "text-red-400" : index === 6 ? "text-blue-400" : "text-[#EEEEFF]"}`}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const { dayEvents, dayLaunches } = getEventsForDay(day)
            const isToday = day && day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() && day.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 rounded border ${
                  day ? (isToday ? "bg-[#83CBEB]/20 border-[#83CBEB]" : "bg-[#000033] border-[#83CBEB]/20 hover:border-[#83CBEB]/50") : "bg-transparent border-transparent"
                }`}
              >
                {day && (
                  <>
                    <div className={`text-right mb-1 font-sans text-sm ${index % 7 === 0 ? "text-red-400" : index % 7 === 6 ? "text-blue-400" : "text-[#EEEEFF]"}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {/* ▼ ロケット打ち上げを優先して上部に表示 (オレンジ色) */}
                      {dayLaunches.map((launch) => (
                        <button
                          key={launch.id}
                          onClick={() => setSelectedEvent(launch)}
                          className="w-full text-left text-xs p-1 rounded bg-[#FF8C00]/20 hover:bg-[#FF8C00]/40 text-[#EEEEFF] border-l-2 border-[#FF8C00] transition-colors"
                        >
                          🚀 {launch.title}
                        </button>
                      ))}

                      {/* ▼ 通常のイベント */}
                      {dayEvents.map((event) => (
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
                <Button onClick={() => setSelectedEvent(null)} variant="ghost" size="icon" className="text-[#EEEEFF] hover:text-[#83CBEB] flex-shrink-0">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-[#EEEEFF]">
                  <Calendar className="h-5 w-5 text-[#83CBEB]" />
                  <span className="font-sans">
                    {selectedEvent.date.getFullYear()}年{selectedEvent.date.getMonth() + 1}月{selectedEvent.date.getDate()}日 {selectedEvent.time}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#EEEEFF]">
                  <MapPin className="h-5 w-5 text-[#83CBEB]" />
                  <span className="font-sans">{selectedEvent.location}</span>
                </div>

                {/* ロケット打ち上げか、通常イベントかで表示を分岐 */}
                {'isLaunch' in selectedEvent ? (
                  <>
                    <div className="flex items-center gap-2 text-[#EEEEFF]">
                      <Rocket className="h-5 w-5 text-[#FF8C00]" />
                      <span className="font-sans">機体: {selectedEvent.rocket}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-[#FF8C00]/30 text-[#EEEEFF]">ロケット打ち上げ</Badge>
                    </div>
                  </>
                ) : (
                  <>
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
                      <Badge className="bg-[#EEEEBB]/30 text-[#000033] hover:bg-[#EEEEBB]/40">{selectedEvent.difficulty}</Badge>
                    </div>
                  </>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">詳細情報</h3>
                <p className="text-[#EEEEFF]/80 font-sans leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
              </div>

              {/* 通常イベントの場合のみ参加ボタンを表示 */}
              {!('isLaunch' in selectedEvent) && (
                <Button className="w-full bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-sans">
                  <a href="https://discord.gg/TEnAD8Db8g" target="_blank" rel="noopener noreferrer" className="block w-full">
                    参加申し込み（Discordへ）
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
