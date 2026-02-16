import { Metadata } from "next"
import FAQPageContent from "./page.client"

export const metadata: Metadata = {
  title: "よくある質問", 
  description: "Cosmo Baseについてよくいただく質問にお答えします",
    // OGPも個別で上書き
  openGraph: {
    title: "よくある質問 | Cosmo Base",
    description: "Cosmo Baseについてよくいただく質問にお答えします",
  },
}

export default function FAQPage() {
  return <FAQPageContent />
}
