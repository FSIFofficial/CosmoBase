import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Users, Globe, Twitter, Linkedin, Facebook, Instagram, Mail, ChevronLeft } from "lucide-react"
import Image from "next/image"

interface Partner {
  id: string
  name: string
  type: "company" | "organization"
  logo: string
  description: string
  detailedDescription: string
  website?: string
  twitter?: string
  linkedin?: string
  facebook?: string
  instagram?: string
  email?: string
  category: string
  established: string
  activities: string[]
  achievements: string[]
}

const partnersData: Record<string, Partner> = {
  "space-tech-corp": {
    id: "space-tech-corp",
    name: "株式会社スペーステック",
    type: "company",
    logo: "/space-technology-company-logo.jpg",
    description: "小型人工衛星の開発・運用を手がける宇宙ベンチャー企業",
    detailedDescription:
      "2018年に設立された宇宙ベンチャー企業。小型人工衛星の設計・製造から打ち上げ、運用までをワンストップで提供しています。これまでに10機以上の衛星を軌道に投入し、地球観測データの収集・解析サービスを展開。民間企業による宇宙利用の普及に貢献しています。",
    website: "https://example.com",
    twitter: "@spacetechcorp",
    linkedin: "company/spacetechcorp",
    email: "info@spacetech.example.com",
    category: "衛星開発",
    established: "2018年4月",
    activities: [
      "小型人工衛星の設計・製造",
      "衛星データを活用した地球観測サービス",
      "宇宙技術の研究開発",
      "宇宙教育プログラムの支援",
    ],
    achievements: [
      "10機以上の人工衛星を軌道投入",
      "国内外の研究機関との共同プロジェクト実施",
      "宇宙ビジネスアワード2023受賞",
    ],
  },
  "astronomy-society": {
    id: "astronomy-society",
    name: "日本天文愛好者協会",
    type: "organization",
    logo: "/astronomy-society-logo.png",
    description: "天文観測や星空の普及活動を行う非営利団体",
    detailedDescription:
      "1985年に設立された天文愛好者のための非営利団体。全国47都道府県に支部を持ち、会員数は約5,000名。定期的な観測会や講演会の開催、天文雑誌の発行、学校への出張授業など、幅広い活動を通じて天文学の普及に努めています。",
    website: "https://example.com",
    twitter: "@astro_society",
    facebook: "astronomysocietyjp",
    instagram: "@astronomy_society_jp",
    email: "contact@astro-society.example.com",
    category: "天文普及",
    established: "1985年6月",
    activities: [
      "定期的な星空観測会の開催",
      "天文講演会・セミナーの実施",
      "学校への出張授業",
      "天文雑誌「星空の世界」の発行",
      "天体観測施設の運営",
    ],
    achievements: ["全国47都道府県に支部設立", "累計10万人以上が観測会に参加", "天文教育功労賞受賞"],
  },
  "rocket-industries": {
    id: "rocket-industries",
    name: "ロケット工業株式会社",
    type: "company",
    logo: "/rocket-company-logo.jpg",
    description: "ロケットエンジンの研究開発を専門とする企業",
    detailedDescription:
      "1995年創業のロケット推進技術専門企業。液体燃料ロケットエンジンの設計・製造を中心に、次世代推進システムの研究開発を行っています。JAXAをはじめとする宇宙機関や民間企業への技術提供を通じて、日本の宇宙開発を支えています。",
    website: "https://example.com",
    linkedin: "company/rocketindustries",
    email: "info@rocketind.example.com",
    category: "ロケット",
    established: "1995年9月",
    activities: [
      "ロケットエンジンの設計・製造",
      "次世代推進システムの研究開発",
      "燃焼試験施設の運営",
      "宇宙機関・民間企業への技術支援",
    ],
    achievements: ["50機以上のロケットにエンジンを供給", "再使用型ロケットエンジンの開発成功", "産業技術大賞受賞"],
  },
  "space-education-npo": {
    id: "space-education-npo",
    name: "NPO法人宇宙教育推進機構",
    type: "organization",
    logo: "/space-education-npo-logo.jpg",
    description: "子どもたちに宇宙の魅力を伝える教育プログラムを提供",
    detailedDescription:
      "2010年に設立されたNPO法人。「すべての子どもたちに宇宙の夢を」をミッションに、学校や地域での宇宙教育プログラムを展開しています。ロケット製作体験、宇宙飛行士との交流イベント、天体観測会など、体験型の学習機会を提供し、次世代の宇宙人材育成に貢献しています。",
    website: "https://example.com",
    twitter: "@space_edu",
    facebook: "spaceeducationnpo",
    email: "info@spaceedu.example.com",
    category: "教育",
    established: "2010年3月",
    activities: [
      "学校向け宇宙教育プログラムの提供",
      "モデルロケット製作・打ち上げ体験",
      "宇宙飛行士との交流イベント",
      "教員向け研修プログラム",
      "オンライン宇宙講座の配信",
    ],
    achievements: ["累計300校以上でプログラム実施", "参加者数5万人突破", "文部科学大臣賞受賞"],
  },
  "satellite-data-inc": {
    id: "satellite-data-inc",
    name: "衛星データ解析株式会社",
    type: "company",
    logo: "/satellite-data-company-logo.jpg",
    description: "人工衛星からのデータを活用した地球観測ソリューションを提供",
    detailedDescription:
      "2015年設立のデータ解析専門企業。人工衛星から得られる地球観測データをAI技術で解析し、農業、防災、都市計画など幅広い分野に活用可能な情報を提供しています。宇宙データの民主化を目指し、使いやすいクラウドプラットフォームを開発・運営しています。",
    website: "https://example.com",
    twitter: "@satellitedata",
    linkedin: "company/satellitedatainc",
    email: "contact@satdata.example.com",
    category: "データ解析",
    established: "2015年7月",
    activities: [
      "衛星データ解析プラットフォームの開発・運営",
      "AI/機械学習による画像解析",
      "農業・防災分野へのソリューション提供",
      "企業向けデータ活用コンサルティング",
    ],
    achievements: ["300社以上の企業に導入", "衛星データ解析精度95%達成", "イノベーションアワード受賞"],
  },
  "space-artists-collective": {
    id: "space-artists-collective",
    name: "宇宙アート協会",
    type: "organization",
    logo: "/space-art-collective-logo.jpg",
    description: "宇宙をテーマにしたアート作品の制作と展示活動",
    detailedDescription:
      "2012年に設立されたアーティスト団体。宇宙をテーマにした絵画、彫刻、インスタレーション、パフォーマンスなど多様な表現活動を行っています。科学と芸術の融合を目指し、宇宙機関や科学館とのコラボレーション展示も多数実施。宇宙の美しさと神秘を芸術を通じて伝えています。",
    twitter: "@space_artists",
    facebook: "spaceartistscollective",
    instagram: "@space_artists_collective",
    email: "info@spaceart.example.com",
    category: "アート",
    established: "2012年11月",
    activities: [
      "宇宙アート作品の制作・展示",
      "科学館・美術館でのコラボレーション展",
      "アートワークショップの開催",
      "宇宙×アートのオンラインギャラリー運営",
    ],
    achievements: ["国内外50以上の展覧会を開催", "JAXA協力の宇宙アート展実施", "アートアワード2022グランプリ受賞"],
  },
}

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  const partner = partnersData[params.id]

  if (!partner) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-accent/20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/e3-82-b9-e3-82-af-e3-83-aa-e3-83-bc-e3-83-b3-e3-82-b7-e3-83-a7-e3-83-83-e3-83-88-202025-12-31-20000017.png"
                alt="Cosmo Base"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/value" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                提供する価値
              </Link>
              <Link
                href="/resources"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                資料館
              </Link>
              <Link href="/partners" className="text-sm font-medium text-accent">
                パートナー紹介
              </Link>
              <Button asChild size="sm" className="bg-accent text-primary hover:bg-accent/90">
                <Link href="#join">コミュニティに参加</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="border-b border-accent/20 bg-primary/10">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            パートナー一覧に戻る
          </Link>
        </div>
      </div>

      {/* Partner Header */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-background/50 border border-accent/30">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={120}
                  className="h-28 w-28 object-contain"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                    partner.type === "company" ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {partner.type === "company" ? (
                    <>
                      <Building2 className="h-4 w-4" />
                      企業
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4" />
                      団体
                    </>
                  )}
                </div>
                <div className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                  {partner.category}
                </div>
              </div>
              <h1 className="mb-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">{partner.name}</h1>
              <p className="mb-4 text-lg text-foreground/80">{partner.description}</p>
              <p className="text-sm text-foreground/60">設立: {partner.established}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="border-y border-accent/20 bg-primary/10 py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-background/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Globe className="h-4 w-4" />
                公式サイト
              </a>
            )}
            {partner.twitter && (
              <a
                href={`https://twitter.com/${partner.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-background/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Twitter className="h-4 w-4" />
                {partner.twitter}
              </a>
            )}
            {partner.linkedin && (
              <a
                href={`https://linkedin.com/${partner.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-background/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            {partner.facebook && (
              <a
                href={`https://facebook.com/${partner.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-background/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            )}
            {partner.instagram && (
              <a
                href={`https://instagram.com/${partner.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-background/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Instagram className="h-4 w-4" />
                {partner.instagram}
              </a>
            )}
            {partner.email && (
              <a
                href={`mailto:${partner.email}`}
                className="flex items-center gap-2 rounded-lg bg-background/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                <Mail className="h-4 w-4" />
                メール
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">概要</h2>
          <p className="text-lg leading-relaxed text-foreground/80">{partner.detailedDescription}</p>
        </div>
      </section>

      {/* Activities */}
      <section className="border-t border-accent/20 bg-primary/10 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">主な活動内容</h2>
          <ul className="space-y-3">
            {partner.activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-lg text-foreground/80">{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">主な実績</h2>
          <ul className="space-y-3">
            {partner.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />
                <span className="text-lg text-foreground/80">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-foreground/60">
            <p>&copy; 2025 Cosmo Base. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
