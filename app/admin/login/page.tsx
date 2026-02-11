"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "FSIF") {
      // Store auth in sessionStorage
      sessionStorage.setItem("admin_auth", "true")
      router.push("/admin")
    } else {
      setError("パスワードが正しくありません")
    }
  }

  return (
    <div className="min-h-screen bg-[#000033] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#000033] border-[#83CBEB]/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-[#EEEEFF]">運営者ログイン</CardTitle>
          <CardDescription className="text-[#EEEEFF]/60 font-sans">
            管理画面にアクセスするにはパスワードを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#EEEEFF] font-sans">
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="bg-[#000033] border-[#83CBEB]/30 text-[#EEEEFF] font-sans"
                placeholder="パスワードを入力"
              />
              {error && <p className="text-red-400 text-sm font-sans">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 font-sans">
              ログイン
            </Button>
            <div className="text-center">
              <Link href="/" className="text-[#83CBEB] hover:text-[#83CBEB]/80 text-sm font-sans">
                ← ホームに戻る
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
