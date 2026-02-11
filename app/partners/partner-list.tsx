"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Users, Search, Globe, Twitter } from "lucide-react"
import Image from "next/image"
import { Partner } from "@/lib/partners"

type PartnerType = "company" | "organization"

// 親(page.tsx)からデータを受け取る
export default function PartnerList({ initialPartners }: { initialPartners: Partner[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | PartnerType>("all")

  const filteredPartners = initialPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || partner.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <>
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
    </>
  )
}