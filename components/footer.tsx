export default function Footer() {
  return (
    <footer className="border-t border-[#83CBEB]/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <p className="text-[#EEEEFF]/60 font-sans text-sm">© 2026 Cosmo Base. All rights reserved.</p>
          <div className="flex gap-6">
            {/* 追加: 運営ボタン */}
            <a
              href="/admin/login"
              className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors font-sans text-sm"
            >
              運営
            </a>
            <a href="#" className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors font-sans text-sm">
              プライバシーポリシー
            </a>
            <a href="#" className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors font-sans text-sm">
              利用規約
            </a>
            <a
              href="mailto:fisf.official@gmail.com"
              className="text-[#EEEEFF]/60 hover:text-[#83CBEB] transition-colors font-sans text-sm"
            >
              お問い合わせ
            </a>
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
