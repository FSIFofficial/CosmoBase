"use client"

import { useCallback, useEffect, useState } from "react"
import { ARRIVAL_STATE, MMX_PATH, PHOBOS_REF } from "./trajectory-data"
import styles from "./detail.module.css"

// 打ち上げ：2026年10月20日 4時41分03秒（日本時間）
const LAUNCH = Date.parse("2026-10-19T19:41:03Z")
const HOUR = 3600000
const DAY = 24 * HOUR
const AU_KM = 149597870.7

/* ───────── 太陽のまわり（行き） ───────── */

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
type Vec2 = [number, number]
type Vec3 = [number, number, number]

function planetAt(body: Body, t: number): Vec2 {
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

/* ───────── 火星への到着（火星中心） ───────── */

const MU_MARS = 42828.37 // km^3/s^2
const R_MARS = 3389.5
const R_PHOBOS_ORBIT = 9377
const PHOBOS_PERIOD = 7.6539 * HOUR

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const scale3 = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k]
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const norm = (a: Vec3) => Math.sqrt(dot(a, a))
const unit = (a: Vec3) => scale3(a, 1 / norm(a))

// JPLの計画軌道の位置と速度から、火星に近づく双曲線軌道を求める
const R0 = [...ARRIVAL_STATE.r] as Vec3
const V0 = [...ARRIVAL_STATE.v] as Vec3
const T0 = Date.parse(ARRIVAL_STATE.t)
const H_VEC = cross(R0, V0)
const H_UNIT = unit(H_VEC)
const E_VEC = sub(scale3(cross(V0, H_VEC), 1 / MU_MARS), scale3(R0, 1 / norm(R0)))
const HYP_E = norm(E_VEC)
const HYP_A = 1 / (2 / norm(R0) - dot(V0, V0) / MU_MARS) // 負の値
const P_HAT = unit(E_VEC)
const Q_HAT = cross(H_UNIT, P_HAT)
const HYP_N = Math.sqrt(MU_MARS / Math.abs(HYP_A) ** 3)
const PERIAPSIS = Math.abs(HYP_A) * (HYP_E - 1)

const tp = (() => {
  // 今の位置の真近点角から、最接近（MOI-1）の時刻を出す
  const r = norm(R0)
  let nu = Math.acos(Math.max(-1, Math.min(1, dot(E_VEC, R0) / (HYP_E * r))))
  if (dot(R0, V0) < 0) nu = -nu
  const F = 2 * Math.atanh(Math.sqrt((HYP_E - 1) / (HYP_E + 1)) * Math.tan(nu / 2))
  const M = HYP_E * Math.sinh(F) - F
  return T0 - (M / HYP_N) * 1000
})()

// MOI-1：最接近で減速し、遠い点が火星半径の40倍の楕円に入る（Ozaki et al. 2018の設計値）
const APO = 40 * R_MARS
const E1_A = (PERIAPSIS + APO) / 2
const E1_E = (APO - PERIAPSIS) / (APO + PERIAPSIS)
const E1_N = Math.sqrt(MU_MARS / E1_A ** 3)
const T_MOI2 = tp + (Math.PI / E1_N) * 1000

// MOI-2：遠い点で軌道面をフォボスの軌道面（火星の赤道面）に合わせ、近い点をフォボスの高さまで上げる
const APO_DIR_RAW: Vec3 = scale3(P_HAT, -1)
const APO_DIR = unit([APO_DIR_RAW[0], APO_DIR_RAW[1], 0])
const P2_HAT: Vec3 = scale3(APO_DIR, -1)
const Q2_HAT: Vec3 = [-P2_HAT[1], P2_HAT[0], 0]
const E2_A = (R_PHOBOS_ORBIT + APO) / 2
const E2_E = (APO - R_PHOBOS_ORBIT) / (APO + R_PHOBOS_ORBIT)
const E2_N = Math.sqrt(MU_MARS / E2_A ** 3)
const T_MOI3 = T_MOI2 + (Math.PI / E2_N) * 1000

// MOI-3：フォボスの高さで円軌道にする
const CIRC_N = Math.sqrt(MU_MARS / R_PHOBOS_ORBIT ** 3)
const CIRC_START = Math.atan2(P2_HAT[1], P2_HAT[0])

const ARRIVAL_START = tp - 18 * HOUR
const ARRIVAL_END = T_MOI3 + 1 * DAY

function keplerE(M: number, e: number) {
  let E = M
  for (let i = 0; i < 20; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  return E
}

function keplerF(M: number, e: number) {
  let F = Math.asinh(M / e)
  for (let i = 0; i < 30; i++) F -= (e * Math.sinh(F) - F - M) / (e * Math.cosh(F) - 1)
  return F
}

const add2 = (p: Vec3, q: Vec3, a: number, b: number): Vec2 => [p[0] * a + q[0] * b, p[1] * a + q[1] * b]

function hypAtF(F: number): Vec2 {
  const a = Math.abs(HYP_A)
  return add2(P_HAT, Q_HAT, a * (HYP_E - Math.cosh(F)), a * Math.sqrt(HYP_E * HYP_E - 1) * Math.sinh(F))
}
const e1AtE = (E: number): Vec2 =>
  add2(P_HAT, Q_HAT, E1_A * (Math.cos(E) - E1_E), E1_A * Math.sqrt(1 - E1_E * E1_E) * Math.sin(E))
const e2AtE = (E: number): Vec2 =>
  add2(P2_HAT, Q2_HAT, E2_A * (Math.cos(E) - E2_E), E2_A * Math.sqrt(1 - E2_E * E2_E) * Math.sin(E))
const circAt = (t: number): Vec2 => {
  const th = CIRC_START + CIRC_N * ((t - T_MOI3) / 1000)
  return [R_PHOBOS_ORBIT * Math.cos(th), R_PHOBOS_ORBIT * Math.sin(th)]
}

// その時刻のMMXの位置（火星中心、火星の赤道面に投影、km）
function arrivalAt(t: number): Vec2 {
  if (t < tp) return hypAtF(keplerF(HYP_N * ((t - tp) / 1000), HYP_E))
  if (t < T_MOI2) return e1AtE(keplerE(E1_N * ((t - tp) / 1000), E1_E))
  if (t < T_MOI3) return e2AtE(keplerE(Math.PI + E2_N * ((t - T_MOI2) / 1000), E2_E))
  return circAt(t)
}

function phobosAt(t: number): Vec2 {
  const th = (PHOBOS_REF.angleDeg * Math.PI) / 180 + (2 * Math.PI * (t - Date.parse(PHOBOS_REF.t))) / PHOBOS_PERIOD
  return [R_PHOBOS_ORBIT * Math.cos(th), R_PHOBOS_ORBIT * Math.sin(th)]
}

// 線は近点角で細かく区切って描く（最接近の前後で速さが大きく変わるため）
type TimedPoint = { t: number; p: Vec2 }
const ARRIVAL_TRACK: TimedPoint[] = (() => {
  const pts: TimedPoint[] = []
  const F0 = keplerF(HYP_N * ((ARRIVAL_START - tp) / 1000), HYP_E)
  for (let i = 0; i <= 240; i++) {
    const F = F0 * (1 - i / 240)
    const M = HYP_E * Math.sinh(F) - F
    pts.push({ t: tp + (M / HYP_N) * 1000, p: hypAtF(F) })
  }
  for (let i = 1; i <= 240; i++) {
    const E = (Math.PI * i) / 240
    const M = E - E1_E * Math.sin(E)
    pts.push({ t: tp + (M / E1_N) * 1000, p: e1AtE(E) })
  }
  for (let i = 1; i <= 240; i++) {
    const E = Math.PI + (Math.PI * i) / 240
    const M = E - E2_E * Math.sin(E) - Math.PI
    pts.push({ t: T_MOI2 + (M / E2_N) * 1000, p: e2AtE(E) })
  }
  for (let i = 1; i <= 240; i++) {
    const t = T_MOI3 + ((ARRIVAL_END - T_MOI3) * i) / 240
    pts.push({ t, p: circAt(t) })
  }
  return pts
})()

/* ───────── 行きの道のり（太陽中心） ───────── */

// 5日おきの計画軌道の点を、時刻にそって3次曲線でなめらかにつなぐ。到着は最接近の時刻
const LAUNCH_POINT = planetAt("earth", LAUNCH)
const ARRIVAL = tp
const CRUISE: TimedPoint[] = [
  { t: LAUNCH, p: LAUNCH_POINT },
  ...MMX_PATH.map(([d, x, y]) => ({ t: Date.parse(`${d}T12:00:00Z`), p: [x, y] as Vec2 })).filter((q) => q.t < ARRIVAL),
  { t: ARRIVAL, p: planetAt("mars", ARRIVAL) },
]

function tangent(i: number): Vec2 {
  const a = CRUISE[Math.max(0, i - 1)]
  const b = CRUISE[Math.min(CRUISE.length - 1, i + 1)]
  const dt = b.t - a.t
  return [(b.p[0] - a.p[0]) / dt, (b.p[1] - a.p[1]) / dt]
}

function cruiseAt(t: number): Vec2 {
  if (t >= ARRIVAL) return planetAt("mars", t)
  if (t <= LAUNCH) return LAUNCH_POINT
  let i = 0
  while (CRUISE[i + 1].t < t) i++
  const p = CRUISE[i]
  const q = CRUISE[i + 1]
  const h = q.t - p.t
  const s = (t - p.t) / h
  const m0 = tangent(i)
  const m1 = tangent(i + 1)
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1
  const h10 = s ** 3 - 2 * s ** 2 + s
  const h01 = -2 * s ** 3 + 3 * s ** 2
  const h11 = s ** 3 - s ** 2
  return [
    h00 * p.p[0] + h10 * h * m0[0] + h01 * q.p[0] + h11 * h * m1[0],
    h00 * p.p[1] + h10 * h * m0[1] + h01 * q.p[1] + h11 * h * m1[1],
  ]
}

const CRUISE_TRACK: TimedPoint[] = Array.from({ length: 321 }, (_, i) => {
  const t = LAUNCH + ((ARRIVAL - LAUNCH) * i) / 320
  return { t, p: cruiseAt(t) }
})

function orbitPath(body: Body, periodDays: number) {
  const start = Date.UTC(2027, 0, 1)
  const pts = Array.from({ length: 181 }, (_, i) => planetAt(body, start + (periodDays * DAY * i) / 180))
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join("") + "Z"
}

const EARTH_ORBIT = orbitPath("earth", 365.256)
const MARS_ORBIT = orbitPath("mars", 686.98)

/* ───────── フォボスのまわり（QSO） ───────── */

// フォボスから見た軌道の大きさ（火星の方向×進む方向の半分の長さ、km）と1周の時間
// 出典：Pushparaj, Baresi & Kawakatsu（JAXA）、Nakamura et al. (2021)
const QSOS = [
  { id: "QSO-H", radial: 100, along: 198.47, hours: 7.59 },
  { id: "QSO-M", radial: 50, along: 94.41, hours: 7.13 },
  { id: "QSO-LA", radial: 30, along: 48.83, hours: 5.76 },
  { id: "QSO-LB", radial: 22, along: 30.81, hours: 4.4 },
  { id: "QSO-LC", radial: 20, along: 26.69, hours: 3.97 },
] as const

/* ───────── 共通 ───────── */

type Scene = "cruise" | "arrival" | "qso"

const SCENES: { id: Scene; label: string }[] = [
  { id: "cruise", label: "行き" },
  { id: "arrival", label: "火星到着" },
  { id: "qso", label: "フォボスのまわり" },
]

const PLAY_INTERVAL = 50

function jst(t: number) {
  return new Date(t + 9 * HOUR)
}

function formatDate(t: number) {
  const d = jst(t)
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`
}

function formatDateTime(t: number) {
  const d = jst(t)
  return `${formatDate(t)} ${d.getUTCHours()}時`
}

function monthDayHour(t: number) {
  const d = jst(t)
  return `${d.getUTCMonth() + 1}月${d.getUTCDate()}日 ${d.getUTCHours()}時`
}

function shortDate(t: number) {
  const d = jst(t)
  return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()}`
}

function formatKm(km: number) {
  if (km >= 1e8) return `約${(km / 1e8).toFixed(1)}億km`
  if (km >= 1e5) return `約${Math.round(km / 1e4).toLocaleString("ja-JP")}万km`
  return `約${(Math.round(km / 100) * 100).toLocaleString("ja-JP")}km`
}

function linePath(points: Vec2[], fx: (x: number) => number, fy: (y: number) => number) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${fx(x).toFixed(2)} ${fy(y).toFixed(2)}`).join("")
}

function splitTrack(track: TimedPoint[], t: number, now: Vec2) {
  const past: Vec2[] = [...track.filter((p) => p.t <= t).map((p) => p.p), now]
  const future: Vec2[] = [now, ...track.filter((p) => p.t > t).map((p) => p.p)]
  return { past, future }
}

export default function MarsJourney() {
  // 静的書き出しの初回描画と一致させるため、今日の位置はマウント後に計算する
  const [now, setNow] = useState<number | null>(null)
  const [scene, setScene] = useState<Scene>("cruise")
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const timer = window.setInterval(update, 60 * 1000)
    return () => window.clearInterval(timer)
  }, [])

  const changeScene = (s: Scene) => {
    setPlaying(false)
    setScene(s)
  }

  return (
    <div>
      <div className={styles.journeyViews} role="group" aria-label="表示する場面">
        {SCENES.map((s) => (
          <button key={s.id} type="button" aria-pressed={scene === s.id} onClick={() => changeScene(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      {scene === "cruise" && <Cruise now={now} playing={playing} setPlaying={setPlaying} />}
      {scene === "arrival" && <Arrival ready={now !== null} playing={playing} setPlaying={setPlaying} />}
      {scene === "qso" && <Qso ready={now !== null} playing={playing} setPlaying={setPlaying} />}
    </div>
  )
}

type PlayProps = { playing: boolean; setPlaying: (v: boolean) => void }

// 再生中は一定の間隔で時刻を進め、終わりまで来たら止める
function usePlayback(playing: boolean, setPlaying: (v: boolean) => void, step: number, end: number, setT: (f: (t: number) => number) => void, t: number) {
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setT((prev) => Math.min(prev + step, end)), PLAY_INTERVAL)
    return () => window.clearInterval(timer)
  }, [playing, step, end, setT])
  useEffect(() => {
    if (playing && t >= end) setPlaying(false)
  }, [playing, t, end, setPlaying])
}

function Slider({
  t,
  min,
  max,
  step,
  label,
  ready,
  onChange,
  startLabel,
  endLabel,
  head,
  sub,
  playing,
  onPlay,
  extra,
}: {
  t: number
  min: number
  max: number
  step: number
  label: string
  ready: boolean
  onChange: (v: number) => void
  startLabel: string
  endLabel: string
  head: string
  sub: string
  playing: boolean
  onPlay: () => void
  extra?: React.ReactNode
}) {
  return (
    <div className={styles.journeyTime}>
      <div className={styles.journeyTimeHead}>
        <b>{ready ? head : "--"}</b>
        <span>{sub}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(t, min), max)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={head}
        disabled={!ready}
      />
      <div className={styles.journeyTimeEnds}>
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
      <div className={styles.journeyButtons}>
        <button type="button" disabled={!ready} onClick={onPlay}>
          {playing ? "一時停止" : "再生"}
        </button>
        {extra}
      </div>
    </div>
  )
}

/* 行き：太陽のまわりを北側から見た図 */
function Cruise({ now, playing, setPlaying }: { now: number | null } & PlayProps) {
  const [picked, setPicked] = useState<number | null>(null)
  const [zoom, setZoom] = useState<"all" | "earth">("all")
  const today = Math.min(Math.max(now ?? LAUNCH, LAUNCH), ARRIVAL)
  const t = picked ?? today
  const live = picked === null
  const ready = now !== null
  const setT = useCallback((f: (t: number) => number) => setPicked((prev) => f(prev ?? today)), [today])
  usePlayback(playing, setPlaying, 2 * DAY, ARRIVAL, setT, t)

  const mmx = cruiseAt(t)
  const earth = planetAt("earth", t)
  const mars = planetAt("mars", t)
  const { past, future } = splitTrack(CRUISE_TRACK, t, mmx)

  // 「地球の近く」では、その日の地球を中心に約1,800万kmの範囲を切り取る
  const k = zoom === "earth" ? (0.24 * SCALE) / 600 : 1
  const vb =
    zoom === "earth"
      ? `${(sx(earth[0]) - 300 * k).toFixed(2)} ${(sy(earth[1]) - 300 * k).toFixed(2)} ${(600 * k).toFixed(2)} ${(600 * k).toFixed(2)}`
      : "0 0 600 600"
  const fs = (n: number) => n * k
  const place = (x: number, y: number, gap: number) => {
    if (zoom === "earth") return { x: sx(x) + gap * k, anchor: "start" as const, y: sy(y) }
    const px = sx(x)
    const inward = px < CX
    return { x: inward ? px + gap : px - gap, anchor: inward ? ("start" as const) : ("end" as const), y: sy(y) }
  }
  const earthLabel = place(earth[0], earth[1], 16)
  const marsLabel = place(mars[0], mars[1], 16)
  const mmxLabel = place(mmx[0], mmx[1], 20)
  const fromEarth = Math.hypot(mmx[0] - earth[0], mmx[1] - earth[1]) * AU_KM
  const dayCount = Math.floor((t - LAUNCH) / DAY) + 1
  const daysLeft = Math.ceil((ARRIVAL - t) / DAY)
  const barAu = 1e7 / AU_KM

  return (
    <div>
      <div className={styles.journeyStats}>
        <div>
          <span>打ち上げから</span>
          <b>{ready ? `${dayCount}日目` : "--"}</b>
        </div>
        <div>
          <span>地球からの距離</span>
          <b>{ready ? formatKm(fromEarth) : "--"}</b>
        </div>
        <div>
          <span>火星到着まで</span>
          <b>{ready ? (t >= ARRIVAL ? "到着" : `あと約${daysLeft}日`) : "--"}</b>
        </div>
      </div>

      <div className={styles.journeyZoom} role="group" aria-label="表示する範囲">
        <button type="button" aria-pressed={zoom === "all"} onClick={() => setZoom("all")}>
          全体
        </button>
        <button type="button" aria-pressed={zoom === "earth"} onClick={() => setZoom("earth")}>
          地球の近く
        </button>
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
        <path d={linePath(future, sx, sy)} fill="none" stroke="#f26a3d" strokeWidth="2" strokeDasharray="5 6" strokeOpacity="0.8" vectorEffect="non-scaling-stroke" />
        <path d={linePath(past, sx, sy)} fill="none" stroke="#f26a3d" strokeWidth="3" vectorEffect="non-scaling-stroke" />

        {zoom === "all" && (
          <g>
            <circle cx={CX} cy={CY} r="12" fill="#ffd27a" />
            <text x={CX} y={CY + 40} textAnchor="middle" fontSize="22" fill="currentColor" fillOpacity="0.75">
              太陽
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
            <circle cx={sx(mmx[0])} cy={sy(mmx[1])} r={fs(14)} fill="#f26a3d" fillOpacity="0.25" />
            <circle cx={sx(mmx[0])} cy={sy(mmx[1])} r={fs(6)} fill="#ffffff" stroke="#f26a3d" strokeWidth={fs(2)} />
            <text x={mmxLabel.x} y={mmxLabel.y - fs(14)} textAnchor={mmxLabel.anchor} fontSize={fs(24)} fontWeight="700" fill="currentColor">
              {live ? "MMX（今ここ）" : "MMX"}
            </text>
          </g>
        )}

        {zoom === "earth" && (
          <g>
            <line
              x1={sx(earth[0]) - 280 * k}
              y1={sy(earth[1]) + 270 * k}
              x2={sx(earth[0]) - 280 * k + barAu * SCALE}
              y2={sy(earth[1]) + 270 * k}
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeWidth={fs(2)}
            />
            <text x={sx(earth[0]) - 280 * k} y={sy(earth[1]) + 260 * k} fontSize={fs(18)} fill="currentColor" fillOpacity="0.75">
              1,000万km
            </text>
          </g>
        )}
      </svg>

      <Slider
        t={t}
        min={LAUNCH}
        max={ARRIVAL}
        step={DAY / 4}
        label="表示する日付"
        ready={ready}
        onChange={(v) => {
          setPlaying(false)
          setPicked(v)
        }}
        startLabel={`打ち上げ（${shortDate(LAUNCH)}）`}
        endLabel={`火星到着（${shortDate(ARRIVAL)}）`}
        head={formatDate(t)}
        sub={live ? "今日の位置" : "選んだ日の位置"}
        playing={playing}
        onPlay={() => {
          if (playing) return setPlaying(false)
          if (t >= ARRIVAL) setPicked(LAUNCH)
          setPlaying(true)
        }}
        extra={
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
        }
      />
    </div>
  )
}

/* 火星到着：火星を中心に、火星の北極側から見た図 */
// 「広く」の範囲は、到着の軌道全体がおさまるように決める
const WIDE_VIEW = (() => {
  const xs = ARRIVAL_TRACK.map((q) => q.p[0])
  const ys = ARRIVAL_TRACK.map((q) => q.p[1])
  const minX = Math.min(...xs, -R_MARS)
  const maxX = Math.max(...xs, R_MARS)
  const minY = Math.min(...ys, -R_MARS)
  const maxY = Math.max(...ys, R_MARS)
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, half: (Math.max(maxX - minX, maxY - minY) / 2) * 1.08 }
})()

const ARRIVAL_EVENTS = [
  { t: tp, name: "MOI-1" },
  { t: T_MOI2, name: "MOI-2" },
  { t: T_MOI3, name: "MOI-3" },
]

function arrivalPhase(t: number) {
  if (t < tp - HOUR) return "火星の重力に引かれ、火星をかすめるように近づいていきます。ここまではJAXAの計画軌道どおりです。"
  if (t < tp + HOUR)
    return `MOI-1：火星に最も近づいたところ（高度約${Math.round((PERIAPSIS - R_MARS) / 10) * 10} km）でエンジンを噴いて減速し、火星の重力に捕まります。`
  if (t < T_MOI2 - 3 * HOUR) return "火星を回る細長い楕円軌道に入りました。いちばん遠いところ（火星から約13万km）に向かって上っていきます。"
  if (t < T_MOI2 + 3 * HOUR) return "MOI-2：いちばん遠いところで噴射し、軌道の傾きをフォボスの軌道に合わせ、近い側をフォボスの高さまで上げます。"
  if (t < T_MOI3 - 3 * HOUR) return "フォボスの軌道の高さに向かって下りていきます。"
  if (t < T_MOI3 + 3 * HOUR) return "MOI-3：フォボスの軌道の高さで噴射し、フォボスとほぼ同じ円軌道に入ります。"
  return "このあとフォボスとの位置のずれを少しずつ詰め、フォボスのまわりを回る軌道（QSO）に入ります。"
}

function Arrival({ ready, playing, setPlaying }: { ready: boolean } & PlayProps) {
  const [t, setTime] = useState(tp - 6 * HOUR)
  const [zoom, setZoom] = useState<"wide" | "near">("wide")
  usePlayback(playing, setPlaying, 30 * 60 * 1000, ARRIVAL_END, setTime, t)

  const mmx = arrivalAt(t)
  const phobos = phobosAt(t)
  const { past, future } = splitTrack(ARRIVAL_TRACK, t, mmx)
  const half = zoom === "wide" ? WIDE_VIEW.half : 16000
  const ox = zoom === "wide" ? WIDE_VIEW.cx : 0
  const oy = zoom === "wide" ? WIDE_VIEW.cy : 0
  const k = half / 300
  const fx = (x: number) => (x - ox) / k + 300
  const fy = (y: number) => 300 - (y - oy) / k
  const mx0 = fx(0)
  const my0 = fy(0)
  const dist = Math.hypot(mmx[0], mmx[1])
  const ahead = arrivalAt(t + 60000)
  const speed = Math.hypot(ahead[0] - mmx[0], ahead[1] - mmx[1]) / 60
  const bar = zoom === "wide" ? 50000 : 5000

  return (
    <div>
      <div className={styles.journeyStats}>
        <div>
          <span>日時（日本時間）</span>
          <b>{ready ? monthDayHour(t) : "--"}</b>
        </div>
        <div>
          <span>火星の中心からの距離</span>
          <b>{ready ? formatKm(dist) : "--"}</b>
        </div>
        <div>
          <span>火星に対する速さ</span>
          <b>{ready ? `秒速約${speed.toFixed(1)} km` : "--"}</b>
        </div>
      </div>

      <div className={styles.journeyZoom} role="group" aria-label="表示する範囲">
        <button type="button" aria-pressed={zoom === "wide"} onClick={() => setZoom("wide")}>
          広く
        </button>
        <button type="button" aria-pressed={zoom === "near"} onClick={() => setZoom("near")}>
          火星の近く
        </button>
      </div>

      <svg viewBox="0 0 600 600" role="img" aria-label="火星を中心に、MMXが近づいて火星を回る軌道に入るまでの図" className={styles.figureSvg} style={{ maxWidth: 600 }}>
        <defs>
          <clipPath id="arrivalClip">
            <rect x="0" y="0" width="600" height="600" />
          </clipPath>
        </defs>
        <g clipPath="url(#arrivalClip)">
          <circle cx={mx0} cy={my0} r={R_PHOBOS_ORBIT / k} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 5" />
          <path d={linePath(future, fx, fy)} fill="none" stroke="#f26a3d" strokeWidth="2" strokeDasharray="5 6" strokeOpacity="0.8" />
          <path d={linePath(past, fx, fy)} fill="none" stroke="#f26a3d" strokeWidth="3" />
          <circle cx={mx0} cy={my0} r={Math.max(R_MARS / k, 6)} fill="#c4532f" />
          {zoom === "near" && (
            <text x={mx0} y={my0 + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#101214">
              火星
            </text>
          )}
          {zoom === "near" && (
            <g>
              <circle cx={fx(phobos[0])} cy={fy(phobos[1])} r="5" fill="#b4b5b3" />
              <text x={fx(phobos[0]) + 10} y={fy(phobos[1]) + 20} fontSize="16" fill="currentColor" fillOpacity="0.8">
                フォボス
              </text>
            </g>
          )}
          {ARRIVAL_EVENTS.map((ev) => {
            const p = arrivalAt(ev.t)
            const r = Math.hypot(p[0], p[1])
            if (Math.abs(fx(p[0]) - 300) > 290 || Math.abs(fy(p[1]) - 300) > 290) return null
            const showLabel = r > half * 0.15
            return (
              <g key={ev.name}>
                <circle cx={fx(p[0])} cy={fy(p[1])} r="4" fill="none" stroke="currentColor" strokeOpacity="0.8" />
                {showLabel && (
                  <text x={fx(p[0]) + 8} y={fy(p[1]) - 8} fontSize="15" fill="currentColor" fillOpacity="0.8">
                    {ev.name}
                  </text>
                )}
              </g>
            )
          })}
          {ready && (
            <g>
              <circle cx={fx(mmx[0])} cy={fy(mmx[1])} r="12" fill="#f26a3d" fillOpacity="0.25" />
              <circle cx={fx(mmx[0])} cy={fy(mmx[1])} r="5" fill="#ffffff" stroke="#f26a3d" strokeWidth="2" />
              <text x={fx(mmx[0]) + 14} y={fy(mmx[1]) + 6} fontSize="20" fontWeight="700" fill="currentColor">
                MMX
              </text>
            </g>
          )}
          {zoom === "wide" && (
            <text x={mx0 + 12} y={my0 - 10} fontSize="16" fontWeight="700" fill="#e07a52">
              火星
            </text>
          )}
          <line x1={20} y1={575} x2={20 + bar / k} y2={575} stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" />
          <text x={20} y={565} fontSize="15" fill="currentColor" fillOpacity="0.75">
            {bar.toLocaleString("ja-JP")} km
          </text>
        </g>
      </svg>

      <p className={styles.journeyPhase}>{arrivalPhase(t)}</p>

      <Slider
        t={t}
        min={ARRIVAL_START}
        max={ARRIVAL_END}
        step={10 * 60 * 1000}
        label="表示する日時"
        ready={ready}
        onChange={(v) => {
          setPlaying(false)
          setTime(v)
        }}
        startLabel={shortDate(ARRIVAL_START)}
        endLabel={shortDate(ARRIVAL_END)}
        head={formatDateTime(t)}
        sub="選んだ日時の位置"
        playing={playing}
        onPlay={() => {
          if (playing) return setPlaying(false)
          if (t >= ARRIVAL_END) setTime(ARRIVAL_START)
          setPlaying(true)
        }}
      />
    </div>
  )
}

/* フォボスのまわり：フォボスを中心に、火星の方向を下にして北極側から見た図 */
function Qso({ ready, playing, setPlaying }: { ready: boolean } & PlayProps) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState(0)
  const qso = QSOS[index]

  // 1周を約4秒で回す
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setPhase((p) => (p + (2 * Math.PI * PLAY_INTERVAL) / 4000) % (2 * Math.PI)), PLAY_INTERVAL)
    return () => window.clearInterval(timer)
  }, [playing])

  // 図の範囲は、選んだQSOがおさまる大きさにする
  const half = qso.along * 1.35
  const k = half / 300
  const fx = (along: number) => 300 + along / k
  const fy = (radial: number) => 300 - radial / k
  const ring = Array.from({ length: 121 }, (_, i) => {
    const a = (2 * Math.PI * i) / 120
    return `${i === 0 ? "M" : "L"}${fx(qso.along * Math.cos(a)).toFixed(2)} ${fy(qso.radial * Math.sin(a)).toFixed(2)}`
  }).join("")
  const mx = qso.along * Math.cos(phase)
  const my = qso.radial * Math.sin(phase)
  const dist = Math.hypot(mx, my)
  const bar = qso.along > 100 ? 50 : qso.along > 40 ? 20 : 10

  return (
    <div>
      <div className={styles.journeyStats}>
        <div>
          <span>軌道</span>
          <b>{qso.id}</b>
        </div>
        <div>
          <span>フォボスからの距離（火星の方向／進む方向）</span>
          <b>{`${qso.radial}／${Math.round(qso.along)} km`}</b>
        </div>
        <div>
          <span>1周にかかる時間</span>
          <b>{`約${qso.hours.toFixed(1)}時間`}</b>
        </div>
      </div>

      <div className={styles.journeyZoom} role="group" aria-label="表示するQSO">
        {QSOS.map((q, i) => (
          <button key={q.id} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}>
            {q.id}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 600 600" role="img" aria-label={`フォボスを中心に、${qso.id}の軌道を上から見た図`} className={styles.figureSvg} style={{ maxWidth: 600 }}>
        <path d={ring} fill="none" stroke="#f26a3d" strokeWidth="2" />
        <ellipse cx={300} cy={300} rx={11 / k} ry={13.5 / k} fill="#8f8a84" />
        <text x={300} y={300 + 13.5 / k + 22} textAnchor="middle" fontSize="18" fill="currentColor" fillOpacity="0.8">
          フォボス
        </text>
        {ready && (
          <g>
            <circle cx={fx(mx)} cy={fy(my)} r="12" fill="#f26a3d" fillOpacity="0.25" />
            <circle cx={fx(mx)} cy={fy(my)} r="5" fill="#ffffff" stroke="#f26a3d" strokeWidth="2" />
            <text x={fx(mx) + 14} y={fy(my) - 10} fontSize="20" fontWeight="700" fill="currentColor">
              MMX
            </text>
          </g>
        )}
        <g fill="currentColor" fillOpacity="0.75" fontSize="16">
          <text x={300} y={590} textAnchor="middle">
            ↓ 火星の方向
          </text>
          <text x={590} y={30} textAnchor="end">
            フォボスが進む向き →
          </text>
        </g>
        <line x1={20} y1={560} x2={20 + bar / k} y2={560} stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" />
        <text x={20} y={550} fontSize="15" fill="currentColor" fillOpacity="0.75">
          {bar} km
        </text>
      </svg>

      <p className={styles.journeyPhase}>
        {`フォボスから見ると、MMXはフォボスのまわりを約${qso.hours.toFixed(1)}時間で1周します（いまフォボスの中心から約${Math.round(dist)} km）。大きなQSO-Hから始めて、少しずつ小さな軌道へ移り、フォボスに近づいていきます。`}
      </p>

      <div className={styles.journeyButtons}>
        <button type="button" disabled={!ready} onClick={() => setPlaying(!playing)}>
          {playing ? "一時停止" : "再生"}
        </button>
      </div>
    </div>
  )
}
