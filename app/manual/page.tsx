import Header from "@/components/header"
import Footer from "@/components/footer"
import { ShieldAlert, Users, Lock, Scale, AlertTriangle, FileWarning, Gavel, Ban } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cosmo Base 対応マニュアル", 
  description: "コミュニティの健全な運営と、メンバーの安心・安全を守るためのガイドライン",
    // OGPも個別で上書き
  openGraph: {
    title: "Cosmo Base 対応マニュアル | Cosmo Base",
    description: "コミュニティの健全な運営と、メンバーの安心・安全を守るためのガイドライン",
  },
}

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-[#000033] text-[#EEEEFF]">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ページタイトル */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-balance">
            Cosmo Base 対応マニュアル
          </h1>
          <p className="text-[#83CBEB] text-lg font-sans">
            コミュニティの健全な運営と、メンバーの安心・安全を守るためのガイドライン
          </p>
        </div>

        <div className="space-y-16">
          
          {/* 1. 荒らし・スパムへの対応方針 */}
          <section className="bg-[#000033]/50 border border-[#83CBEB]/30 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="h-8 w-8 text-[#83CBEB]" />
              <h2 className="text-2xl font-serif font-bold">1. 荒らし・スパムへの対応方針</h2>
            </div>
            <p className="mb-6 text-[#EEEEFF]/80 leading-relaxed">
              自動化されたBotや明らかな悪意ある攻撃に対しては、議論の余地なく即座に排除します。
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[#EEEEBB] mb-3 border-l-4 border-[#EEEEBB] pl-3">定義</h3>
                <ul className="list-disc list-inside space-y-2 text-[#EEEEFF]/80 text-sm">
                  <li>文脈に関係のない宣伝URLの連続投稿</li>
                  <li>大量のメンションや無意味な文字列の連投</li>
                  <li>グロテスク・ポルノ画像の投稿</li>
                  <li>詐欺・フィッシングサイトへの誘導</li>
                  <li>DM（ダイレクトメッセージ）での無差別な勧誘行為</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#83CBEB] mb-3 border-l-4 border-[#83CBEB] pl-3">対応フロー</h3>
                <ol className="space-y-3 text-[#EEEEFF]/80 text-sm">
                  {/* ★修正ポイント: shrink-0 と whitespace-nowrap を追加して改行崩れを防止 */}
                  <li className="flex gap-2">
                    <span className="font-bold text-[#EEEEFF] shrink-0 whitespace-nowrap">1. 発見:</span>
                    <span>運営による目視、またはBot（Carl-bot等）の自動検知、メンバーからの通報。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#EEEEFF] shrink-0 whitespace-nowrap">2. 処置:</span>
                    <span>該当メッセージの即時削除。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#EEEEFF] shrink-0 whitespace-nowrap">3. 処分:</span>
                    <span>該当アカウントの即時BAN（永久追放）。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#EEEEFF] shrink-0 whitespace-nowrap">4. 報告:</span>
                    <span>Discord運営への通報（悪質な場合）。</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* 2. トラブルやハラスメント対応のプロセス */}
          <section className="bg-[#000033]/50 border border-[#83CBEB]/30 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-8 w-8 text-[#83CBEB]" />
              <h2 className="text-2xl font-serif font-bold">2. トラブルやハラスメント対応のプロセス</h2>
            </div>
            <p className="mb-6 text-[#EEEEFF]/80 leading-relaxed">
              揉め事やハラスメント報告があった場合、感情論で動かず、ログに基づき冷静に対処します。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#EEEEBB] mb-3 border-l-4 border-[#EEEEBB] pl-3">ハラスメントの定義</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-[#EEEEFF]/80 text-sm">
                  {/* 点（div）が潰れないように shrink-0 を追加 */}
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EEEEBB] rounded-full shrink-0" />執拗な付きまとい（ネットストーキング）</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EEEEBB] rounded-full shrink-0" />性的な発言や嫌がらせ</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EEEEBB] rounded-full shrink-0" />特定の属性（性別、出身、知識レベルなど）に対する差別的発言</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EEEEBB] rounded-full shrink-0" />「知識マウント」による威圧行為（Cosmo Base特有の重要禁止事項）</li>
                </ul>
              </div>

              <Separator className="bg-[#83CBEB]/20" />

              <div>
                <h3 className="text-lg font-bold text-[#83CBEB] mb-4 border-l-4 border-[#83CBEB] pl-3">対応フロー</h3>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { title: "1. 通報受領", content: "被害者または目撃者から、運営へのDMまたは「お問い合わせ（チケット）」機能で報告を受ける。" },
                    { title: "2. 事実確認", content: "運営チーム内で情報を共有（通報者のプライバシー厳守）。該当ログや証拠画像を確認する。" },
                    { title: "3. ヒアリング", content: "必要な場合、当事者双方に対し個別にDMで事情を聴取する（公開の場では行わない）。" },
                    { title: "4. 判断・処分", content: "ガイドラインに照らし合わせ、処分の要否と重さを決定。通報者へ対応完了の報告を行う。" }
                  ].map((step, i) => (
                    <div key={i} className="bg-[#000033] border border-[#83CBEB]/20 p-4 rounded-lg">
                      <h4 className="font-bold text-[#83CBEB] mb-2 text-sm whitespace-nowrap">{step.title}</h4>
                      <p className="text-xs text-[#EEEEFF]/70 leading-relaxed">{step.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. 個人情報・プライバシー保護方針 */}
          <section className="bg-[#000033]/50 border border-[#83CBEB]/30 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-8 w-8 text-[#83CBEB]" />
              <h2 className="text-2xl font-serif font-bold">3. 個人情報・プライバシー保護方針</h2>
            </div>
            <p className="mb-6 text-[#EEEEFF]/80 leading-relaxed">
              個人情報を扱う責任を自覚し、メンバーのプライバシーを守ります。
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[#EEEEBB] mb-2 text-sm">取得する情報</h4>
                  <ul className="list-disc list-inside text-sm text-[#EEEEFF]/70 space-y-1">
                    <li>Discordのユーザー名、ID</li>
                    <li>自己紹介チャンネル等で自ら公開した情報</li>
                    <li>イベント申込時等のフォームに入力された情報</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#EEEEBB] mb-2 text-sm">利用目的</h4>
                  <ul className="list-disc list-inside text-sm text-[#EEEEFF]/70 space-y-1">
                    <li>コミュニティの運営管理、荒らし対策</li>
                    <li>FSIF主催イベントの案内、運営</li>
                    <li>個人を特定できない形での統計データ作成</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                 <div>
                  <h4 className="font-bold text-red-400 mb-2 text-sm">禁止事項</h4>
                  <ul className="list-disc list-inside text-sm text-[#EEEEFF]/70 space-y-1">
                    <li>メンバーの同意なく、個人情報を第三者に提供すること</li>
                    <li>運営権限を利用して知り得た非公開情報の漏洩</li>
                  </ul>
                </div>
                <div className="bg-[#EEEEFF]/5 p-4 rounded-lg border border-[#EEEEFF]/10">
                  <h4 className="font-bold text-[#83CBEB] mb-2 text-sm">免責</h4>
                  <p className="text-xs text-[#EEEEFF]/60">
                    メンバー自身がチャット内で公開した個人情報によって生じたトラブルについて、運営は責任を負いません。自己責任での管理を推奨します。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. 違反者に対するペナルティ基準 */}
          <section className="bg-[#000033]/50 border border-[#83CBEB]/30 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <Scale className="h-8 w-8 text-[#83CBEB]" />
              <h2 className="text-2xl font-serif font-bold">4. 違反者に対するペナルティ基準</h2>
            </div>

            <div className="grid gap-6">
              {/* Lv.1 */}
              <div className="border-l-4 border-yellow-500 bg-[#000033] p-5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-bold text-lg text-[#EEEEFF]">Lv.1 注意 (Warning)</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <p className="text-xs text-[#EEEEFF]/60 mb-1">違反内容の例</p>
                    <p className="text-sm text-[#EEEEFF]/80">
                      軽度のマウント行為（無自覚なもの）、チャンネルの誤用、軽微な言葉遣いの荒れ、議論のヒートアップ
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#EEEEFF]/60 mb-1">対応措置</p>
                    <p className="text-sm font-bold text-yellow-500">運営からのDMによる注意喚起</p>
                  </div>
                </div>
              </div>

              {/* Lv.2 */}
              <div className="border-l-4 border-orange-500 bg-[#000033] p-5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileWarning className="h-5 w-5 text-orange-500" />
                  <h3 className="font-bold text-lg text-[#EEEEFF]">Lv.2 警告・一時制限 (Mute/Kick)</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <p className="text-xs text-[#EEEEFF]/60 mb-1">違反内容の例</p>
                    <p className="text-sm text-[#EEEEFF]/80">
                      注意しても改善が見られない場合、他者を不快にさせる強い弄り、許可のない宣伝行為、金銭トラブルにつながる勧誘
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#EEEEFF]/60 mb-1">対応措置</p>
                    <div className="text-sm font-bold text-orange-500">
                      <p>タイムアウト（一時的な書き込み制限）</p>
                      <p>またはサーバーからのKick（退出）</p>
                      <p className="text-xs font-normal text-[#EEEEFF]/50 mt-1">※再参加は可能だが、次はBAN対象</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lv.3 */}
              <div className="border-l-4 border-red-600 bg-[#000033] p-5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold text-lg text-[#EEEEFF]">Lv.3 永久追放 (BAN)</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <p className="text-xs text-[#EEEEFF]/60 mb-1">違反内容の例</p>
                    <p className="text-sm text-[#EEEEFF]/80">
                      Botによるスパム行為、明らかな悪意ある荒らし、深刻なハラスメント・差別発言、運営の指示への無視・敵対的行為
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#EEEEFF]/60 mb-1">対応措置</p>
                    <div className="text-sm font-bold text-red-600">
                      <p>即時BAN（永久追放）</p>
                      <p className="text-xs font-normal text-[#EEEEFF]/50 mt-1">該当アカウントの再参加を拒否</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* お問い合わせへの誘導など */}
          <div className="text-center py-8">
            <p className="text-[#EEEEFF]/60 text-sm">
              本マニュアルに関するご質問や、違反報告はDiscord内の「お問い合わせ」チャンネルまでご連絡ください。
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
