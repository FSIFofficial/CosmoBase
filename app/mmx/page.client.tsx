"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Rocket, ImageUp, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

// Googleフォーム「MMXチームへの寄せ書きキャンペーン」の送信先と各項目のentry ID
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdONvVqVtKrvOXeA98KbvNxc9zPXj6mhELyg0WJBCOe6gCeAQ/formResponse"
const ENTRY_NICKNAME = "entry.86454892" // ニックネーム
const ENTRY_MESSAGE = "entry.630086220" // 応援メッセージ
const ENTRY_ILLUSTRATION_URL = "entry.18610883" // 応援イラスト(アップロード画像のURLを記載)

const ILLUSTRATION_BUCKET = "MMX"
const MAX_FILE_SIZE_MB = 10

export default function MMXPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [nickname, setNickname] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setFileError("")

    if (!selected) {
      setFile(null)
      setPreviewUrl(null)
      return
    }

    if (!selected.type.startsWith("image/")) {
      setFileError("画像ファイルを選択してください。")
      e.target.value = ""
      return
    }

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`ファイルサイズは${MAX_FILE_SIZE_MB}MB以内にしてください。`)
      e.target.value = ""
      return
    }

    if (!supabase) {
      setFileError("現在、画像アップロード機能は準備中です。しばらくしてから再度お試しください。")
      e.target.value = ""
      return
    }

    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  const clearFile = () => {
    setFile(null)
    setPreviewUrl(null)
    setFileError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const uploadIllustration = async (): Promise<string> => {
    if (!file || !supabase) return ""

    const ext = file.name.includes(".") ? file.name.split(".").pop() : "png"
    const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage.from(ILLUSTRATION_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })
    if (error) throw error

    const { data } = supabase.storage.from(ILLUSTRATION_BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setIsSubmitting(true)

    try {
      const illustrationUrl = await uploadIllustration()

      const formData = new FormData()
      formData.append(ENTRY_NICKNAME, nickname)
      formData.append(ENTRY_MESSAGE, message)
      formData.append(ENTRY_ILLUSTRATION_URL, illustrationUrl)

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      })

      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />

      <section className="py-20 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6">
                <Rocket className="h-5 w-5 text-[#83CBEB]" />
                <span className="text-[#83CBEB] text-sm font-sans tracking-widest">共催:Cosmo Base,FSIF</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#EEEEFF] mb-6 text-balance">
                MMXチームへの寄せ書きキャンペーン
              </h1>
              <p className="text-[#EEEEFF]/80 font-sans leading-relaxed text-left md:text-center">
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

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-4 md:p-8 w-full">
              {isSuccess ? (
                <div className="text-center p-12 bg-[#000033] border border-[#83CBEB]/30 rounded-lg">
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">ご協力ありがとうございます！</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                    寄せ書きを受け付けました。
                    <br />
                    まとめてMMXチームの皆様へお届けします。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">
                      ニックネーム <span className="text-red-400">*</span>
                    </label>
                    <p className="text-[#EEEEFF]/50 text-xs mb-2">
                      頂いたメッセージと合わせて記載されるお名前です。匿名を希望される場合、「匿名希望」とお書きください。
                    </p>
                    <input
                      type="text"
                      required
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                      placeholder="宇宙 太郎"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">応援メッセージ</label>
                    <p className="text-[#EEEEFF]/50 text-xs mb-2">
                      MMXチームの皆様への応援メッセージをご自由にお寄せください！
                      <br />
                      例:MMXの新しい発見に期待しています！
                      <br />
                      ※個人情報、誹謗中傷が含まれる記載はおやめください。
                    </p>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors resize-none"
                      placeholder="例:MMXの新しい発見に期待しています！"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EEEEFF] font-sans text-sm mb-2">応援イラスト</label>
                    <p className="text-[#EEEEFF]/50 text-xs mb-3">
                      【デジタルの場合】
                      <br />
                      正方形の画像で1000×1000px以上を目安にメッセージやイラストをお描きください。
                      <br />
                      <br />
                      【アナログの場合】
                      <br />
                      正方形の中にメッセージやイラストを描いた後に、スマートフォン等で真上から撮影するか、コンビニ等でスキャンしてください。注意:サイズを合わせるために画像を縮小する可能性がありますので、細かすぎないよう留意していただきますようお願いします。
                      <br />
                      <br />
                      撮影する際は、できるだけ明るい場所で、影が入らないようにしてください。
                      <br />
                      多少の傾きや明るさの違いなどは、こちらで調整しますのでご安心ください。
                      <br />
                      <br />
                      ※個人情報、誹謗中傷を含むものや、公序良俗に反するものはおやめください。
                    </p>

                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img
                          src={previewUrl}
                          alt="アップロードするイラストのプレビュー"
                          className="w-40 h-40 object-cover rounded-lg border border-[#83CBEB]/30"
                        />
                        <button
                          type="button"
                          onClick={clearFile}
                          aria-label="画像を削除"
                          className="absolute -top-2 -right-2 bg-[#000033] border border-[#83CBEB]/50 rounded-full p-1 text-[#EEEEFF] hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 w-full border border-dashed border-[#83CBEB]/40 rounded-lg p-8 cursor-pointer hover:border-[#83CBEB] transition-colors">
                        <ImageUp className="w-8 h-8 text-[#83CBEB]" />
                        <span className="text-[#EEEEFF]/70 text-sm">タップして画像を選択</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    {fileError && <p className="text-red-400 text-xs mt-2">{fileError}</p>}
                  </div>

                  {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

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
