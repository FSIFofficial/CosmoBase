import { Metadata } from "next"
import ResourcesPageContent from "./page.client"

export const metadata: Metadata = {
  title: "資料館",
  description: "宇宙に関する知識とデータはこちらから",
  // OGPも個別で上書き
  openGraph: {
    title: "資料館 | Cosmo Base",
    description: "宇宙に関する知識とデータはこちらから",
  },
}

export default function ResourcesPage() {
  return <ResourcesPageContent />
}
