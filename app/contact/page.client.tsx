"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, MessageSquare } from "lucide-react"

export default function ContactPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">
                お問い合わせ
              </h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                ご質問、ご相談などお気軽にお問い合わせください
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#83CBEB]/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-[#83CBEB]" />
                </div>
                <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">よくある質問</h3>
                <p className="text-[#EEEEFF]/60 text-sm mb-4">
                  お問い合わせの前に、解決できる項目がないかご確認ください。
                </p>
                <a href="faq" className="text-[#83CBEB] text-sm hover:underline font-bold">
                  よくある質問を見る →
                </a>
              </div>

              <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#EEEEBB]/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#EEEEBB]" />
                </div>
                <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">パートナー提携について</h3>
                <p className="text-[#EEEEFF]/60 text-sm mb-4">
                  提携やカジュアル面談をご希望の方は専用フォームをご利用ください。
                </p>
                <a href="partner" className="text-[#EEEEBB] text-sm hover:underline font-bold">
                  パートナー申請へ →
                </a>
              </div>
            </div>

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-4 md:p-8">
              <div className="flex flex-col items-center">
                <iframe
                  src="https://forms.gle/d7SGVtM7LtBviwqR9"
                  width="640"
                  height="1100"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="max-w-full bg-white/5 rounded-lg"
                >
                  読み込んでいます…
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

