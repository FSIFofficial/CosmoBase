import { Metadata } from "next"
import ValuePageContent from "./page.client"

export const metadata: Metadata = {
  title: "Cosmo Baseが提供する価値",
  description: "参加することで得られる具体的なメリット",
  // OGPも個別で上書き
  openGraph: {
    title: "Cosmo Baseが提供する価値 | Cosmo Base",
    description: "参加することで得られる具体的なメリット",
  },
}

export default function ValuePage() {
  return <ValuePageContent />
}
