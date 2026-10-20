"use client"

import { useEffect, useState } from "react"
import { MMX_PATH } from "./trajectory-data"
import styles from "./detail.module.css"

// 打ち上げ：2026年10月20日 4時41分03秒（日本時間）
const LAUNCH = Date.parse("2026-10-19T19:41:03Z")
const DAY = 86400000
const AU_KM = 149597870.7

// 図の座標：太陽が中心、1 AU = 150単位。上が黄道座標のY軸の向き
const CX = 300
const CY = 300
const SCALE = 150
const sx = (x: number) => CX + x * SCALE
const sy = (y: number) => CY - y * SCALE

// 地球と火星の位置は、JPLが公開している近似軌道要素（J2000、1800〜2050年用）から計算する
// [長半径a, 離心率e, 軌道傾斜角I, 平均経度L, 近日点経度ϖ, 昇交点経度Ω] と、100年あたりの変化量
const ELEMENTS = {
  earth: [
    [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0],
    [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
  ],
  mars: [
    [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  ],
} as const

type Body = keyof typeof ELEMENTS

function planetAt(body: Body, t: number): [number, number] {
  const [base, rate] = ELEMENTS[body]
  const T = (t - Date.UTC(2000, 0, 1, 12)) / DAY / 36525
  const [a, e, inc, L, varpi, node] = base.map((v, i) => v + rate[i] * T)
  const rad = Math.PI / 180
  const omega = (varpi - node) * rad
  const Om = node * rad
  const I = inc * rad
  const M = ((((L - varpi + 180) % 360) + 360) % 360 - 180) * rad
  let E = M
  for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  const xp = a * (Math.cos(E) - e)
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E)
  const x =
    (Math.cos(omega) * Math.cos(Om) - Math.sin(omega) * Math.sin(Om) * Math.cos(I)) * xp +
    (-Math.sin(omega) * Math.cos(Om) - Math.cos(omega) * Math.sin(Om) * Math.cos(I)) * yp
  const y =
    (Math.cos(omega) * Math.sin(Om) + Math.sin(omega) * Math.cos(Om) * Math.cos(I)) * xp +
    (-Math.sin(omega) * Math.sin(Om) + Math.cos(omega) * Math.cos(Om) * Math.cos(I)) * yp
  return [x, y]
}

// 打ち上げ時刻には地球の位置にいたものとして、最初のデータ点までをつなぐ
const LAUNCH_POINT = planetAt("earth", LAUNCH)
const PATH = [
  { t: LAUNCH, x: LAUNCH_POINT[0], y: LAUNCH_POINT[1] },
  ...MMX_PATH.map(([d, x, y]) => ({ t: Date.parse(`${d}T12:00:00Z`), x, y })),
]
const ARRIVAL = PATH[PATH.length - 1].t

// その時刻のMMXの位置（5日おきの点のあいだは直線でつなぐ）
function mmxAt(t: number): [number, number] {
  if (t >= ARRIVAL) return planetAt("mars", t)
  if (t <= PATH[0].t) return [PATH[0].x, PATH[0].y]
  let i = 0
  while (PATH[i + 1].t < t) i++
  const p = PATH[i]
  const q = PATH[i + 1]
  const f = (t - p.t) / (q.t - p.t)
  return [p.x + (q.x - p.x) * f, p.y + (q.y - p.y) * f]
}

function orbitPath(body: Body, periodDays: number) {
  const start = Date.UTC(2027, 0, 1)
  const pts = Array.from({ length: 181 }, (_, i) => planetAt(body, start + (periodDays * DAY * i) / 180))
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join("") + "Z"
}

const EARTH_ORBIT = orbitPath("earth", 365.256)
const MARS_ORBIT = orbitPath("mars", 686.98)
const ARRIVAL_POINT = planetAt("mars", ARRIVAL)

function formatKm(km: number) {
  if (km >= 1e8) return `約${(km / 1e8).toFixed(1)}億km`
  return `約${Math.round(km / 1e4).toLocaleString("ja-JP")}万km`
}

// ラベルは、点から太陽の側（図の内側）に置く。外側に置くと図の端で切れるため
function label(x: number, y: number, gap: number) {
  const px = sx(x)
  const inward = px < CX
  return { x: inward ? px + gap : px - gap, anchor: inward ? ("start" as const) : ("end" as const), y: sy(y) }
}

function line(points: [number, number][]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join("")
}

type View = "all" | "earth" | "mars"

const VIEWS: { id: View; label: string }[] = [
  { id: "all", label: "全体" },
  { id: "earth", label: "地球の近く" },
  { id: "mars", label: "火星の近く" },
]

// 近くを見るときに切り取る範囲（中心から端までの距離、AU）。0.12 AUは約1,800万km
const ZOOM_HALF = 0.12
const PLAY_STEP = 2 * DAY
const PLAY_INTERVAL = 50

function formatDate(t: number) {
  const d = new Date(t + 9 * 3600000)
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`
}

function shortDate(t: number) {
  const d = new Date(t + 9 * 3600000)
  return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()}`
}

export default function MarsJourney() {
  // 静的書き出しの初回描画と一致させるため、今日の位置はマウント後に計算する
  const [now, setNow] = useState<number | null>(null)
  // スライダーで選んだ時刻。nullのときは「今日」を表示する
  const [picked, setPicked] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [view, setView] = useState<View>("all")

  useEffect(() => {
    const update = () => setNow(Math.max(Date.now(), LAUNCH))
    update()
    const timer = window.setInterval(update, 60 * 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setPicked((prev) => Math.min((prev ?? now ?? LAUNCH) + PLAY_STEP, ARRIVAL))
    }, PLAY_INTERVAL)
    return () => window.clearInterval(timer)
  }, [playing, now])

  // 到着の日まで進んだら止める
  useEffect(() => {
    if (playing && picked !== null && picked >= ARRIVAL) setPlaying(false)
  }, [playing, picked])

  const today = now ?? LAUNCH
  const t = picked ?? today
  const live = picked === null
  const mmx = mmxAt(t)
  const earth = planetAt("earth", t)
  const mars = planetAt("mars", t)
  const arrived = t >= ARRIVAL

  const past: [number, number][] = [...PATH.filter((p) => p.t <= t).map((p) => [p.x, p.y] as [number, number]), mmx]
  const future: [number, number][] = arrived ? [] : [mmx, ...PATH.filter((p) => p.t > t).map((p) => [p.x, p.y] as [number, number])]

  // 表示範囲。近くを見るときは、その時刻の地球か火星を中心に切り取る
  const center = view === "earth" ? earth : view === "mars" ? mars : null
  const k = center ? (ZOOM_HALF * 2 * SCALE) / 600 : 1
  const vb = center
    ? `${(sx(center[0]) - 300 * k).toFixed(2)} ${(sy(center[1]) - 300 * k).toFixed(2)} ${(600 * k).toFixed(2)} ${(600 * k).toFixed(2)}`
    : "0 0 600 600"
  const fs = (n: number) => n * k

  // ラベルは、全体図では太陽の側（内側）に、拡大図では右側に置く
  const place = (x: number, y: number, gap: number) =>
    center ? { x: sx(x) + gap * k, anchor: "start" as const, y: sy(y) } : label(x, y, gap)
  const earthLabel = place(earth[0], earth[1], 16)
  const marsLabel = place(mars[0], mars[1], 16)
  const mmxLabel = place(mmx[0], mmx[1], 20)

  const dayCount = Math.floor((t - LAUNCH) / DAY) + 1
  const fromEarth = Math.hypot(mmx[0] - earth[0], mmx[1] - earth[1]) * AU_KM
  const fromMars = Math.hypot(mmx[0] - mars[0], mmx[1] - mars[1]) * AU_KM
  const daysLeft = Math.ceil((ARRIVAL - t) / DAY)
  const ready = now !== null
  const mmxName = live ? "MMX（今ここ）" : "MMX"

  // 拡大図の目盛り：1,000万km
  const barAu = 1e7 / AU_KM
  const barX = center ? sx(center[0]) - 280 * k : 0
  const barY = center ? sy(center[1]) + 270 * k : 0

  return (
    <div>
      <div className={styles.journeyStats}>
        <div>
          <span>打ち上げから</span>
          <b>{ready ? `${dayCount}日目` : "--"}</b>
        </div>
        <div>
          <span>{view === "mars" ? "火星からの距離" : "地球からの距離"}</span>
          <b>{ready ? (view === "mars" && arrived ? "到着" : formatKm(view === "mars" ? fromMars : fromEarth)) : "--"}</b>
        </div>
        <div>
          <span>火星到着まで</span>
          <b>{ready ? (arrived ? "到着" : `あと約${daysLeft}日`) : "--"}</b>
        </div>
      </div>

      <div className={styles.journeyViews} role="group" aria-label="表示する範囲">
        {VIEWS.map((v) => (
          <button key={v.id} type="button" aria-pressed={view === v.id} onClick={() => setView(v.id)}>
            {v.label}
          </button>
        ))}
      </div>

      <svg
        viewBox={vb}
        role="img"
        aria-label={`太陽を中心に、地球と火星の軌道、MMXの道のりと${formatDate(t)}の位置を上から見た図`}
        className={styles.figureSvg}
        style={{ maxWidth: 600 }}
      >
        <path d={EARTH_ORBIT} fill="none" stroke="#6fb7ff" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
        <path d={MARS_ORBIT} fill="none" stroke="#c4532f" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
        <path
          d={line(future)}
          fill="none"
          stroke="#f26a3d"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeOpacity="0.8"
          vectorEffect="non-scaling-stroke"
        />
        <path d={line(past)} fill="none" stroke="#f26a3d" strokeWidth="3" vectorEffect="non-scaling-stroke" />

        {!center && (
          <g>
            <circle cx={CX} cy={CY} r="12" fill="#ffd27a" />
            <text x={CX} y={CY + 40} textAnchor="middle" fontSize="22" fill="currentColor" fillOpacity="0.75">
              太陽
            </text>
            <circle cx={sx(ARRIVAL_POINT[0])} cy={sy(ARRIVAL_POINT[1])} r="10" fill="none" stroke="#c4532f" strokeDasharray="3 3" />
            <text x={sx(ARRIVAL_POINT[0])} y={sy(ARRIVAL_POINT[1]) + 36} textAnchor="middle" fontSize="20" fill="currentColor" fillOpacity="0.75">
              到着予定地点
            </text>
          </g>
        )}

        {ready && (
          <g>
            <circle cx={sx(earth[0])} cy={sy(earth[1])} r={fs(8)} fill="#6fb7ff" />
            <text x={earthLabel.x} y={earthLabel.y + fs(26)} textAnchor={earthLabel.anchor} fontSize={fs(22)} fontWeight="700" fill="#6fb7ff">
              地球
            </text>
            <circle cx={sx(mars[0])} cy={sy(mars[1])} r={fs(7)} fill="#c4532f" />
            <text x={marsLabel.x} y={marsLabel.y + fs(26)} textAnchor={marsLabel.anchor} fontSize={fs(22)} fontWeight="700" fill="#e07a52">
              火星
            </text>
            {!(arrived && view === "mars") && (
              <g>
                <circle cx={sx(mmx[0])} cy={sy(mmx[1])} r={fs(14)} fill="#f26a3d" fillOpacity="0.25" />
                <circle cx={sx(mmx[0])} cy={sy(mmx[1])} r={fs(6)} fill="#ffffff" stroke="#f26a3d" strokeWidth={fs(2)} />
                <text x={mmxLabel.x} y={mmxLabel.y - fs(14)} textAnchor={mmxLabel.anchor} fontSize={fs(24)} fontWeight="700" fill="currentColor">
                  {mmxName}
                </text>
              </g>
            )}
          </g>
        )}

        {center && (
          <g>
            <line x1={barX} y1={barY} x2={barX + barAu * SCALE} y2={barY} stroke="currentColor" strokeOpacity="0.7" strokeWidth={fs(2)} />
            <text x={barX} y={barY - fs(10)} fontSize={fs(18)} fill="currentColor" fillOpacity="0.75">
              1,000万km
            </text>
          </g>
        )}
      </svg>

      <div className={styles.journeyTime}>
        <div className={styles.journeyTimeHead}>
          <b>{ready ? formatDate(t) : "--"}</b>
          <span>{live ? "今日の位置" : "選んだ日の位置"}</span>
        </div>
        <input
          type="range"
          min={LAUNCH}
          max={ARRIVAL}
          step={DAY}
          value={Math.min(t, ARRIVAL)}
          onChange={(e) => {
            setPlaying(false)
            setPicked(Number(e.target.value))
          }}
          aria-label="表示する日付"
          aria-valuetext={formatDate(t)}
          disabled={!ready}
        />
        <div className={styles.journeyTimeEnds}>
          <span>打ち上げ（{shortDate(LAUNCH)}）</span>
          <span>火星到着（{shortDate(ARRIVAL)}）</span>
        </div>
        <div className={styles.journeyButtons}>
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              if (playing) {
                setPlaying(false)
                return
              }
              if (t >= ARRIVAL) setPicked(LAUNCH)
              setPlaying(true)
            }}
          >
            {playing ? "一時停止" : "再生"}
          </button>
          <button
            type="button"
            disabled={!ready || live}
            onClick={() => {
              setPlaying(false)
              setPicked(null)
            }}
          >
            今日に戻る
          </button>
        </div>
      </div>
    </div>
  )
}
