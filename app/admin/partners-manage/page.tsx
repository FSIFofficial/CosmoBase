"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, Building2, Users } from "lucide-react"
import Image from "next/image"

const samplePartners = [
  {
    id: "space-tech",
    name: "株式会社スペーステクノロジー",
    type: "企業",
    category: "テクノロジー",
    tagline: "小型衛星の開発・製造を行う宇宙ベンチャー",
    website: "https://example.com",
    twitter: "https://twitter.com/spacetech",
    overview: "小型衛星の開発から打ち上げまでをワンストップで提供",
    activities: "・小型衛星の設計・製造\n・衛星データの解析\n・宇宙ビジネスコンサルティング",
    achievements: "・小型衛星3機の打ち上げ成功\n・国内シェア20%",
    logo: "/space-technology-company-logo.jpg",
    published: true,
  },
  {
    id: "astronomy-society",
    name: "日本天文学会",
    type: "団体",
    category: "研究",
    tagline: "天文学の発展と普及を目指す学術団体",
    website: "https://example.org",
    facebook: "https://facebook.com/astronomy",
    overview: "天文学の研究と教育活動を推進する学会",
    activities: "・学術研究の推進\n・天文教育の支援\n・一般向け講演会の開催",
    achievements: "・会員数5000名超\n・年間講演会50回以上開催",
    logo: "/astronomy-society-logo.png",
    published: true,
  },
]

export default function PartnersManagePage() {
  const router = useRouter()
  const [partnersList, setPartnersList] = useState(samplePartners)
  const [searchName, setSearchName] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [editingPartner, setEditingPartner] = useState<(typeof samplePartners)[0] | null>(null)
  const [passwordInput, setPasswordInput] = useState("")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [pendingEditId, setPendingEditId] = useState<string | null>(null)

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  const handleTogglePublish = (id: string) => {
    setPartnersList((prev) =>
      prev.map((partner) => (partner.id === id ? { ...partner, published: !partner.published } : partner)),
    )
  }

  const handleLogoClick = (partnerId: string) => {
    setPendingEditId(partnerId)
    setShowPasswordDialog(true)
  }

  const handlePasswordSubmit = () => {
    if (passwordInput === "FSIF") {
      const partner = partnersList.find((p) => p.id === pendingEditId)
      if (partner) {
        setEditingPartner(partner)
      }
      setShowPasswordDialog(false)
      setPasswordInput("")
      setPendingEditId(null)
    } else {
      alert("パスワードが正しくありません")
    }
  }

  const handleSaveEdit = () => {
    if (editingPartner) {
      setPartnersList((prev) => prev.map((partner) => (partner.id === editingPartner.id ? editingPartner : partner)))
      setEditingPartner(null)
    }
  }

  const filteredPartners = partnersList.filter((partner) => {
    const matchName = partner.name.toLowerCase().includes(searchName.toLowerCase())
    const matchType = filterType === "all" || partner.type === filterType
    const matchCategory = filterCategory === "all" || partner.category === filterCategory
    return matchName && matchType && matchCategory
  })

  return (
    <div className="min-h-screen bg-[#000033]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="text-[#83CBEB] hover:text-[#83CBEB]/80 font-sans mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              管理画面に戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#EEEEFF]">パートナー管理</h1>
          <p className="text-[#EEEEFF]/60 font-sans mt-2">既存パートナーの掲載制御を行います（ロゴクリックで編集）</p>
        </div>

        <Card className="bg-[#000033] border-[#83CBEB]/30 mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#EEEEFF] flex items-center gap-2">
              <Search className="h-5 w-5" />
              検索フィルター
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchName" className="text-[#EEEEFF] font-sans">
                名称で検索
              </Label>
              <Input
                id="searchName"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                placeholder="例: スペース"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filterType" className="text-[#EEEEFF] font-sans">
                登録形態
              </Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                  <SelectItem value="all" className="text-[#EEEEFF] font-sans">
                    すべて
                  </SelectItem>
                  <SelectItem value="企業" className="text-[#EEEEFF] font-sans">
                    企業
                  </SelectItem>
                  <SelectItem value="団体" className="text-[#EEEEFF] font-sans">
                    団体
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filterCategory" className="text-[#EEEEFF] font-sans">
                事業の大枠
              </Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#000033] border-[#83CBEB]/30">
                  <SelectItem value="all" className="text-[#EEEEFF] font-sans">
                    すべて
                  </SelectItem>
                  <SelectItem value="テクノロジー" className="text-[#EEEEFF] font-sans">
                    テクノロジー
                  </SelectItem>
                  <SelectItem value="教育" className="text-[#EEEEFF] font-sans">
                    教育
                  </SelectItem>
                  <SelectItem value="研究" className="text-[#EEEEFF] font-sans">
                    研究
                  </SelectItem>
                  <SelectItem value="製造" className="text-[#EEEEFF] font-sans">
                    製造
                  </SelectItem>
                  <SelectItem value="その他" className="text-[#EEEEFF] font-sans">
                    その他
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="bg-[#000033] border-[#83CBEB]/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-32 h-32 relative bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleLogoClick(partner.id)}
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg?height=128&width=128"}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-base font-serif text-[#EEEEFF] mb-2">{partner.name}</h3>
                    <div className="flex justify-center gap-2 mb-3">
                      <Badge variant="outline" className="border-[#83CBEB] text-[#83CBEB] font-sans text-xs">
                        {partner.type === "企業" ? (
                          <Building2 className="h-3 w-3 mr-1" />
                        ) : (
                          <Users className="h-3 w-3 mr-1" />
                        )}
                        {partner.type}
                      </Badge>
                      <Badge variant="outline" className="border-[#EEEEBB] text-[#EEEEBB] font-sans text-xs">
                        {partner.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-[#EEEEFF]/60 font-sans">
                        {partner.published ? "HP掲載中" : "非掲載"}
                      </span>
                      <Switch
                        checked={partner.published}
                        onCheckedChange={() => handleTogglePublish(partner.id)}
                        className="data-[state=checked]:bg-[#83CBEB]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#EEEEFF]">パスワードを入力してください</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#EEEEFF] font-sans">パスワード</Label>
                <Input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePasswordSubmit()
                  }}
                  className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  placeholder="パスワードを入力"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    setShowPasswordDialog(false)
                    setPasswordInput("")
                    setPendingEditId(null)
                  }}
                  variant="outline"
                  className="border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                >
                  キャンセル
                </Button>
                <Button
                  onClick={handlePasswordSubmit}
                  className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans"
                >
                  確認
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingPartner} onOpenChange={() => setEditingPartner(null)}>
          <DialogContent className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#EEEEFF]">パートナー情報の編集</DialogTitle>
            </DialogHeader>
            {editingPartner && (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">企業・団体名</Label>
                  <Input
                    value={editingPartner.name}
                    onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">一言活動・事業内容</Label>
                  <Input
                    value={editingPartner.tagline}
                    onChange={(e) => setEditingPartner({ ...editingPartner, tagline: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">概要</Label>
                  <Textarea
                    value={editingPartner.overview}
                    onChange={(e) => setEditingPartner({ ...editingPartner, overview: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">主な活動内容</Label>
                  <Textarea
                    value={editingPartner.activities}
                    onChange={(e) => setEditingPartner({ ...editingPartner, activities: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#EEEEFF] font-sans">主な実績</Label>
                  <Textarea
                    value={editingPartner.achievements}
                    onChange={(e) => setEditingPartner({ ...editingPartner, achievements: e.target.value })}
                    className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setEditingPartner(null)}
                    variant="outline"
                    className="border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                  >
                    キャンセル
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans"
                  >
                    保存
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#EEEEFF]/60 font-sans">検索条件に一致するパートナーが見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  )
}
