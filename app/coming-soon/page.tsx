import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Rocket } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "コミュニティ公開準備中",
  description: "Cosmo Baseのコミュニティは4月1日に公式オープン予定です。",
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#000033] flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 py-20">
        <div className="text-center max-w-2xl mx-auto bg-[#000033]/60 border border-[#83CBEB]/30 rounded-2xl p-8 md:p-12 shadow-lg shadow-[#83CBEB]/5">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#83CBEB]/10 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-[#83CBEB]" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-serif text-[#EEEEFF] mb-6">
            コミュニティ公開準備中
          </h1>
          
          <div className="space-y-4 text-[#EEEEFF]/80 font-sans leading-relaxed mb-8">
            <p>
              Cosmo BaseのDiscordコミュニティは<br />
              <strong className="text-[#83CBEB] text-2xl font-bold inline-block my-2">4月1日 公式オープン</strong><br />
              を予定しております。
            </p>
            <p className="text-sm">
              参加リンクの公開まで、今しばらくお待ちください。<br />
              皆様のご参加を心よりお待ちしております！
            </p>
          </div>

          <Link 
            href="/"
            className="inline-block bg-[#83CBEB] text-[#000033] font-bold font-sans py-3 px-8 rounded-full hover:bg-[#83CBEB]/90 transition-colors"
          >
            トップページへ戻る
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
