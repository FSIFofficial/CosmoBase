// components/full-diagnosis-card.tsx
"use client"

import Link from "next/link"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, BarChart3, Compass } from "lucide-react"

export function FullDiagnosisCard() {
  return (
    <div className="max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <GlassCard className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 p-6 sm:p-8 shadow-2xl">
        {/* 背景の装飾用グロウエフェクト */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* アイコンバッジ */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full mb-6 border border-primary/30 glow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider">PREMIUM DIAGNOSIS</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight">
            あなたの「本当の宇宙タイプ」を<br className="sm:hidden" />完全測定しませんか？
          </h3>
          
          <p className="text-muted-foreground text-sm max-w-lg mb-8 leading-relaxed">
            簡易版の4分類からさらに一歩深くへ。完全版診断では、あなたの回答から<strong className="text-primary font-semibold">【関心軸（X軸）】</strong>と<strong className="text-accent font-semibold">【行動軸（Y軸）】</strong>の精密な座標を算出し、あなただけの詳細な宇宙ポテンシャルをグラフ化します。
          </p>

          {/* 特徴インジケーター */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8 text-left">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary/20 border border-border/40">
              <Compass className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground mb-0.5">2軸の座標システム</h4>
                <p className="text-[11px] text-muted-foreground leading-tight">関心と行動の傾向を数値で正確にマッピング</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary/20 border border-border/40">
              <BarChart3 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground mb-0.5">詳細なグラフ解説</h4>
                <p className="text-[11px] text-muted-foreground leading-tight">コミュニティ内での詳細な活躍特性を可視化</p>
              </div>
            </div>
          </div>

          {/* 誘導ボタン */}
          <a href=" https://discord.gg/spv3TBRpFU" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 glow px-8 h-14 rounded-full font-bold text-base transition-all duration-300 hover:scale-[1.02]">
              Cosmo Base に参加して 宇宙タイプ診断完全版を受ける
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
          
          <p className="text-[11px] text-muted-foreground mt-3">※所要時間：約5分（全24問）</p>
        </div>
      </GlassCard>
    </div>
  )
}
