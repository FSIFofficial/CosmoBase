import { Metadata } from "next"
import { SpaceTypeDiagnosis } from "@/components/projects/space-type-diagnosis"

export const metadata: Metadata = {
  title: "あなたの宇宙タイプは？ | Cosmo Base",
  description: "30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。",
}

export default function SpaceTypePage() {
  return <SpaceTypeDiagnosis />
}
