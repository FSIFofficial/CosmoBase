import { Metadata } from "next"
import ContactPageContent from "./page.client"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Cosmo Baseへのお問い合わせはこちらから",
  openGraph: {
    title: "お問い合わせ | Cosmo Base",
    description: "ご質問、ご相談などお気軽にお問い合わせください",
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
