import Header from "@/components/header"
import Footer from "@/components/footer"
import { getEvents } from "@/lib/events"
import EventCalendar from "./event-calendar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "イベントカレンダー", 
  description: "主催・共催するイベントをご確認いただけます。",
    // OGPも個別で上書き
  openGraph: {
    title: "イベントカレンダー | Cosmo Base",
    description: "主催・共催するイベントをご確認いただけます。",
  },
}

export default function EventsPage() {
  // サーバーサイドでCSVデータを取得
  const events = getEvents();

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#EEEEFF] mb-4">イベントカレンダー</h1>
          <p className="text-[#83CBEB] text-lg font-sans">主催・共催するイベントをご確認いただけます</p>
          <p className="text-[#EEEEFF]/60 text-sm font-sans mt-2">※他団体との共催イベントも含まれます</p>
        </div>

        {/* カレンダー (クライアントコンポーネント) */}
        <EventCalendar events={events} />

      </main>
      <Footer />
    </div>
  )
}
