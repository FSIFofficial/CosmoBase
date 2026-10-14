"use client"

import { useEffect, useState } from "react"
import styles from "./detail.module.css"

// 打上げ予定時刻(JAXA発表、日本標準時)。延期になったらここを書き換える
const LAUNCH_DATE = new Date("2026-10-20T04:41:03+09:00")

export default function LaunchCountdown() {
  // 静的書き出しの初回描画と一致させるため、残り時間はマウント後に計算する
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setRemaining(LAUNCH_DATE.getTime() - Date.now())
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (remaining !== null && remaining <= 0) {
    return (
      <p className={styles.countdownDone}>
        打上げ予定時刻を過ぎました。結果と最新の状況は、JAXAの発表をご確認ください。
      </p>
    )
  }

  const total = remaining === null ? null : Math.floor(remaining / 1000)
  const parts = [
    { label: "日", value: total === null ? null : Math.floor(total / 86400) },
    { label: "時間", value: total === null ? null : Math.floor((total % 86400) / 3600) },
    { label: "分", value: total === null ? null : Math.floor((total % 3600) / 60) },
    { label: "秒", value: total === null ? null : total % 60 },
  ]

  return (
    <div className={styles.countdown} role="timer" aria-label="打上げ予定時刻までの残り時間">
      {parts.map((part) => (
        <span key={part.label}>
          <b>{part.value === null ? "--" : String(part.value).padStart(2, "0")}</b>
          <small>{part.label}</small>
        </span>
      ))}
    </div>
  )
}
