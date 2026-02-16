import { Metadata } from "next"
import EventResourcesPageContent from "./page.client"

export const metadata: Metadata = {
  title: "イベント資料 | 資料館",
  description: "ワークショップ開催時に使用した資料を公開しています。",
  // OGPも個別で上書き
  openGraph: {
    title: "イベント資料 | 資料館 | Cosmo Base",
    description: "ワークショップ開催時に使用した資料を公開しています。",
  },
}

export default function EventResourcesPage() {
  return <EventResourcesPageContent />
}
