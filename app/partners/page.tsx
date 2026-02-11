"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Users, Search, Globe, Twitter } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

type PartnerType = "company" | "organization"

interface Partner {
  id: string
  name: string
  type: PartnerType
  logo: string
  description: string
  website?: string
  twitter?: string
  category: string
}

const partners: Partner[] = [
  {
    id: "space-tech-corp",
    name: "株式会社スペーステック",
    type: "company",
    logo: "/space-technology-company-logo.jpg",
    description: "小型人工衛星の開発・運用を手がける宇宙ベンチャー企業",
    website: "https://example.com",
    twitter: "@spacetechcorp",
    category: "衛星開発",
  },
  {
    id: "astronomy-society",
    name: "日本天文愛好者協会",
    type: "organization",
    logo: "/astronomy-society-logo.png",
    description: "天文観測や星空の普及活動を行う非営利団体",
    website: "https://example.com",
    twitter: "@astro_society",
    category: "天文普及",
  },
  {
    id: "rocket-industries",
    name: "ロケット工業株式会社",
    type: "company",
    logo: "/rocket-company-logo.jpg",
    description: "ロケットエンジンの研究開発を専門とする企業",
    website: "https://example.com",
    category: "ロケット",
  },
  {
    id: "space-education-npo",
    name: "NPO法人宇宙教育推進機構",
    type: "organization",
    logo: "/space-education-npo-logo.jpg",
    description: "子どもたちに宇宙の魅力を伝える教育プログラムを提供",
    website: "https://example.com",
    twitter: "@space_edu",
    category: "教育",
  },
  {
    id: "satellite-data-inc",
    name: "衛星データ解析株式会社",
    type: "company",
    logo: "/satellite-data-company-logo.jpg",
    description: "人工衛星からのデータを活用した地球観測ソリューションを提供",
    website: "https://example.com",
    category: "データ解析",
  },
  {
    id: "space-artists-collective",
    name: "宇宙アート協会",
    type: "organization",
    logo: "/space-art-collective-logo.jpg",
    description: "宇宙をテーマにしたアート作品の制作と展示活動",
    twitter: "@space_artists",
    category: "アート",
  },
]

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | PartnerType>("all")

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || partner.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-[#000033]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#EEEEFF] sm:text-5xl lg:text-6xl text-balance">
              パートナー企業・団体
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#EEEEFF]/80 text-pretty">
              Cosmo Baseと共に宇宙の未来を創るパートナー企業・団体をご紹介します
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#EEEEFF]/40" />
              <Input
                type="text"
                placeholder="企業・団体名、活動内容で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#000033]/50 border-[#83CBEB]/30 text-[#EEEEFF]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                className={
                  filterType === "all"
                    ? "bg-[#83CBEB] text-[#000033]"
                    : "border-[#83CBEB]/30 text-[#EEEEFF] bg-transparent"
                }
              >
                すべて
              </Button>
              <Button
                variant={filterType === "company" ? "default" : "outline"}
                onClick={() => setFilterType("company")}
                className={
                  filterType === "company"
                    ? "bg-[#83CBEB] text-[#000033]"
                    : "border-[#83CBEB]/30 text-[#EEEEFF] bg-transparent"
                }
              >
                <Building2 className="mr-2 h-4 w-4" />
                企業
              </Button>
              <Button
                variant={filterType === "organization" ? "default" : "outline"}
                onClick={() => setFilterType("organization")}
                className={
                  filterType === "organization"
                    ? "bg-[#83CBEB] text-[#000033]"
                    : "border-[#83CBEB]/30 text-[#EEEEFF] bg-transparent"
                }
              >
                <Users className="mr-2 h-4 w-4" />
                団体
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((partner) => (
              <Link
                key={partner.id}
                href={`/partners/${partner.id}`}
                className="group relative overflow-hidden rounded-lg border border-[#83CBEB]/30 bg-[#000033]/30 p-6 transition-all hover:border-[#83CBEB] hover:bg-[#000033]/50"
              >
                {/* Type Badge */}
                <div className="absolute right-4 top-4">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      partner.type === "company" ? "bg-[#83CBEB]/20 text-[#83CBEB]" : "bg-[#EEEEBB]/20 text-[#EEEEBB]"
                    }`}
                  >
                    {partner.type === "company" ? (
                      <>
                        <Building2 className="h-3 w-3" />
                        企業
                      </>
                    ) : (
                      <>
                        <Users className="h-3 w-3" />
                        団体
                      </>
                    )}
                  </div>
                </div>

                {/* Logo */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-[#EEEEFF]/5">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={80}
                    height={80}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-serif text-xl font-bold text-[#EEEEFF] group-hover:text-[#83CBEB] transition-colors">
                  {partner.name}
                </h3>
                <p className="mb-3 text-sm text-[#EEEEFF]/70 line-clamp-2">{partner.description}</p>
                <div className="inline-block rounded-full bg-[#83CBEB]/10 px-3 py-1 text-xs font-medium text-[#83CBEB]">
                  {partner.category}
                </div>

                {/* Links */}
                <div className="mt-4 flex items-center gap-3 border-t border-[#83CBEB]/20 pt-4">
                  {partner.website && (
                    <div className="flex items-center gap-1.5 text-xs text-[#EEEEFF]/60">
                      <Globe className="h-4 w-4" />
                      <span>HP</span>
                    </div>
                  )}
                  {partner.twitter && (
                    <div className="flex items-center gap-1.5 text-xs text-[#EEEEFF]/60">
                      <Twitter className="h-4 w-4" />
                      <span>{partner.twitter}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-[#EEEEFF]/60">検索条件に一致するパートナーが見つかりませんでした</p>
            </div>
          )}
        </div>
      </section>

      {/* Partner Program Section */}
      <section className="border-t border-[#83CBEB]/20 bg-gradient-to-br from-[#83CBEB]/5 to-[#EEEEBB]/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#EEEEFF] sm:text-4xl text-balance mb-4">
              パートナー制度について
            </h2>
            <p className="text-lg text-[#EEEEFF]/80 max-w-3xl mx-auto text-pretty">
              Cosmo Baseと一緒に宇宙の可能性を広げていきましょう
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#000033]/60 border border-[#83CBEB]/30 rounded-xl p-6">
              <h3 className="font-serif text-xl text-[#EEEEFF] mb-4">パートナー対象</h3>
              <ul className="space-y-3 text-[#EEEEFF]/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>企業（宇宙系・非宇宙系問わず）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>学生団体（大学・高専サークル等）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#83CBEB] mt-1">•</span>
                  <span>教育・研究団体</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#000033]/60 border border-[#EEEEBB]/30 rounded-xl p-6">
              <h3 className="font-serif text-xl text-[#EEEEFF] mb-4">主なメリット</h3>
              <ul className="space-y-3 text-[#EEEEFF]/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>コミュニティー内での情報発信</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>学生・他産業との接点創出</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>イベント・企画への参画機会</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EEEEBB] mt-1">•</span>
                  <span>将来の事業・人材の種まき</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/partner">
              <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6">
                パートナー制度の詳細を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
