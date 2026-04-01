import { notFound } from "next/navigation"
import Link from "next/link"
import { Building2, Users, Globe, ChevronLeft, Facebook, Instagram } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPartners, getPartnerById } from "@/lib/partners"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const partners = await getPartners()
  return partners.map((partner) => ({
    id: partner.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const partner = await getPartnerById(id)

  if (!partner) {
    return {
      title: "パートナーが見つかりません",
    }
  }

  return {
    title: partner.name,
    description: partner.description,
    openGraph: {
      title: `${partner.name} | パートナー紹介`,
      description: partner.description,
      images: partner.logo ? [partner.logo] : [],
    },
  }
}

// URLを綺麗にリンク化するためのヘルパー関数
function getSocialUrl(platform: 'twitter' | 'facebook' | 'instagram', value: string) {
  if (value.startsWith('http')) return value;
  const cleanValue = value.replace("@", "");
  switch (platform) {
    case 'twitter': return `https://x.com/${cleanValue}`;
    case 'facebook': return `https://facebook.com/${cleanValue}`;
    case 'instagram': return `https://instagram.com/${cleanValue}`;
  }
}

export default async function PartnerDetailPage({ params }: Props) {
  const { id } = await params
  const partner = await getPartnerById(id)

  if (!partner) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <main>
        {/* Back Button */}
        <div className="border-b border-[#83CBEB]/20 bg-[#000033]/50">
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#EEEEFF]/80 hover:text-[#83CBEB] transition-colors"
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
              
              {/* ▼ ロゴ画像：縦長・横長対応 (縦横に余裕を持たせたコンテナ＋object-contain) ▼ */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <div className="flex h-40 w-full sm:w-56 p-4 items-center justify-center rounded-lg bg-[#EEEEFF]/5 border border-[#83CBEB]/30">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-4xl">🚀</span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                      partner.type === "company" ? "bg-[#83CBEB]/20 text-[#83CBEB]" : "bg-[#EEEEBB]/20 text-[#EEEEBB]"
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
                  <div className="rounded-full bg-[#83CBEB]/10 px-4 py-1.5 text-sm font-medium text-[#83CBEB]">
                    {partner.category}
                  </div>
                </div>
                <h1 className="mb-3 font-serif text-3xl font-bold text-[#EEEEFF] sm:text-4xl">{partner.name}</h1>
                <p className="mb-4 text-lg text-[#EEEEFF]/80">{partner.description}</p>
                {partner.established && (
                  <p className="text-sm text-[#EEEEFF]/60">設立: {partner.established}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Links Section (各種SNSリンク) */}
        <section className="border-y border-[#83CBEB]/20 bg-[#000033]/30 py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#000033]/50 border border-[#83CBEB]/30 px-4 py-2 text-sm font-medium text-[#EEEEFF] hover:bg-[#83CBEB]/10 transition-colors"
                >
                  <Globe className="h-4 w-4 text-[#83CBEB]" />
                  公式サイト
                </a>
              )}
              {partner.twitter && (
                <a
                  href={getSocialUrl('twitter', partner.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#000033]/50 border border-[#83CBEB]/30 px-4 py-2 text-sm font-medium text-[#EEEEFF] hover:bg-[#83CBEB]/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="#83CBEB" className="h-4 w-4" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </a>
              )}
              {partner.facebook && (
                <a
                  href={getSocialUrl('facebook', partner.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#000033]/50 border border-[#83CBEB]/30 px-4 py-2 text-sm font-medium text-[#EEEEFF] hover:bg-[#83CBEB]/10 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-[#83CBEB]" />
                  Facebook
                </a>
              )}
              {partner.instagram && (
                <a
                  href={getSocialUrl('instagram', partner.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#000033]/50 border border-[#83CBEB]/30 px-4 py-2 text-sm font-medium text-[#EEEEFF] hover:bg-[#83CBEB]/10 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-[#83CBEB]" />
                  Instagram
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#EEEEFF]">概要</h2>
            <p className="text-lg leading-relaxed text-[#EEEEFF]/80 whitespace-pre-wrap">{partner.detailedDescription}</p>
          </div>
        </section>

        {/* Activities */}
        {partner.activities && (
          <section className="border-t border-[#83CBEB]/20 bg-[#000033]/30 py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#EEEEFF]">主な活動内容</h2>
              <p className="text-lg leading-relaxed text-[#EEEEFF]/80 whitespace-pre-wrap">{partner.activities}</p>
            </div>
          </section>
        )}

        {/* Achievements */}
        {partner.achievements && (
          <section className="py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#EEEEFF]">主な実績</h2>
              <p className="text-lg leading-relaxed text-[#EEEEFF]/80 whitespace-pre-wrap">{partner.achievements}</p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
