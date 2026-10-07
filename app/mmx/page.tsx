import { Metadata } from "next"
import MMXPageContent from "./page.client"

const DESCRIPTION =
  "10月20日打ち上げ予定の火星衛星探査計画「MMX」探査機の旅路を応援しよう！応援メッセージ・応援イラストを募集中。頂いた寄せ書きは、まとめてMMXチームの皆様へお届けします。（共催:Cosmo Base,FSIF）"

export const metadata: Metadata = {
  title: "MMXチームへの寄せ書きキャンペーン",
  description: DESCRIPTION,
  openGraph: {
    title: "MMXチームへの寄せ書きキャンペーン",
    description: DESCRIPTION,
    images: [
      {
        url: "/PIA10369.jpg",
        width: 1280,
        height: 1265,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MMXチームへの寄せ書きキャンペーン",
    description: DESCRIPTION,
    images: ["/PIA10369.jpg"],
  },
}

export default function MMXPage() {
  return <MMXPageContent />
}
