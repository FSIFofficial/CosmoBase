"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Calendar,
  Newspaper,
  Users,
  LogOut,
  FolderOpen,
  CalendarCheck,
  Edit,
  UserCog,
  TrendingUp,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    router.push("/")
  }

  const menuItems = [
    {
      title: "資料登録",
      description: "新しい資料のアップロード",
      icon: FileText,
      href: "/admin/resources",
      color: "#83CBEB",
    },
    {
      title: "資料館管理",
      description: "資料の公開設定、掲載制御",
      icon: FolderOpen,
      href: "/admin/resources-manage",
      color: "#EEEEBB",
    },
    {
      title: "イベント登録",
      description: "イベント情報の登録、ハッシュタグ管理",
      icon: Calendar,
      href: "/admin/events",
      color: "#83CBEB",
    },
    {
      title: "イベント管理",
      description: "既存イベントの編集、掲載制御",
      icon: CalendarCheck,
      href: "/admin/events-manage",
      color: "#EEEEBB",
    },
    {
      title: "ニュース発行",
      description: "ニュース記事の作成・編集・公開",
      icon: Newspaper,
      href: "/admin/news",
      color: "#83CBEB",
    },
    {
      title: "ニュース管理",
      description: "既存ニュースの編集、掲載ON/OFF",
      icon: Edit,
      href: "/admin/news-manage",
      color: "#EEEEBB",
    },
    {
      title: "パートナー登録",
      description: "パートナー企業・団体の新規登録",
      icon: Users,
      href: "/admin/partners",
      color: "#83CBEB",
    },
    {
      title: "パートナー管理",
      description: "既存パートナーの編集、掲載制御",
      icon: UserCog,
      href: "/admin/partners-manage",
      color: "#EEEEBB",
    },
    {
      title: "活動実績数値管理",
      description: "「これまでの活動」の数値を変更",
      icon: TrendingUp,
      href: "/admin/stats",
      color: "#83CBEB",
    },
  ]

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#EEEEFF] mb-2">運営管理画面</h1>
            <p className="text-[#EEEEFF]/60 font-sans">Cosmo Base 管理ダッシュボード</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#83CBEB]/30 text-[#EEEEFF] hover:bg-[#83CBEB]/10 font-sans bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            ログアウト
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="bg-[#000033] border-[#83CBEB]/30 hover:border-[#83CBEB] transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                      <item.icon className="h-6 w-6" style={{ color: item.color }} />
                    </div>
                    <CardTitle className="text-xl font-serif text-[#EEEEFF]">{item.title}</CardTitle>
                  </div>
                  <CardDescription className="text-[#EEEEFF]/60 font-sans">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans">
            ← サイトトップに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
