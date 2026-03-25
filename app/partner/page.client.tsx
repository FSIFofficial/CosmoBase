"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function PartnerPageContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ▼▼▼ Google Form の内部情報 ▼▼▼
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdZbmNFTOPf43xWN6JZo7DDqkyeYZUCvQlrdVOhO-3aViUpvQ/formResponse"
  const ENTRY_PURPOSE = "entry.404165663" // お問い合わせの目的
  const ENTRY_DATE = "entry.9181603"      // 都合の良い日程（分岐）
  const ENTRY_WHAT = "entry.1274796985"   // 聞いてみたいこと（分岐）
  const ENTRY_NAME = "entry.374891988"    // 団体名
  const ENTRY_CU = "entry.477298106"      // 組織区分
  const ENTRY_SPACE = "entry.1051822307"  // 分野区分
  const ENTRY_WHO = "entry.1525609561"    // 担当者
  const ENTRY_EMAIL = "entry.1000740425"  // メールアドレス
  const ENTRY_OTHER = "entry.222316402"   // その他
  // ▲▲▲ 設定ここまで ▲▲▲

  // 入力データの保存場所
  const [purpose, setPurpose] = useState("")
  const [date, setDate] = useState("第1希望：〇月〇日 xx:xx～yy:yy\n第2希望：〇月〇日 xx:xx～yy:yy\n第3希望：〇月〇日 xx:xx～yy:yy")
  const [what, setWhat] = useState("")
  const [name, setName] = useState("")
  const [cu, setCu] = useState("")
  const [space, setSpace] = useState("")
  const [who, setWho] = useState("")
  const [email, setEmail] = useState("")
  const [other, setOther] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // ★ 分岐の判定：「カジュアル面談」が含まれているか
  const isCasualInterview = purpose.includes("カジュアル面談")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append(ENTRY_PURPOSE, purpose)
    formData.append(ENTRY_NAME, name)
    formData.append(ENTRY_CU, cu)
    formData.append(ENTRY_SPACE, space)
    formData.append(ENTRY_WHO, who)
    formData.append(ENTRY_EMAIL, email)
    formData.append(ENTRY_OTHER, other)
    
    // カジュアル面談の時だけ、日程と聞いてみたいことを送信する
    if (isCasualInterview) {
      formData.append(ENTRY_DATE, date)
      formData.append(ENTRY_WHAT, what)
    }

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
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">
                パートナー制度
              </h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                Cosmo Baseと一緒に、宇宙の未来を創りませんか
              </p>
            </div>

            {/* パートナー対象・メリットのブロック（変更なしのため省略せずにそのまま記載） */}
            <div className="bg-gradient-to-br from-[#83CBEB]/10 via-[#000033] to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-6 text-center">
                パートナー対象
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">🏢</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">企業</h3>
                  <p className="text-[#EEEEFF]/60 font-sans text-sm">宇宙系・非宇宙系問わず</p>
                </div>
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">🎓</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">学生団体</h3>
                  <p className="text-[#EEEEFF]/60 font-sans text-sm">大学・高専サークル等</p>
                </div>
                <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">教育・研究団体</h3>
                  <p className="text-[#EEEEFF]/60 font-sans text-sm">人材育成に関心のある組織</p>
                </div>
              </div>

              <div className="border-t border-[#83CBEB]/20 pt-8">
                <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-6 text-center">
                  パートナーになるメリット
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-[#000033]/40 rounded-lg p-4">
                    <span className="text-[#83CBEB] text-2xl flex-shrink-0">01</span>
                    <div>
                      <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">コミュニティー内での情報発信</h3>
                      <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                        自社の取り組みやイベントを、宇宙に関心のある層に直接届けられます
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-[#000033]/40 rounded-lg p-4">
                    <span className="text-[#EEEEBB] text-2xl flex-shrink-0">02</span>
                    <div>
                      <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">学生・他産業との接点創出</h3>
                      <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                        採用、共同研究、新規事業のパートナー探しなど、様々な出会いが生まれます
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-[#000033]/40 rounded-lg p-4">
                    <span className="text-[#83CBEB] text-2xl flex-shrink-0">03</span>
                    <div>
                      <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">イベント・企画への参画</h3>
                      <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                        講演会、ワークショップ、展示会など、共同企画の機会を優先的にご案内
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-[#000033]/40 rounded-lg p-4">
                    <span className="text-[#EEEEBB] text-2xl flex-shrink-0">04</span>
                    <div>
                      <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">宇宙リテラシーの向上</h3>
                      <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                        社内勉強会、社員教育の一環として活用できる情報と機会を提供
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-[#000033]/40 rounded-lg p-4">
                    <span className="text-[#83CBEB] text-2xl flex-shrink-0">05</span>
                    <div>
                      <h3 className="text-lg font-serif text-[#EEEEFF] mb-2">将来の事業・人材の種まき</h3>
                      <p className="text-[#EEEEFF]/70 font-sans text-sm leading-relaxed">
                        長期的な関係性構築により、未来のビジネスチャンスと優秀な人材との出会いを創出
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#83CBEB]/10 border border-[#83CBEB]/30 rounded-lg">
                <p className="text-[#EEEEFF]/90 font-sans text-center leading-relaxed">
                  <span className="text-[#83CBEB] font-medium">金銭的価値だけではありません。</span>
                  <br />
                  関係性・未来価値を共に育てていく仲間を募集しています。
                </p>
              </div>
            </div>

            {/* ▼ お問い合わせフォーム部分 ▼ */}
            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-4 md:p-8 w-full">
              {isSuccess ? (
                <div className="text-center p-12 bg-[#000033] border border-[#83CBEB]/30 rounded-lg">
                  <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">お問い合わせ完了</h3>
                  <p className="text-[#EEEEFF]/80 font-sans leading-relaxed">
                    ご連絡ありがとうございます！<br />
                    フォームの内容を無事に受信いたしました。<br />
                    いただいた内容を確認し、近日中に担当者よりご連絡を差し上げます。<br />
                    皆様とご一緒できることを楽しみにしております。<br /><br />
                    <span className="text-sm">※自動返信メールが届いているかご確認ください。</span>
                  </p>
                </div>
              ) : (
                <div className="w-full max-w-2xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-4 text-center">
                    パートナーとして参加する
                  </h2>
                  <div className="text-[#EEEEFF]/70 font-sans mb-8 leading-relaxed text-center">
                    <p>まずは以下のフォームからお気軽にご連絡ください。</p>
                    <p className="mt-2 text-sm text-[#83CBEB]">
                      ※いきなり提携ではなく、まずは話を聞いてみたいという方向けの<br className="hidden md:block" />
                      「カジュアル面談」も受け付けています。
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. お問い合わせの目的 */}
                    <div>
                      <label className="block text-[#EEEEFF] font-sans text-sm mb-2">お問い合わせの目的 <span className="text-red-400">*</span></label>
                      <select
                        required
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">選択してください</option>
                        <option value="まずはカジュアル面談で話を聞いてみたい">まずはカジュアル面談で話を聞いてみたい</option>
                        <option value="パートナー制度に正式に申し込みたい">パートナー制度に正式に申し込みたい</option>
                      </select>
                    </div>

                    {/* ▼▼▼ 分岐：カジュアル面談が選ばれた時だけ表示されるエリア ▼▼▼ */}
                    {isCasualInterview && (
                      <div className="p-6 bg-[#83CBEB]/10 rounded-lg border border-[#83CBEB]/30 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div>
                          <h4 className="text-lg font-serif text-[#83CBEB] mb-2">カジュアル面談のお申し込み</h4>
                          <p className="text-[#EEEEFF]/70 text-sm mb-4">30分〜1時間程度、オンラインで活動内容のご紹介や、連携のご相談をさせていただきます。</p>
                        </div>
                        
                        <div>
                          <label className="block text-[#EEEEFF] font-sans text-sm mb-2">都合の良い日程を第三希望まで教えてください。 <span className="text-red-400">*</span></label>
                          <textarea
                            required={isCasualInterview}
                            rows={3}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-[#000033]/50 border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[#EEEEFF] font-sans text-sm mb-2">面談で聞いてみたいこと・相談したいこと</label>
                          <textarea
                            rows={3}
                            value={what}
                            onChange={(e) => setWhat(e.target.value)}
                            className="w-full bg-[#000033]/50 border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors resize-none"
                            placeholder="例：具体的な提携事例を知りたい、まずは学生の雰囲気を知りたい など"
                          />
                        </div>
                      </div>
                    )}
                    {/* ▲▲▲ 分岐エリアここまで ▲▲▲ */}

                    {/* 2. 団体名 */}
                    <div>
                      <label className="block text-[#EEEEFF] font-sans text-sm mb-2">団体名 <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                        placeholder="株式会社CosmoBase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* 3. 組織区分 */}
                      <div>
                        <label className="block text-[#EEEEFF] font-sans text-sm mb-2">組織区分 <span className="text-red-400">*</span></label>
                        <select
                          required
                          value={cu}
                          onChange={(e) => setCu(e.target.value)}
                          className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors appearance-none"
                        >
                          <option value="">選択</option>
                          <option value="企業">企業</option>
                          <option value="学生団体">学生団体</option>
                        </select>
                      </div>

                      {/* 4. 分野区分 */}
                      <div>
                        <label className="block text-[#EEEEFF] font-sans text-sm mb-2">分野区分 <span className="text-red-400">*</span></label>
                        <select
                          required
                          value={space}
                          onChange={(e) => setSpace(e.target.value)}
                          className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors appearance-none"
                        >
                          <option value="">選択</option>
                          <option value="宇宙系">宇宙系</option>
                          <option value="非宇宙系">非宇宙系</option>
                        </select>
                      </div>
                    </div>

                    {/* 5. 担当者 */}
                    <div>
                      <label className="block text-[#EEEEFF] font-sans text-sm mb-2">担当者 <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={who}
                        onChange={(e) => setWho(e.target.value)}
                        className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors"
                        placeholder="宇宙 太郎"
                      />
                    </div>

                    {/* 6. メールアドレス */}
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

                    {/* 7. その他メッセージ */}
                    <div>
                      <label className="block text-[#EEEEFF] font-sans text-sm mb-2">その他、ご質問やメッセージがあればご記入ください</label>
                      <textarea
                        rows={3}
                        value={other}
                        onChange={(e) => setOther(e.target.value)}
                        className="w-full bg-[#000033] border border-[#83CBEB]/30 rounded p-3 text-[#EEEEFF] focus:border-[#83CBEB] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033] font-bold py-6 text-lg rounded-md transition-colors mt-8"
                    >
                      {isSubmitting ? "送信中..." : "送信する"}
                    </Button>
                  </form>
                </div>
              )}
            </div>
            {/* ▲ お問い合わせフォーム部分 ここまで ▲ */}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
