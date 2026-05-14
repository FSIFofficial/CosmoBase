"use client"

import Link from "next/link"
import { Telescope, Satellite, Rocket, Building, ArrowLeft, ArrowRight, Share2, CheckCircle, } from "lucide-react"
import { StarField } from "@/components/star-field"

const spaceTypes = [
  {
    icon: Telescope,
    code: "RI",
    title: "天文台トラベラー",
    catchCopy: "「宇宙、普通にロマンすぎない？」って思ってる人",
    description: "・難しい話はちょっと苦手\n・でも宇宙はめちゃくちゃ気になる\n・気づいたら宇宙の画像見てる",
    activities: ["毎日宇宙クイズ", "週刊宇宙ニュース", "Cosmo Baseで宇宙知っトク"],
    accent: "#cbace4",
  },
  {
    icon: Satellite,
    code: "DI",
    title: "人工衛星",
    catchCopy: "「宇宙って色んな楽しみ方あるよね」って人",
    description: "・ニュースも気になる\n・雑談も好き\n・とりあえず全部ちょっとずつ見たい",
    activities: ["週刊宇宙ニュース", "Cosmo Baseで宇宙教えて", "Cosmo Base Library"],
    accent: "#85c68b",
  },
  {
    icon: Rocket,
    code: "RO",
    title: "ロケット打ち上げ",
    catchCopy: "「それ、実際に行けるの？」ってなる人",
    description: "・イベント見つけたら調べてる\n・気づいたら応募ページ見てる\n・とりあえず一歩踏みがち",
    activities: ["宇宙に行っといで", "Cosmo Base Event Database", "Cosmo Baseで宇宙教えて"],
    accent: "#EEEEBB",
  },
  {
    icon: Building,
    code: "DO",
    title: "宇宙ステーション",
    catchCopy: "「それ、どういう仕組み？」ってなる人",
    description: "・ちゃんと理解したい\n・人に説明したくなる\n・気づいたら深掘りしてる",
    activities: ["Space Voyager 検定", "Cosmo Base Library", "宇宙のイベント行ってきた"],
    accent: "#83CBEB",
  },
]

const steps = [
  { step: "STEP 1", text: "質問にYES / NOで回答" },
  { step: "STEP 2", text: "宇宙タイプ診断" },
  { step: "STEP 3", text: "あなたに合う宇宙分野を発見" },
  { step: "STEP 4", text: "Cosmo Baseコミュニティへ参加" },
]

export function SpaceTypeDiagnosis() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <StarField />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-foreground hover:text-cyan transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>トップに戻る</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <Rocket className="h-5 w-5 text-cyan" />
            <span className="text-sm font-semibold tracking-widest uppercase text-cyan">
              Space Type Diagnosis
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground text-balance mb-6">
            あなたの宇宙タイプは？
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            30秒の診断で、あなたが宇宙で活躍する未来がわかる
          </p>
          <Link href="/projects/space-type/content">
            <button
              className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 animate-glow-pulse hover:scale-105 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", }}>
              <span>宇宙タイプを診断する</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            宇宙をもっと身近に
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-12 text-pretty">
            宇宙は遠い世界ではありません。
            <br />
            この診断では、あなたの興味や思考から
            <br />
            どんな宇宙分野に向いているのかを見つけます。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["YES / NOで答えるだけ", "30秒で結果", "SNSでシェア可能"].map(
              (item) => (
                <div
                  key={item}
                  className="glass rounded-full px-6 py-3 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-cyan" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Space Types Section */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(79,172,254,0.3) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              4つの宇宙タイプ
            </h2>
            <p className="text-muted-foreground text-pretty max-w-xl mx-auto">
              「関心軸（ロマン/日常）」と「行動軸（インプット/アウトプット）」の
              <br className="hidden md:block" />
              2軸で、あなたの宇宙タイプを診断します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaceTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.code}
                  className="glass-card rounded-2xl p-6 md:p-8"
                  style={{
                    borderColor: `${type.accent}30`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${type.accent}15`,
                      }}
                    >
                      <Icon className="h-7 w-7" style={{ color: type.accent }} />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold tracking-wider uppercase"
                        style={{ color: type.accent }}
                      >
                        {type.code}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        {type.title} タイプ
                      </h3>
                    </div>
                  </div>
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: type.accent }}
                  >
                    {type.catchCopy}
                  </p>
                  <p className="text-sm text-muted-foreground pl-4 mb-4 leading-relaxed">
                    {type.description.split("\n").map((line:string,i:number) => <p key={i}>{line}</p>)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {type.activities.map((activity) => (
                      <span
                        key={activity}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: `${type.accent}10`,
                          color: type.accent,
                        }}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(79,172,254,0.3) 50%, transparent 100%)", }}
        />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              診断の流れ
            </h2>
          </div>
          <div className="flex flex-col items-center max-w-md mx-auto w-full">
            {steps.map((item, index) => (
              <div key={item.step} className="w-full flex flex-col items-center">
                <div className="glass w-full rounded-2xl p-6 flex items-center gap-6 relative z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-base font-bold"
                    style={{ background: "rgba(0, 242, 254, 0.15)", color: "#00f2fe", }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs text-cyan font-semibold tracking-wider uppercase mb-0.5">
                      {item.step}
                    </p>
                    <p className="text-sm md:text-base text-foreground font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* 逆三角形（最後のステップ以外で表示） */}
                {index < steps.length - 1 && (
                  <div className="text-cyan opacity-80 relative z-0 -my-2">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]" /* 少し発光させるとglassと合います */
                    >
                      <path d="M4 8 L12 16 L20 8 Z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmo Base Intro */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(79,172,254,0.3) 50%, transparent 100%)", }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            宇宙をもっと身近に
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-8 text-pretty">
            Cosmo Baseは、
            <br />
            宇宙を学び、つながり、
            <br />
            未来を創るコミュニティです。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["ロマン志向", "日常・社会志向", "インプット", "アウトプット"].map(
              (tag) => (
                <span key={tag} className="glass rounded-full px-4 py-2 text-sm text-foreground">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-16">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(79,172,254,0.3) 50%, transparent 100%)", }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            今すぐ宇宙タイプを診断する
          </h2>
          <p className="text-muted-foreground mb-10">診断は30秒</p>
          <Link href="/projects/space-type/content">
            <button
              className="group relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg md:text-xl font-bold text-primary-foreground transition-all duration-300 animate-glow-pulse hover:scale-105 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", }}
            >
              <span>診断スタート</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 text-center">
        <div className="mt-8 pt-8 border-t border-border/50 w-full">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Cosmo Base. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
