import { Metadata } from "next"
import ValuePageContent from "./page.client"

export const metadata: Metadata = {
  title: "Cosmo Baseのサービス",
  description: "宇宙に対する関心度に合わせて設計された4つのレベルのコンテンツを提供し、継続的な接点を創出します。",
  // OGPも個別で上書き
  openGraph: {
    title: "Cosmo Baseのサービス | Cosmo Base",
    description: "宇宙に対する関心度に合わせて設計された4つのレベルのコンテンツを提供し、継続的な接点を創出します。",
  },
}

export default function ValuePage() {
  return <ValuePageContent />
}
