import { Metadata } from "next"
import PartnerPageContent from "./page.client"

export const metadata: Metadata = {
  title: "パートナー制度",
  description: "Cosmo Baseと一緒に、宇宙の未来を創りませんか",
  // OGPも個別で上書き
  openGraph: {
    title: "パートナー制度 | Cosmo Base",
    description: "Cosmo Baseと一緒に、宇宙の未来を創りませんか",
  },
}

export default function PartnerPage() {
  return <PartnerPageContent />
}
