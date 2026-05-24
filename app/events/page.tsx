import Header from "@/components/header"
import Footer from "@/components/footer"
import { getEvents } from "@/lib/events"
import { getLaunches } from "@/lib/launches" // ◀︎ 追加
import EventCalendar from "./event-calendar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "イベントカレンダー", 
  description: "宇宙イベントをご確認いただけます。",
  openGraph: {
    title: "イベントカレンダー | Cosmo Base",
    description: "宇宙イベントをご確認いただけます。",
  },
}

export default async function EventsPage() {
  // ▼ 通常イベントとロケット打ち上げを同時に取得
  const [events, launches] = await Promise.all([
    getEvents(),
    getLaunches()
  ]);

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#EEEEFF] mb-4">イベントカレンダー</h1>
        </div>

        {/* カレンダー (ロケット打ち上げデータも渡す) */}
        <EventCalendar events={events} launches={launches} />

      </main>
      <Footer />
    </div>
  )
}
