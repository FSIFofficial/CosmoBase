"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Check, ImageUp, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

// MMXの打ち上げは2026年10月20日(日本時間)を予定
const LAUNCH_DATE = new Date("2026-10-20T04:41:03+09:00")

// Googleフォーム「MMXチームへの寄せ書きキャンペーン」の送信先と各項目のentry ID
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdONvVqVtKrvOXeA98KbvNxc9zPXj6mhELyg0WJBCOe6gCeAQ/formResponse"
const ENTRY_NICKNAME = "entry.86454892" // ニックネーム
const ENTRY_MESSAGE = "entry.630086220" // 応援メッセージ
const ENTRY_ILLUSTRATION_URL = "entry.18610883" // 応援イラスト(アップロード画像のURLを記載)

const ILLUSTRATION_BUCKET = "MMX"
const MAX_FILE_SIZE_MB = 10

// 「応援コメント」一覧の公開表示は、まだ実データを集計する仕組みがないため、
// 機能(送信フォーム本体)は残したまま表示だけ一旦オフにしている。
const SHOW_VOICES = false

function Countdown() {
  // サーバー側レンダリングと初回描画を一致させるため、実際の値はマウント後に計算する
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, LAUNCH_DATE.getTime() - Date.now()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const totalSeconds = remaining === null ? null : Math.floor(remaining / 1000)
  const days = totalSeconds === null ? null : Math.floor(totalSeconds / 86400)
  const hours = totalSeconds === null ? null : Math.floor((totalSeconds % 86400) / 3600)
  const minutes = totalSeconds === null ? null : Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds === null ? null : totalSeconds % 60
  const format = (value: number | null, digits: number) =>
    value === null ? "—".repeat(digits) : String(value).padStart(digits, "0")

  const unit = (value: number | null, digits: number, label: string) => (
    <span className="flex flex-col items-center">
      <b className="text-3xl md:text-5xl font-serif text-[#EEEEFF] tabular-nums">{format(value, digits)}</b>
      <small className="text-[10px] md:text-xs tracking-widest text-[#83CBEB]/70 mt-1">{label}</small>
    </span>
  )

  return (
    <div
      className="flex items-center justify-center gap-3 md:gap-6"
      aria-label="打ち上げまでのカウントダウン"
    >
      {unit(days, 3, "DAYS")}
      <i className="text-2xl md:text-4xl text-[#83CBEB]/40 -mt-4">:</i>
      {unit(hours, 2, "HOURS")}
      <i className="text-2xl md:text-4xl text-[#83CBEB]/40 -mt-4">:</i>
      {unit(minutes, 2, "MINUTES")}
      <i className="text-2xl md:text-4xl text-[#83CBEB]/40 -mt-4">:</i>
      {unit(seconds, 2, "SECONDS")}
    </div>
  )
}

export default function MMXPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showForm, setShowForm] = useState(false)
  const [nickname, setNickname] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [sent, setSent] = useState(false)

  // 「応援コメント」の公開一覧(VOICES)用。実際の投稿データを集計する仕組みがまだないため
  // SHOW_VOICES=false の間は表示しない。ダミーの初期値のみ保持。
  const [comments] = useState([
    { name: "Sora", message: "MMXの挑戦が、火星への新しい扉を開きますように。応援しています。" },
    { name: "K. Tanaka", message: "日本の宇宙探査の次の一歩。打ち上げの日を楽しみにしています！" },
    { name: "Cosmo Base", message: "すべてのチームの皆さまへ、地球から熱いエールを送ります。" },
  ])

  useEffect(() => {
    if (!sent) return
    const timer = window.setTimeout(() => setSent(false), 4000)
    return () => window.clearTimeout(timer)
  }, [sent])

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

  const resetForm = () => {
    setNickname("")
    setMessage("")
    clearFile()
    setSubmitError("")
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

      resetForm()
      setShowForm(false)
      setSent(true)
    } catch (error) {
      console.error(error)
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#000033] text-[#EEEEFF] overflow-x-hidden">
      {/* ナビゲーション(サイト共通ヘッダーは使わず、このページ専用) */}
      <nav className="sticky top-0 z-40 border-b border-[#83CBEB]/20 bg-[#000033]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#83CBEB]/10 border border-[#83CBEB]/40 text-[#83CBEB] text-xs font-bold font-sans">
              CB
            </span>
            <span className="text-sm font-sans text-[#EEEEFF]/80 whitespace-nowrap">
              Cosmo Base <em className="text-[#83CBEB] not-italic">×</em> MMX SUPPORT
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a href="#about" className="hidden sm:inline text-sm text-[#EEEEFF]/70 hover:text-[#83CBEB] transition-colors font-sans">
              MMXについて
            </a>
            <Link
              href="https://www.mmx.jaxa.jp/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#83CBEB] hover:text-[#83CBEB]/80 transition-colors font-sans"
            >
              PROJECT INFO <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section id="top" className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(131,203,235,0.5) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-[#83CBEB]/10 blur-3xl -z-10"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-[#83CBEB] font-sans mb-6">
                <span className="w-6 h-px bg-[#83CBEB]" />A MESSAGE TO MARS
              </p>
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] leading-tight mb-6 text-balance">
                地球から、
                <br />
                <em className="not-italic text-[#83CBEB]">火星</em>へ。
              </h1>
              <p className="text-lg text-[#EEEEFF]/80 font-sans mb-8">MMXの挑戦を、みんなの声で応援しよう。</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-bold px-8 py-6 text-base rounded-full"
              >
                応援コメントを打ち込む <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <p className="text-xs text-[#EEEEFF]/50 font-sans mt-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                この企画は、個人(FSIFメンバー)とCosmo Baseによる応援企画です。MMX公式のプロジェクトではありません。
              </p>
              <div className="hidden lg:flex items-center gap-2 text-xs tracking-widest text-[#EEEEFF]/40 font-sans mt-12">
                <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" /> SCROLL TO EXPLORE
              </div>
            </div>

            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
              <div
                className="absolute inset-[-2rem] rounded-full border border-[#83CBEB]/20"
                aria-hidden="true"
              />
              <div
                className="absolute inset-[-4rem] rounded-full border border-[#83CBEB]/10"
                aria-hidden="true"
              />
              <div className="absolute inset-0 rounded-full bg-[#83CBEB]/20 blur-2xl" aria-hidden="true" />
              <img
                src="/PIA10369.jpg"
                alt="火星の衛星フォボス(NASA/JPL-Caltech/University of Arizona)"
                className="relative w-full h-full object-cover rounded-full border border-[#83CBEB]/30 shadow-2xl"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between text-xs tracking-widest text-[#EEEEFF]/40 font-sans mt-20 pt-6 border-t border-[#83CBEB]/10">
            <span>FSIF presents</span>
            <span className="text-right">
              PHOBOS SAMPLE RETURN
              <br />
              MISSION
            </span>
            <span>01 / 03</span>
          </div>
        </div>
      </section>

      {/* カウントダウン */}
      <section className="py-16 border-y border-[#83CBEB]/10 bg-[#000033]/60">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.3em] text-[#83CBEB] font-sans mb-2">NEXT MILESTONE</p>
          <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-10">打ち上げまで、あと</h2>
          <Countdown />
          <p className="text-xs text-[#EEEEFF]/50 font-sans mt-10">※ 打ち上げ予定:2026年10月20日(日本時間)</p>
        </div>
      </section>

      {/* MMXについて */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-xs tracking-widest text-[#EEEEFF]/40 font-sans mb-10">
            01 <span className="text-[#83CBEB]">ABOUT MMX</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#83CBEB] font-sans mb-4">MARS MOONS EXPLORATION</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#EEEEFF] leading-snug text-balance">
                火星の衛星から、
                <br />
                <em className="not-italic text-[#83CBEB]">太陽系の起源</em>を探る。
              </h2>
            </div>
            <div className="space-y-6 font-sans text-[#EEEEFF]/80 leading-relaxed">
              <p>
                MMX(Martian Moons eXploration)は、JAXAが進める火星衛星探査計画です。火星の衛星フォボスからサンプルを持ち帰り、火星圏の謎と太陽系の成り立ちに迫ります。
              </p>
              <p>
                本企画は、個人(FSIFメンバー)とCosmo
                Baseが共催する、MMXへの応援プロジェクトです。MMX公式と共同で実施するものではありません。
              </p>
              <div className="bg-[#000033]/80 border border-[#83CBEB]/20 rounded-xl p-5">
                <strong className="block text-[#EEEEFF] text-sm mb-2">ご参加の前に</strong>
                <span className="text-sm text-[#EEEEFF]/70">
                  いただいたコメントが必ずMMX関係者へ届けられることを保証するものではありません。個人情報は入力せず、公開されてもよい内容のみお寄せください。
                </span>
              </div>
              <Link
                href="https://www.mmx.jaxa.jp/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#83CBEB] hover:text-[#83CBEB]/80 transition-colors font-bold"
              >
                MMX PROJECT SITE <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 応援コメント一覧(VOICES) - 実データ集計の仕組みができるまで非表示 */}
      {SHOW_VOICES && (
        <section id="voices" className="py-24 border-t border-[#83CBEB]/10 bg-[#000033]/60">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 text-xs tracking-widest text-[#EEEEFF]/40 font-sans mb-10">
              02 <span className="text-[#83CBEB]">VOICES FROM EARTH</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#83CBEB] font-sans mb-4">YOUR MESSAGE MATTERS</p>
                <h2 className="text-3xl md:text-4xl font-serif text-[#EEEEFF] text-balance">
                  みんなの声を、
                  <br />
                  <em className="not-italic text-[#83CBEB]">火星へ届けよう。</em>
                </h2>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 self-start border border-[#83CBEB]/40 text-[#83CBEB] rounded-full px-6 py-3 text-sm font-sans hover:bg-[#83CBEB]/10 transition-colors"
              >
                コメントを送る <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {comments.map((comment, index) => (
                <article
                  key={`${comment.name}-${index}`}
                  className="bg-[#000033]/80 border border-[#83CBEB]/20 rounded-xl p-6"
                >
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed mb-4">「{comment.message}」</p>
                  <span className="text-sm text-[#83CBEB]">— {comment.name}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* フッター */}
      <footer className="py-10 border-t border-[#83CBEB]/10">
        <div className="container mx-auto px-4 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-sm text-[#EEEEFF]/70 font-sans">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#83CBEB]/10 border border-[#83CBEB]/40 text-[#83CBEB] text-[10px] font-bold">
              CB
            </span>
            Cosmo Base <em className="text-[#83CBEB] not-italic">×</em> FSIF
          </div>
          <p className="text-sm text-[#EEEEFF]/60 font-sans">宇宙を、みんなのものに。</p>
          <small className="text-xs text-[#EEEEFF]/30 font-sans">© 2026 Cosmo Base / FSIF — MMX SUPPORT PROJECT</small>
        </div>
      </footer>

      {/* 応援コメント送信モーダル */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowForm(false)
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#000033] border border-[#83CBEB]/30 rounded-2xl p-6 md:p-8 space-y-6"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="閉じる"
              className="absolute top-4 right-4 text-[#EEEEFF]/60 hover:text-[#EEEEFF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <p className="text-xs tracking-[0.3em] text-[#83CBEB] font-sans mb-2">LEAVE YOUR MARK</p>
              <h2 className="text-2xl font-serif text-[#EEEEFF]">応援コメントを送る</h2>
            </div>

            <p className="text-xs text-[#EEEEFF]/50 font-sans leading-relaxed">
              この企画はMMX公式のプロジェクトではありません。個人情報は入力せず、公開されてもよい内容のみ入力してください。コメントが必ず届けられることを保証するものではありません。
            </p>

            <div>
              <label className="block text-[#EEEEFF] font-sans text-sm mb-2">
                ニックネーム <span className="text-red-400">*</span>
              </label>
              <p className="text-[#EEEEFF]/50 text-xs mb-2">
                匿名を希望される場合、「匿名希望」とお書きください。
              </p>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={40}
                className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                placeholder="ニックネームでもOK"
              />
            </div>

            <div>
              <label className="block text-[#EEEEFF] font-sans text-sm mb-2">応援メッセージ</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={240}
                className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors resize-none"
                placeholder="MMXへの応援や、宇宙への想いをどうぞ"
              />
            </div>

            <div>
              <label className="block text-[#EEEEFF] font-sans text-sm mb-2">応援イラスト</label>
              <p className="text-[#EEEEFF]/50 text-xs mb-3">
                正方形の画像で1000×1000px以上を目安にアップロードしてください(アナログの場合は撮影・スキャンした画像でOKです)。
              </p>

              {previewUrl ? (
                <div className="relative inline-block">
                  <img
                    src={previewUrl}
                    alt="アップロードするイラストのプレビュー"
                    className="w-32 h-32 object-cover rounded-lg border border-[#83CBEB]/30"
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
                <label className="flex flex-col items-center justify-center gap-2 w-full border border-dashed border-[#83CBEB]/40 rounded-lg p-6 cursor-pointer hover:border-[#83CBEB] transition-colors">
                  <ImageUp className="w-7 h-7 text-[#83CBEB]" />
                  <span className="text-[#EEEEFF]/70 text-sm">タップして画像を選択(任意)</span>
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
              className="w-full bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-bold py-6 text-lg rounded-full"
            >
              {isSubmitting ? "送信中..." : "コメントを届ける"} <Send className="w-4 h-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      )}

      {/* 送信完了トースト */}
      {sent && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#83CBEB] text-[#000033] font-bold font-sans text-sm px-5 py-3 rounded-full shadow-xl"
        >
          <Check className="w-4 h-4" aria-hidden="true" /> コメントを受け付けました。ありがとうございます。
        </div>
      )}
    </main>
  )
}

export { LAUNCH_DATE }
