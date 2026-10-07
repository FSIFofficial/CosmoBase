"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight, Check, Send } from "lucide-react"
import { supabase } from "@/lib/supabase"
import styles from "./mmx.module.css"

// MMXの打ち上げは2026年10月20日(日本時間)を予定
const LAUNCH_DATE = new Date("2026-10-20T04:41:03+09:00")
const MMX_SITE_URL = "https://www.mmx.jaxa.jp/"

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

  return (
    <div className={styles.countdown} aria-label="打ち上げまでのカウントダウン">
      <span>
        <b>{format(days, 2)}</b>
        <small>DAYS</small>
      </span>
      <i>:</i>
      <span>
        <b>{format(hours, 2)}</b>
        <small>HOURS</small>
      </span>
      <i>:</i>
      <span>
        <b>{format(minutes, 2)}</b>
        <small>MINUTES</small>
      </span>
      <i>:</i>
      <span>
        <b>{format(seconds, 2)}</b>
        <small>SECONDS</small>
      </span>
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
    setFile(null)
    setFileError("")
    setSubmitError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
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
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandMark}>
            <img src="/CB_icon.png" alt="Cosmo Base" />
          </span> 
          <span>
            Cosmo Base <em>×</em> MMX SUPPORT
          </span>
        </a>
        <div className={styles.navLinks}>
          <a href="#about">MMXについて</a>
          <a href={MMX_SITE_URL} target="_blank" rel="noreferrer" className={styles.navCta}>
            MMXの詳細はこちら <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>

      <section id="top" className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.orbit} aria-hidden="true" />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span />A MESSAGE TO MARS
          </p>
          <h1>
            地球から、
            <br />
            <em>火星</em>へ。
          </h1>
          <p className={styles.heroLead}>MMXの挑戦を、みんなの声で応援しよう。</p>
          <button className={`${styles.primaryButton} ${styles.heroCta}`} onClick={() => setShowForm(true)}>
            <span className={styles.heroCtaLabel}>
              応援コメントを打ち込む <ArrowUpRight aria-hidden="true" />
            </span>
            <span className={styles.heroDisclaimer}>
              この企画は、個人(FSIFメンバー)とCosmo Baseによる応援企画です。MMX公式のプロジェクトではありません。
            </span>
          </button>
          <div className={styles.scrollHint}>
            <ArrowDown aria-hidden="true" /> SCROLL TO EXPLORE
          </div>
        </div>

        <div className={styles.planet} aria-label="火星の衛星フォボス">
          <div className={styles.planetGlow} />
          <div className={styles.planetCore}>
            <img src="/PIA10369.jpg" alt="火星の衛星フォボス(NASA/JPL-Caltech/University of Arizona)" />
          </div>
        </div>

        <div className={styles.heroMeta}>
          <span>FSIF presents</span>
          <span>
            Martian Moons eXploration
          </span>
          <span>@NASA</span>
        </div>
      </section>

      <section className={styles.countdownSection}>
        <div>
          <p className={styles.eyebrow}>NEXT MILESTONE</p>
          <h2>打ち上げまで、あと</h2>
        </div>
        <Countdown />
        <p className={styles.launchNote}>※ 打ち上げ予定:2026年10月20日(日本時間)</p>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.sectionLabel}>
          01 <span>ABOUT MMX</span>
        </div>
        <div className={styles.aboutContent}>
          <div>
            <p className={styles.eyebrow}>MARS MOONS EXPLORATION</p>
            <h2>
              火星の衛星から、
              <br />
              <em>太陽系の起源</em>を探る。
            </h2>
          </div>
          <div className={styles.aboutText}>
            <p>
              MMX(Martian Moons eXploration)は、JAXAを中心に進める火星衛星探査計画です。火星の衛星フォボスからサンプルを持ち帰り、火星圏の謎と太陽系の成り立ちに迫ります。
            </p>
            <p>
              本企画は、個人(FSIFメンバー)とCosmo Baseが共催する、MMXへの応援プロジェクトです。MMX公式と共同で実施するものではありません。
            </p>
            <div className={styles.noticeBox}>
              <strong>ご参加の前に</strong>
              <span>
                いただいたコメントが必ずMMX関係者へ届けられることを保証するものではありません。個人情報は入力せず、公開されてもよい内容のみお寄せください。
              </span>
            </div>
            <a href={MMX_SITE_URL} target="_blank" rel="noreferrer" className={styles.textLink}>
              MMXの詳細はこちら <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {SHOW_VOICES && (
        <section id="voices" className={styles.voices}>
          <div className={styles.sectionLabel}>
            02 <span>VOICES FROM EARTH</span>
          </div>
          <div className={styles.voicesHeading}>
            <div>
              <p className={styles.eyebrow}>YOUR MESSAGE MATTERS</p>
              <h2>
                みんなの声を、
                <br />
                <em>火星へ届けよう。</em>
              </h2>
            </div>
            <button className={styles.outlineButton} onClick={() => setShowForm(true)}>
              コメントを送る <Send aria-hidden="true" />
            </button>
          </div>
          <div className={styles.commentGrid}>
            {comments.map((comment, index) => (
              <article className={styles.commentCard} key={`${comment.name}-${index}`}>
                <Send aria-hidden="true" />
                <p>「{comment.message}」</p>
                <span>— {comment.name}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className={styles.pageFooter}>
        <div className={styles.brand}>          
          <span className={styles.brandMark}>
            <img src="/FSIF.png" alt="FSIF" />
          </span> 
          <span>
            FSIF <em>×</em> MMX
          </span>
        </div>
        <p>宇宙を、みんなのものに。</p>
        <small>© 2026 Cosmo Base / FSIF — MMX SUPPORT PROJECT</small>
      </footer>

      {showForm && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowForm(false)
          }}
        >
          <form className={styles.commentForm} onSubmit={handleSubmit}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowForm(false)}
              aria-label="閉じる"
            >
              ×
            </button>
            <p className={styles.eyebrow}>LEAVE YOUR MARK</p>
            <h2>MMXチームへの寄せ書きキャンペーン</h2>
            <p className={styles.formNotice}>
              10月20日打ち上げ予定の火星衛星探査計画「MMX」探査機の旅路を応援しよう！
              <br />
              参加方法
              <br />
              ・応援メッセージ
              <br />
              ・応援イラスト(アナログ、デジタル問わず)
              <br />
              頂いた寄せ書きは、まとめてMMXチームの皆様へお届けする予定です。共催:Cosmo Base,FSIF
            </p>

            <label htmlFor="mmx-nickname">
              ニックネーム <span>*</span>
            </label>
            <p style={{ fontSize: 13, color: "#888" }}>
              頂いたメッセージと合わせて記載されるお名前です。匿名を希望される場合、「匿名希望」とお書きください。
            </p>
            <input
              id="mmx-nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              maxLength={40}
              placeholder="宇宙 太郎"
            />

            <label htmlFor="mmx-message">応援メッセージ</label>
            <p style={{ fontSize: 13, color: "#888" }}>
              MMXチームの皆様への応援メッセージをご自由にお寄せください！
              <br />
              例:MMXの新しい発見に期待しています！
              <br />
              ※個人情報、誹謗中傷が含まれる記載はおやめください。
            </p>
            <textarea
              id="mmx-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={240}
              placeholder="例:MMXの新しい発見に期待しています！"
            />

            <label htmlFor="mmx-illustration">応援イラスト</label>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
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
            <input id="mmx-illustration" ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
            {file && !fileError && <p style={{ fontSize: 11, color: "#555" }}>選択中: {file.name}</p>}
            {fileError && <p style={{ fontSize: 11, color: "#c0392b" }}>{fileError}</p>}

            {submitError && <p style={{ fontSize: 12, color: "#c0392b" }}>{submitError}</p>}

            <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "送信中..." : "送信する"} <Send aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {sent && (
        <div className={styles.toast} role="status">
          <Check aria-hidden="true" /> ご協力ありがとうございます！寄せ書きを受け付けました。まとめてMMXチームの皆様へお届けします。
        </div>
      )}
    </main>
  )
}

export { LAUNCH_DATE }
