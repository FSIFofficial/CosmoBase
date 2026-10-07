"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Rocket } from "lucide-react"

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdONvVqVtKrvOXeA98KbvNxc9zPXj6mhELyg0WJBCOe6gCeAQ/viewform?embedded=true"

export default function MMXPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6">
                <Rocket className="h-5 w-5 text-[#83CBEB]" />
                <span className="text-[#83CBEB] text-sm font-sans tracking-widest">共催:FSIF</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-6 text-balance">
                MMXチームへの寄せ書きキャンペーン
              </h1>
              <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                10月20日打ち上げ予定の火星衛星探査計画「MMX」探査機の旅路を応援しよう！
                <br />
                参加方法
                <br />
                ・応援メッセージ
                <br />
                ・応援イラスト（アナログ、デジタル問わず）
                <br />
                頂いた寄せ書きは、まとめてMMXチームの皆様へお届けする予定です。
              </p>
            </div>

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-2 md:p-4 w-full overflow-hidden">
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                width="100%"
                height="1400"
                className="rounded-xl bg-white"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
              >
                読み込んでいます…
              </iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
