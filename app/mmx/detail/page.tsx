import type React from "react"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import LaunchCountdown from "./countdown"
import styles from "./detail.module.css"

const TITLE = "打上げ直前ガイド：MMXが火星の月へ"
const DESCRIPTION =
  "2026年10月20日に打ち上げ予定の火星衛星探査計画「MMX」。火星の月フォボスから砂を持ち帰る5年の旅を、打上げ情報・見どころ・はやぶさ2との違いとあわせて、はじめての人にもわかるように紹介します。"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/mmx/detail" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/mmx/detail",
    images: [{ url: "/PIA10369.jpg", width: 1280, height: 1265 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/PIA10369.jpg"],
  },
}

const LIVE_URL = "https://fanfun.jaxa.jp/countdown/mmx_h3f10/live-public_viewing.html"
const SPECIAL_SITE_URL = "https://fanfun.jaxa.jp/countdown/mmx_h3f10/index.html"
const MMX_SITE_URL = "https://www.mmx.jaxa.jp/"

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles.inlineLink}>
      {children}
      <ArrowUpRight aria-hidden="true" />
    </a>
  )
}

// 火星と2つの衛星の軌道。軌道の半径は火星の半径を単位にした実際の比(2.76倍・6.92倍)で描く
// スマホでも文字が読めるよう、横幅600の小さめの枠に収める
function MarsMoonsFigure() {
  const cx = 222
  const cy = 216
  const mars = 28
  const phobos = mars * 2.76
  const deimos = mars * 6.92
  const px = cx + phobos * 0.94
  const py = cy + phobos * 0.34
  const dx = cx + deimos * 0.77
  const dy = cy - deimos * 0.64
  return (
    <svg viewBox="0 0 600 432" role="img" aria-label="火星と2つの衛星の軌道。フォボスは火星のすぐ近くを回っている" className={styles.figureSvg} style={{ maxWidth: 600 }}>
      <circle cx={cx} cy={cy} r={deimos} fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 6" />
      <circle cx={cx} cy={cy} r={phobos} fill="none" stroke="#f26a3d" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={mars} fill="#c4532f" />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#101214">
        火星
      </text>
      <circle cx={px} cy={py} r="7" fill="#f4f1eb" />
      <circle cx={dx} cy={dy} r="5.5" fill="#f4f1eb" />
      <path d={`M${px + 9} ${py + 3}L${430} ${py + 54}`} stroke="currentColor" strokeOpacity="0.45" fill="none" />
      <text x="436" y={py + 50} fontSize="22" fontWeight="700" fill="currentColor">
        フォボス
      </text>
      <text x="436" y={py + 76} fontSize="17" fill="currentColor" fillOpacity="0.75">
        火星の中心から
      </text>
      <text x="436" y={py + 98} fontSize="17" fill="currentColor" fillOpacity="0.75">
        約9,400 km
      </text>
      <text x="436" y={py + 120} fontSize="17" fill="currentColor" fillOpacity="0.75">
        約7時間半で1周
      </text>
      <path d={`M${dx + 8} ${dy - 4}L${430} ${dy - 30}`} stroke="currentColor" strokeOpacity="0.45" fill="none" />
      <text x="436" y={dy - 32} fontSize="22" fontWeight="700" fill="currentColor">
        ダイモス
      </text>
      <text x="436" y={dy - 8} fontSize="17" fill="currentColor" fillOpacity="0.75">
        火星の中心から
      </text>
      <text x="436" y={dy + 14} fontSize="17" fill="currentColor" fillOpacity="0.75">
        約23,500 km
      </text>
      <text x="436" y={dy + 36} fontSize="17" fill="currentColor" fillOpacity="0.75">
        約30時間で1周
      </text>
    </svg>
  )
}

// 大きさ比べ。1 km = 12 単位で、3つとも同じ縮尺
function SizeFigure() {
  const k = 12
  return (
    <svg viewBox="0 0 560 330" role="img" aria-label="フォボスはリュウグウやイトカワよりはるかに大きい" className={styles.figureSvg} style={{ maxWidth: 560 }}>
      <ellipse cx="176" cy="165" rx={13.3 * k} ry={11.1 * k} fill="#8a7f74" fillOpacity="0.5" stroke="currentColor" strokeOpacity="0.4" />
      <text x="176" y="160" textAnchor="middle" fontSize="26" fontWeight="700" fill="currentColor">
        フォボス
      </text>
      <text x="176" y="190" textAnchor="middle" fontSize="18" fill="currentColor" fillOpacity="0.75">
        約27 × 22 × 18 km
      </text>
      <circle cx="420" cy="165" r={0.45 * k} fill="#f26a3d" />
      <line x1="420" y1="154" x2="420" y2="110" stroke="currentColor" strokeOpacity="0.45" />
      <text x="420" y="74" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">
        リュウグウ
      </text>
      <text x="420" y="98" textAnchor="middle" fontSize="16" fill="currentColor" fillOpacity="0.75">
        約0.9 km
      </text>
      <ellipse cx="482" cy="165" rx={0.27 * k} ry={0.15 * k} fill="currentColor" />
      <line x1="482" y1="172" x2="482" y2="214" stroke="currentColor" strokeOpacity="0.45" />
      <text x="482" y="242" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">
        イトカワ
      </text>
      <text x="482" y="266" textAnchor="middle" fontSize="16" fill="currentColor" fillOpacity="0.75">
        約0.5 km
      </text>
    </svg>
  )
}

const LAUNCH_FACTS = [
  { label: "日時", value: "2026年10月20日（火）午前4時41分03秒（日本時間）" },
  { label: "ロケット", value: "H3ロケット10号機（固体ロケットブースタを4本付けた、H3でいちばん強力な形）" },
  { label: "場所", value: "種子島宇宙センター（鹿児島県）" },
  { label: "予備期間", value: "10月21日〜11月7日（天候などで延期になった場合）" },
  { label: "分離", value: "打上げから約1時間11分後に、探査機がロケットから切り離される予定" },
]

const ORIGINS = [
  {
    name: "捕まった小惑星説",
    body: "太陽系の外側でできた小天体が火星の近くまでやってきて、重力で捕まった。",
    for: "表面の色や暗さが、太陽系の外側にある暗い小惑星に似ている。",
    against: "捕まった天体なら、今のようなきれいな円い軌道にはなりにくい。",
  },
  {
    name: "巨大衝突説",
    body: "大昔の火星に大きな天体がぶつかり、飛び散った破片が集まって月になった。",
    for: "火星の赤道の上を、ほぼ円い軌道で回っていることをうまく説明できる。",
    against: "赤っぽく暗い表面の色を、うまく説明しにくい。",
  },
]

const JOURNEY = [
  { when: "2026年10月", title: "打上げ", body: "種子島からH3ロケットで出発します。" },
  { when: "約1年", title: "火星へ向かう", body: "2027年度に火星のまわりに到着します。" },
  {
    when: "約3年",
    title: "火星圏で観測と着陸",
    body: "フォボスのまわりを回りながら全体を調べ、着陸地点を選びます。ローバーを降ろしたあと、本体が2回着陸して砂を採ります。最後にもう1つの月ダイモスのそばを何度も通って観測します。",
  },
  { when: "2030年度", title: "火星圏を出発", body: "約1年かけて地球へ戻ります。" },
  { when: "2031年度", title: "地球に帰還", body: "砂の入ったカプセルが南オーストラリア州に着陸し、回収されます。" },
]

const COMPARISON = [
  { item: "行き先", hayabusa2: "小惑星リュウグウ", mmx: "火星の衛星フォボス" },
  { item: "大きさ", hayabusa2: "約0.9 km", mmx: "約27 × 22 × 18 km" },
  { item: "砂の採り方", hayabusa2: "一瞬だけ触れて採る（タッチ・アンド・ゴー）", mmx: "脚で降り立ち、表面に約2時間半とどまって採る" },
  { item: "持ち帰る量", hayabusa2: "目標0.1 g（実際は約5.4 g）", mmx: "目標10 g以上" },
  { item: "旅の期間", hayabusa2: "約6年（2014年〜2020年）", mmx: "約5年（2026年〜2031年度）" },
  { item: "ローバー", hayabusa2: "MINERVA-II、MASCOT（独仏）など", mmx: "IDEFIX（独仏）" },
]

const TIMELINE = [
  { when: "2015年6月", what: "JAXAがMMX計画を発表" },
  { when: "2020年2月", what: "正式なプロジェクトになる" },
  { when: "2023年12月", what: "H3ロケット試験機1号機の失敗を受け、打上げを2026年度に延期" },
  { when: "2026年4月", what: "探査機を種子島宇宙センターへ運び込む" },
  { when: "2026年10月20日", what: "打上げ（予定）", highlight: true },
  { when: "2027年度", what: "火星のまわりに到着" },
  { when: "2028年終わり〜2029年初め", what: "ローバーをフォボスへ投下（見込み）" },
  { when: "2030年度", what: "火星圏を出発" },
  { when: "2031年度", what: "地球に帰還し、カプセルを回収" },
]

const GLOSSARY = [
  { term: "サンプルリターン", body: "天体の石や砂を採って、地球に持ち帰ること。地球の実験室の大型装置で、細かく分析できます。" },
  { term: "フォボス・ダイモス", body: "火星の2つの月。どちらもいびつな形の小さな天体で、フォボスのほうが大きく、火星に近いところを回っています。" },
  { term: "レゴリス", body: "天体の表面をおおう、砂や小石の層。MMXが持ち帰るのは、このレゴリスです。" },
  { term: "ローバー", body: "天体の表面を移動しながら調べる探査車。" },
  { term: "フライバイ", body: "天体に着陸したり、まわりを回ったりせず、そばを通り過ぎながら観測すること。" },
]

const SOURCES = [
  { label: "JAXA H3ロケット10号機によるMMX打上げ特設サイト", href: SPECIAL_SITE_URL },
  { label: "JAXA ライブ中継・パブリックビューイング", href: LIVE_URL },
  { label: "JAXA MMXプレスキット（2026年9月）", href: "https://fanfun.jaxa.jp/countdown/mmx_h3f10/files/mmx_press-kit_ja_20260918.pdf" },
  { label: "JAXA 打上げ計画書（2026年8月20日）", href: "https://www.jaxa.jp/press/2026/08/files/jaxa20260820-1_01.pdf" },
  { label: "MMX公式サイト", href: MMX_SITE_URL },
  { label: "ISAS MMX", href: "https://www.isas.jaxa.jp/missions/spacecraft/developing/mmx.html" },
  { label: "DLR MMX（ローバーIDEFIX）", href: "https://www.dlr.de/en/research-and-transfer/projects-and-missions/mmx" },
  { label: "CNES MMX", href: "https://cnes.fr/en/projects/mmx" },
  { label: "Kuramoto et al. (2022) Earth, Planets and Space", href: "https://doi.org/10.1186/s40623-021-01545-7" },
  { label: "Kameda et al. (2021) Earth, Planets and Space（OROCHIの写真）", href: "https://doi.org/10.1186/s40623-021-01462-9" },
  { label: "Ernst et al. (2023) Earth, Planets and Space（フォボスの形状モデル）", href: "https://doi.org/10.1186/s40623-023-01814-7" },
  { label: "Kegerreis et al. (2024) Icarus（部分的な破壊捕獲説）", href: "https://doi.org/10.1016/j.icarus.2024.116337" },
]

export default function MMXDetailPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.brand}>
          <span className={styles.brandMark}>
            <img src="/CB_icon.png" alt="" />
          </span>
          <span>
            Cosmo Base <em>×</em> MMX
          </span>
        </a>
        <a href="/mmx" className={styles.navLink}>
          MMX応援ページへ
        </a>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          <span />
          LAUNCH GUIDE
        </p>
        <h1>
          10月20日、
          <br />
          <em>火星の月</em>へ。
        </h1>
        <p className={styles.lead}>
          日本の探査機MMXが、火星の衛星フォボスの砂を持ち帰る5年の旅に出発します。打上げを見る前に知っておきたいことを、ひとつのページにまとめました。
        </p>
        <p className={styles.asOf}>2026年10月14日時点の情報です</p>
      </header>

      <section className={styles.section} aria-labelledby="quick">
        <p className={styles.sectionLabel}>
          01 <span>30秒でわかるMMX</span>
        </p>
        <h2 id="quick">火星の月から、砂を持ち帰る</h2>
        <p className={styles.body}>
          MMX（Martian Moons eXploration、火星衛星探査計画）は、JAXAが中心になって進める探査です。火星のまわりを回る月「フォボス」に着陸して砂を採り、地球へ持ち帰ります。火星のまわりから物を持ち帰るのは、成功すれば世界で初めてです。
        </p>
        <div className={styles.stats}>
          <div>
            <b>約5年</b>
            <span>打上げから帰還まで。そのうち約3年を火星のまわりで過ごす</span>
          </div>
          <div>
            <b>10 g以上</b>
            <span>持ち帰る砂の目標。はやぶさ2の目標（0.1 g）の100倍</span>
          </div>
          <div>
            <b>2031年度</b>
            <span>地球に帰ってくる予定の年</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`} aria-labelledby="launch">
        <p className={styles.sectionLabel}>
          02 <span>打上げ情報</span>
        </p>
        <h2 id="launch">打上げまで、あと</h2>
        <LaunchCountdown />
        <dl className={styles.facts}>
          {LAUNCH_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.callout}>
          <strong>ライブ中継で見る</strong>
          <p>
            JAXAが打上げの55分前ごろから75分後ごろまでライブ中継します。YouTubeのJAXAチャンネル（配信URLは近日公開予定）と、ニコニコ生放送で見られます。
          </p>
          <ExternalLink href={LIVE_URL}>中継とパブリックビューイングの案内（JAXA）</ExternalLink>
        </div>
        <p className={styles.note}>
          日時は天候や準備の状況で変わることがあります。当日はJAXAの
          <ExternalLink href={SPECIAL_SITE_URL}>打上げ特設サイト</ExternalLink>
          で最新の情報を確認してください。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="why">
        <p className={styles.sectionLabel}>
          03 <span>なぜフォボスなのか</span>
        </p>
        <h2 id="why">火星の月は、どこから来たのか</h2>
        <p className={styles.body}>
          火星には、フォボスとダイモスという2つの小さな月があります。地球の月とくらべるとずっと小さく、形もじゃがいものようにいびつです。この2つの月がどうやってできたのかは、まだわかっていません。
        </p>
        <figure className={styles.figure}>
          <MarsMoonsFigure />
          <figcaption>火星と2つの月の位置関係。軌道の大きさは実際の比のとおりで、月の点は見やすく大きくしています。フォボスは火星のすぐ近くを、1日に3周以上のペースで回っています。</figcaption>
        </figure>
        <p className={styles.body}>大きく分けて、2つの説があります。</p>
        <div className={styles.cards}>
          {ORIGINS.map((origin) => (
            <article key={origin.name} className={styles.card}>
              <h3>{origin.name}</h3>
              <p>{origin.body}</p>
              <dl>
                <dt>根拠</dt>
                <dd>{origin.for}</dd>
                <dt>弱点</dt>
                <dd>{origin.against}</dd>
              </dl>
            </article>
          ))}
        </div>
        <p className={styles.body}>
          「見た目は捕まった小惑星っぽいのに、軌道は衝突でできたっぽい」という、手がかりどうしが食い違う状態が続いています。2024年には、火星に近づいた小惑星が潮の力で壊れ、その破片の一部が捕まったという新しい説も出されました。
        </p>
        <p className={styles.body}>
          答えを出す決め手が、実際の砂です。捕まった小惑星なら、水や有機物を含む隕石に似た成分が見つかるはずです。衝突でできたなら、高温でできた火山岩のような成分が出てくるはずです。地球に持ち帰れば、遠くから眺めるだけではわからない成分や年代まで調べられます。
        </p>
        <p className={styles.body}>
          フォボスには、火星から飛んできたかけらも降り積もっていると考えられています。そのため、フォボスの砂には火星そのものの歴史が少し混ざっているかもしれない、という楽しみもあります。
        </p>
        <figure className={styles.figure}>
          <img
            src="/mmx/detail/phobos-shape-model.jpg"
            alt="フォボスの立体モデルを6つの方向から見た図。大きなクレーターと、表面を走る多くの溝が見える"
            loading="lazy"
          />
          <figcaption>
            これまでの探査機の画像から作られた、フォボスの立体モデル。出典：
            <ExternalLink href="https://doi.org/10.1186/s40623-023-01814-7">Ernst et al. (2023) Fig. 8</ExternalLink>
            （CC BY 4.0）
          </figcaption>
        </figure>
      </section>

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="journey">
        <p className={styles.sectionLabel}>
          04 <span>5年の旅</span>
        </p>
        <h2 id="journey">行って、降りて、帰ってくる</h2>
        <ol className={styles.journey}>
          {JOURNEY.map((step) => (
            <li key={step.title}>
              <span className={styles.journeyWhen}>{step.when}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className={styles.body}>
          探査機は、行きの部分・フォボスで活動する部分・帰りの部分の3つが組み合わさった形をしています。使い終わった部分から切り離していく「三段式」で、打上げのときの重さは約4.5トンです。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="highlights">
        <p className={styles.sectionLabel}>
          05 <span>見どころ</span>
        </p>
        <h2 id="highlights">ここに注目</h2>

        <article className={styles.highlight}>
          <span className={styles.highlightNo}>1</span>
          <div>
            <h3>重力が地球の1700分の1の世界を走るローバー</h3>
            <p>
              本体が着陸する前に、ドイツとフランスが作ったローバー「IDEFIX（イデフィックス）」を降ろします。重さは約25 kgありますが、フォボスの重力は地球の約1700分の1しかないため、地面にかかる重さはわずか15 gほどです。こんなに弱い重力の中を車輪で走るのは、世界で初めてです。
            </p>
            <p>
              秒速1 mmほどのゆっくりした速さで、100日以上かけて走りながら表面の砂の性質を調べます。そのデータは、あとで本体が安全に着陸するための大事な手がかりになります。投下は2028年の終わりから2029年の初めになる見込みです。
            </p>
          </div>
        </article>

        <article className={styles.highlight}>
          <span className={styles.highlightNo}>2</span>
          <div>
            <h3>「タッチ・アンド・ゴー」ではなく、本格的な着陸</h3>
            <p>
              フォボスの重力は、はやぶさ2が行ったリュウグウより2桁ほど大きく、探査機は火星の重力にも引っぱられます。そのためMMXは、一瞬だけ触れて採るのではなく、4本の脚で降り立ち、表面に約2時間半とどまって砂を採ります。
            </p>
            <p>
              採り方は2つあります。ひとつは、ロボットアームの先の筒を地面に差し込む方法。もうひとつは、着陸脚の足の裏からガスを吹きつけ、舞い上がった粒を集める方法（NASAが提供）です。着陸は場所を変えて2回行う計画です。
            </p>
          </div>
        </article>

        <article className={styles.highlight}>
          <span className={styles.highlightNo}>3</span>
          <div>
            <h3>8つの目を持つカメラ「OROCHI」</h3>
            <p>
              フォボスの表面を撮るカメラOROCHIは、色の違う光を撮る7台の広角カメラと、着陸のときに使う白黒カメラ1台、合わせて8台でできています。名前は、頭が8つある伝説の大蛇「八岐大蛇（やまたのおろち）」に由来します。
            </p>
          </div>
        </article>
        <figure className={`${styles.figure} ${styles.figureSmall}`}>
          <img src="/mmx/detail/orochi.jpg" alt="OROCHIの外観図。周りに7つ、中央に1つ、合わせて8つの窓が並んでいる" loading="lazy" />
          <figcaption>
            OROCHIの外観図。周りの7つが色ごとの広角カメラ、中央が着陸用の白黒カメラ。出典：
            <ExternalLink href="https://doi.org/10.1186/s40623-021-01462-9">Kameda et al. (2021) Fig. 4</ExternalLink>
            （CC BY 4.0）
          </figcaption>
        </figure>

        <article className={styles.highlight}>
          <span className={styles.highlightNo}>4</span>
          <div>
            <h3>世界初の「火星圏からの持ち帰り」</h3>
            <p>
              火星のまわりから物を持ち帰った探査は、まだありません。中国の「天問3号」も、火星そのものから砂を持ち帰る計画で2031年ごろの帰還をめざしています。MMXは、日本が国際協力のもとで挑む、はやぶさ・はやぶさ2に続く3回目のサンプルリターンです。
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.light}`} aria-labelledby="compare">
        <p className={styles.sectionLabel}>
          06 <span>はやぶさ2とくらべると</span>
        </p>
        <h2 id="compare">行き先も、採り方も、量もちがう</h2>
        <figure className={styles.figure}>
          <SizeFigure />
          <figcaption>同じ縮尺で並べた大きさくらべ（リュウグウははやぶさ2、イトカワははやぶさが行った小惑星）。フォボスは、リュウグウの約30倍の大きさがあります。フォボスの数字は、いちばん長い方向・中くらいの方向・いちばん短い方向の長さです。</figcaption>
        </figure>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">はやぶさ2</th>
                <th scope="col">MMX</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.item}>
                  <th scope="row">{row.item}</th>
                  <td>{row.hayabusa2}</td>
                  <td>{row.mmx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="schedule">
        <p className={styles.sectionLabel}>
          07 <span>これからの予定</span>
        </p>
        <h2 id="schedule">発表から帰還まで、16年</h2>
        <ol className={styles.timeline}>
          {TIMELINE.map((item) => (
            <li key={item.when} className={item.highlight ? styles.timelineNow : undefined}>
              <span>{item.when}</span>
              <p>{item.what}</p>
            </li>
          ))}
        </ol>
        <p className={styles.note}>2027年度以降は現在の計画です。打上げの日や運用の状況によって変わることがあります。</p>
      </section>

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="glossary">
        <p className={styles.sectionLabel}>
          08 <span>ことばの解説</span>
        </p>
        <h2 id="glossary">このページに出てきたことば</h2>
        <dl className={styles.glossary}>
          {GLOSSARY.map((entry) => (
            <div key={entry.term}>
              <dt>{entry.term}</dt>
              <dd>{entry.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="sources">
        <h2 id="sources" className={styles.sourcesHeading}>
          出典
        </h2>
        <ul className={styles.sources}>
          {SOURCES.map((source) => (
            <li key={source.href}>
              <ExternalLink href={source.href}>{source.label}</ExternalLink>
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          このページは、JAXAなどが公開している情報をもとに、個人（FSIFメンバー）とCosmo Baseがまとめた解説です。MMX公式のページではありません。
        </p>
      </section>

      <footer className={styles.footer}>
        <span>
          Cosmo Base <em>×</em> MMX
        </span>
        <small>© 2026 Cosmo Base / FSIF</small>
      </footer>
    </main>
  )
}
