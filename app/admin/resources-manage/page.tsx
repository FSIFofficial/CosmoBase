"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, FileText } from "lucide-react"

interface Resource {
  id: string
  title: string
  category: string
  fileName: string
  uploadDate: string
  isPublic: boolean // true: HP公開, false: コミュニティ限定
  isVisible: boolean // true: HP掲載, false: 裏に保管
}

export default function AdminResourcesManagePage() {
  const router = useRouter()
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "宇宙ビジネス入門ガイド",
      category: "ventures",
      fileName: "space-business-guide.docx",
      uploadDate: "2026-01-10",
      isPublic: true,
      isVisible: true,
    },
    {
      id: "2",
      title: "ロケット技術解説書",
      category: "technology",
      fileName: "rocket-tech.docx",
      uploadDate: "2026-01-12",
      isPublic: false,
      isVisible: true,
    },
    {
      id: "3",
      title: "衛星データ活用事例集",
      category: "ventures",
      fileName: "satellite-cases.docx",
      uploadDate: "2026-01-15",
      isPublic: true,
      isVisible: false,
    },
  ])

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const togglePublic = (id: string) => {
    setResources(resources.map((res) => (res.id === id ? { ...res, isPublic: !res.isPublic } : res)))
  }

  const toggleVisible = (id: string) => {
    setResources(resources.map((res) => (res.id === id ? { ...res, isVisible: !res.isVisible } : res)))
  }

  const categoryNames: Record<string, string> = {
    ventures: "宇宙ビジネス",
    technology: "技術資料",
    education: "教育・啓発",
    research: "研究論文",
    policy: "政策・制度",
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              管理画面に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">資料館管理</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">資料の公開設定と掲載制御を管理します</p>
        </div>

        <Card className="bg-[#000033] border-[#83CBEB]/30">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#EEEEFF]">登録済み資料一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#83CBEB]/20 hover:border-[#83CBEB]/40 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="h-5 w-5 text-[#83CBEB]" />
                    <div className="flex-1">
                      <h3 className="text-[#EEEEFF] font-sans font-medium">{resource.title}</h3>
                      <p className="text-[#EEEEFF]/60 text-sm font-sans">
                        {categoryNames[resource.category]} • {resource.fileName} • {resource.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[#EEEEFF]/80 text-sm font-sans min-w-[100px]">
                        {resource.isPublic ? "HP公開" : "コミュニティ限定"}
                      </span>
                      <Switch
                        checked={resource.isPublic}
                        onCheckedChange={() => togglePublic(resource.id)}
                        className="data-[state=checked]:bg-[#83CBEB]"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#EEEEFF]/80 text-sm font-sans min-w-[100px]">
                        {resource.isVisible ? "HP掲載" : "裏に保管"}
                      </span>
                      <Switch
                        checked={resource.isVisible}
                        onCheckedChange={() => toggleVisible(resource.id)}
                        className="data-[state=checked]:bg-[#EEEEBB]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
