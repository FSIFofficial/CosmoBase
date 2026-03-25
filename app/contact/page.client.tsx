"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ▼▼▼ Google Form の内部情報をここに設定します ▼▼▼
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeVzG0N4XFX58aPgTOkIb8fDGvv8cHppW3YquJBAPWZoZ8pXg/formResponse"
  const ENTRY_NAME = "entry.1346307781"    // 「お名前」のID
  const ENTRY_EMAIL = "entry.371094765"   // 「メールアドレス」のID
  const ENTRY_SUBJECT = "entry.1310145728" // 「件名」のID
  const ENTRY_BODY = "entry.571514707"    // 「お問い合わせ内容」のID
  // ▲▲▲ 設定ここまで ▲▲▲

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append(ENTRY_NAME, name)
    formData.append(ENTRY_EMAIL, email)
    formData.append(ENTRY_SUBJECT, subject)
    formData.append(ENTRY_BODY, body)

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      })
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      alert("送信に失敗しました。時間をおいて再度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20 w-full">
        <div className="container mx-auto px-4 w-full">
          {/* ▼ ここに w-full を追加して枠が縮まないようにしました ▼ */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">
                お問い合わせ
              </h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                ご質問、ご相談などお気軽にお問い合わせください
              </p>
            </div>

            {/* ▼ 2列のグリッドにも w-full を追加して横並びを強制します ▼ */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 w-full">
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

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-4 md:p-8 w-full">
              {isSuccess ? (
                <div className="text-center p-12 bg-[#000033] border border-[#83CBEB]/30 rounded-lg">
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">お問い合わせ完了</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                    メッセージを送信しました。自動返信メールをご確認ください。<br />
                    担当者より順次ご連絡させていただきます。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto bg-transparent">
                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">お名前 <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                      placeholder="宇宙 太郎"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">メールアドレス <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                      placeholder="example@cosmobase.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">件名 <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                      placeholder="お問い合わせ内容"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">お問い合わせ内容 <span className="text-red-400">*</span></label>
                    <textarea
                      required
                      rows={5}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors resize-none"
                      placeholder="ご質問やメッセージをご記入ください。"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-bold py-6 text-lg rounded-md transition-colors"
                  >
                    {isSubmitting ? "送信中..." : "送信する"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
