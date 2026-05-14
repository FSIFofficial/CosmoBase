import { Metadata } from "next"
import { SpaceType } from "@/components/space-type"

export const metadata: Metadata = {
  title: "宇宙タイプ診断| Cosmo Base",
  description: "30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。",
}

export default function SpaceTypePage() {
  return <SpaceType />
}
