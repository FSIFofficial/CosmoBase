"use client"

import { useState, useMemo, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Event } from "@/lib/events"

export default function EventCalendar({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [hostFilter, setHostFilter] = useState<"all" | "host" | "external">("all")
  
  // ▼ 月を変えても「本日」の枠が残るバグの修正用
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

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

  const safeEvents = useMemo(() => {
    return (events || [])
      .filter((e) => e && e.date)
      .map((e) => ({
        ...e,
        date: new Date(e.date),
        endDate: e.endDate ? new Date(e.endDate) : null,
      }))
      .filter((e) => !isNaN(e.date.getTime()));
  }, [events]);

  // ▼ 種別(Type)の動的リスト生成（「その他」は最後に並べ替える）
  const eventTypes = useMemo(() => {
    const types = Array.from(new Set(safeEvents.map(e => e.type).filter(Boolean)));
    return types.sort((a, b) => {
      if (a === "その他") return 1;
      if (b === "その他") return -1;
      return a.localeCompare(b, "ja");
    });
  }, [safeEvents]);

  const filteredEvents = safeEvents.filter((event) => {
    const isHost = event.organizer && (event.organizer.includes("Cosmo Base") || event.organizer.includes("CosmoBase"));
    const hostMatch = 
      hostFilter === "all" || 
      (hostFilter === "host" && isHost) || 
      (hostFilter === "external" && !isHost);
    
    const typeMatch = typeFilter === "all" || event.type === typeFilter
    
    // ▼ 難易度の絞り込み判定
    let difficultyMatch = true;
    if (difficultyFilter !== "all") {
      if (event.difficulty === "全レベル") {
        difficultyMatch = true;
      } else if (difficultyFilter === "初心者向け") {
        difficultyMatch = event.difficulty === "初心者向け";
      } else if (difficultyFilter === "中級者向け") {
        difficultyMatch = event.difficulty === "中級者向け" || event.difficulty === "中級者以上向け";
      } else if (difficultyFilter === "上級者向け") {
        difficultyMatch = event.difficulty === "上級者向け" || event.difficulty === "中級者以上向け";
      } else {
        difficultyMatch = event.difficulty === difficultyFilter;
      }
    }
    
    return hostMatch && typeMatch && difficultyMatch
  })

  const getEventsForDay = (date: Date | null) => {
    if (!date) return []
    const dayEvents = filteredEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );

    // 主催イベントを上に表示
    return dayEvents.sort((a, b) => {
      const aIsHost = a.organizer && (a.organizer.includes("Cosmo Base") || a.organizer.includes("CosmoBase")) ? 1 : 0;
      const bIsHost = b.organizer && (b.organizer.includes("Cosmo Base") || b.organizer.includes("CosmoBase")) ? 1 : 0;
      return bIsHost - aIsHost; 
    });
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"]

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#EEEEFF] font-sans text-sm">種別:</span>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#000033] border-[#83CBEB]/30 max-h-[300px]">
                <SelectItem value="all" className="text-[#EEEEFF]">すべて</SelectItem>
                {/* スプレッドシートから自動取得した種別を表示 */}
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type} className="text-[#EEEEFF]">{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#EEEEFF] font-sans text-sm">難易度:</span>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[150px] bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                <SelectItem value="all" className="text-[#EEEEFF]">すべて</SelectItem>
                <SelectItem value="初心者向け" className="text-[#EEEEFF]">初心者向け</SelectItem>
                <SelectItem value="中級者向け" className="text-[#EEEEFF]">中級者向け</SelectItem>
                <SelectItem value="上級者向け" className="text-[#EEEEFF]">上級者向け</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="inline-flex bg-[#000033] border border-[#83CBEB]/30 rounded-lg p-1">
          <button
            onClick={() => setHostFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-sans transition-colors ${
              hostFilter === "all" ? "bg-[#83CBEB] text-[#000033] font-bold" : "text-[#EEEEFF] hover:bg-[#83CBEB]/10"
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setHostFilter("host")}
            className={`px-4 py-2 rounded-md text-sm font-sans transition-colors ${
              hostFilter === "host" ? "bg-[#83CBEB] text-[#000033] font-bold" : "text-[#EEEEFF] hover:bg-[#83CBEB]/10"
            }`}
          >
            主催イベント
          </button>
          <button
            onClick={() => setHostFilter("external")}
            className={`px-4 py-2 rounded-md text-sm font-sans transition-colors ${
              hostFilter === "external" ? "bg-[#83CBEB] text-[#000033] font-bold" : "text-[#EEEEFF] hover:bg-[#83CBEB]/10"
            }`}
          >
            外部イベント
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-[#000033] border border-[#83CBEB]/30 rounded-lg p-6">
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

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const events = getEventsForDay(day)
            const isToday =
              day && today &&
              day.getDate() === today.getDate() &&
              day.getMonth() === today.getMonth() &&
              day.getFullYear() === today.getFullYear()

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
                      {events.map((event) => {
                        const isHostEvent = event.organizer && (event.organizer.includes("Cosmo Base") || event.organizer.includes("CosmoBase"));
                        
                        return (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`w-full text-left text-xs p-1 rounded text-[#EEEEFF] transition-colors ${
                              isHostEvent 
                                ? "bg-[#83CBEB]/50 hover:bg-[#83CBEB]/70 border border-[#83CBEB]/30" 
                                : "bg-[#83CBEB]/20 hover:bg-[#83CBEB]/40" 
                            }`}
                          >
                            {event.title}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#000033] border border-[#83CBEB]/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                <div className="mb-3">
                    {selectedEvent.organizer && (selectedEvent.organizer.includes("Cosmo Base") || selectedEvent.organizer.includes("CosmoBase")) ? (
                      <Badge className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]">主催イベント</Badge>
                    ) : (
                      <Badge className="bg-transparent border border-[#EEEEFF]/50 text-[#EEEEFF] hover:bg-transparent">外部イベント</Badge>
                    )}
                  </div>
                  <h2 className="text-2xl font-serif text-[#EEEEFF] pr-8">{selectedEvent.title}</h2>
                </div>
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

                {selectedEvent.capacity > 0 && (
                <div className="flex items-center gap-2 text-[#EEEEFF]">
                  <Users className="h-5 w-5 text-[#83CBEB]" />
                  <span className="font-sans">定員: {selectedEvent.capacity}名</span>
                </div>
                )}

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
                <p className="text-[#EEEEFF]/80 font-sans leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
              </div>

              {selectedEvent.link && (
                <Button asChild className="w-full bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-sans">
                  <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                    詳細・参加申し込み
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
