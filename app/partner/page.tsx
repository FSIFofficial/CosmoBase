"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PartnerPage() {
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
              <h1 className="text-4xl md:text-6xl font-serif text-[#EEEEFF] mb-6 text-balance">パートナー制度</h1>
              <p className="text-xl text-[#EEEEFF]/80 font-sans leading-relaxed">
                Cosmo Baseと一緒に、宇宙の未来を創りませんか
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#83CBEB]/10 via-[#000033] to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-6 text-center">パートナー対象</h2>
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

            <div className="bg-[#000033]/60 border border-[#83CBEB]/20 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-serif text-[#EEEEFF] mb-4">パートナーとして参加する</h2>
              <p className="text-lg text-[#EEEEFF]/70 font-sans mb-8 leading-relaxed">
                まずは以下のフォームからお気軽にどうぞ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdZbmNFTOPf43xWN6JZo7DDqkyeYZUCvQlrdVOhO-3aViUpvQ/viewform?usp=pp_url&entry.9181603=%E7%AC%AC1%E5%B8%8C%E6%9C%9B%EF%BC%9A%E3%80%87%E6%9C%88%E3%80%87%E6%97%A5+xx:xx%EF%BD%9Eyy:yy%0A%E7%AC%AC2%E5%B8%8C%E6%9C%9B%EF%BC%9A%E3%80%87%E6%9C%88%E3%80%87%E6%97%A5+xx:xx%EF%BD%9Eyy:yy%0A%E7%AC%AC3%E5%B8%8C%E6%9C%9B%EF%BC%9A%E3%80%87%E6%9C%88%E3%80%87%E6%97%A5+xx:xx%EF%BD%9Eyy:yy" width="640" height="422" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
