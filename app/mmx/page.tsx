import { Metadata } from "next"
import MMXPageContent from "./page.client"

export const metadata: Metadata = {
  title: "MMXチームへの寄せ書きキャンペーン",
  description: "",
  openGraph: {
    title: "MMXチームへの寄せ書きキャンペーン",
    description: "",
  },
}

export default function MMXPage() {
  return <MMXPageContent />
}
