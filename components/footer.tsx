import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-[#83CBEB]/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <p className="text-[#EEEEFF]/60 font-sans text-sm">© 2026 Cosmo Base. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://fsifofficial.github.io/CosmoBase/manual" className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors font-sans text-sm">
              Cosmo Base 対応マニュアル
            </a>
            <a href="https://fsifofficial.github.io/CosmoBase/contact" className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors font-sans text-sm"            >
              お問い合わせ
            </a>
            <div className="flex items-center gap-5">
              {/* X (Twitter) */}
              <a href="https://x.com/CosmoBase" target="_blank" rel="noopener noreferrer" className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/cosmobase.official" target="_blank" rel="noopener noreferrer" className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
  
              {/* note */}
              <a href="https://note.com/cosmobase" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity flex items-center h-5">
                <img src="/CosmoBase/note-logo.svg" alt="note" className="h-4 w-auto" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#83CBEB]/10 pt-6 text-center">
          <p className="text-[#EEEEFF]/50 font-sans text-sm mb-2">運営団体</p>
          <a
            href="https://fsifofficial.wixsite.com/future-space-industr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans text-base font-medium transition-colors"
          >
            未来宇宙産業フォーラム →
          </a>
        </div>
      </div>
    </footer>
  )
}
