"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // ブラウザのセッションストレージに "admin_auth" があるか確認
    const auth = sessionStorage.getItem("admin_auth")

    if (auth !== "true") {
      // ログインしてなければ、強制的にログインページへ飛ばす
      router.push("/login")
    } else {
      // OKならページを表示する
      setIsAuthorized(true)
    }
  }, [router])

  // 認証チェック中は何も表示しない（またはローディング画面を出す）
  if (!isAuthorized) {
    return <div className="min-h-screen bg-[#000033] flex items-center justify-center text-[#EEEEFF]">Checking access...</div>
  }

  return <>{children}</>
}
