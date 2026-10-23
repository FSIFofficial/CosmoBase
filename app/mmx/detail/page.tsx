import type React from "react"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import MarsJourney from "./trajectory"
import styles from "./detail.module.css"

const TITLE = "MMXが火星の月へ出発：はじめてのMMXガイド"
const DESCRIPTION =
  "2026年10月20日に打ち上げられた火星衛星探査計画「MMX」。火星の月フォボスから砂を持ち帰る5年の旅を、打ち上げの結果・見どころ・はやぶさ2との違いとあわせて、はじめての人にもわかるように紹介します。"

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

const SPECIAL_SITE_URL = "https://fanfun.jaxa.jp/countdown/mmx_h3f10/index.html"
const MMX_SITE_URL = "https://www.mmx.jaxa.jp/"
// 打ち上げ10秒前（57分34秒）から再生する
const LAUNCH_VIDEO_URL = "https://www.youtube.com/watch?v=sZGyK9jfoy4&t=3454s"
const PRESS_VIDEO_URL = "https://www.youtube.com/live/f-3olrShISs"
const GAME_URL = "https://edu.jaxa.jp/contents/mmxgame/index.html"

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
  { label: "日時", value: "2026年10月20日（火）午前4時41分03秒（日本時間）に打ち上げ" },
  { label: "ロケット", value: "H3ロケット10号機（補助ロケットを4本付けた、いちばんパワーのある形）" },
  { label: "場所", value: "種子島宇宙センター（鹿児島県）" },
  { label: "分離", value: "打ち上げから約1時間11分13秒後に、探査機がロケットから正常に切り離され、火星へ向かう軌道に入りました" },
  { label: "探査機の状態", value: "分離のあと、国内の3つのアンテナで探査機の電波を受信。10月21日に、太陽電池パネルの展開やアンテナの固定の解除など、打ち上げ直後の大事な作業がすべて正常に終わりました。いまは搭載機器を一つずつ点検しています" },
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
  { when: "2026年10月20日", title: "打ち上げ成功", body: "種子島からH3ロケットで出発しました。" },
  { when: "約10か月", title: "火星へ向かう", body: "2027年8月ごろ、火星のまわりに到着します。" },
  {
    when: "約3年",
    title: "火星のまわりで観測と着陸",
    body: "フォボスのまわりを回りながら全体を調べ、着陸地点を選びます。ローバーを降ろしたあと、本体が2回着陸して砂を採ります。最後にもう1つの月ダイモスのそばを何度も通って観測します。",
  },
  { when: "2030年11月ごろ", title: "火星のまわりを出発", body: "1年弱かけて地球へ戻ります。" },
  { when: "2031年7月ごろ", title: "地球に帰還", body: "砂の入ったカプセルが南オーストラリア州に着陸し、回収されます。" },
]

const TRIVIA = [
  {
    title: "探査機は、なぜ金色？",
    body: "金色に見えるのは、探査機を包む断熱材の色です。何層にも重なったシートで、外からの熱をさえぎります。断熱材には銀色や黒色のものもありますが、MMXは金色のものを使っています。",
  },
  {
    title: "写真も、カプセルで持ち帰る",
    body: "火星のそばから地球へ送れるデータの量には限りがあります。送りきれなかった画像や観測データは、カプセルの中のメモリに保存して、砂と一緒に地球へ持ち帰ります。",
  },
  {
    title: "名前に隠れた、日本のことば",
    body: "観測機器の名前には日本語が隠れています。遠くを見る望遠カメラのTENGOOは鼻の長い「天狗」、8台のカメラを束ねたOROCHIは頭が8つの「八岐大蛇」、フォボスの成分を見るMEGANEは「眼鏡」です。",
  },
  {
    title: "フォボスでは、体重60 kgの人が約35 g",
    body: "フォボスの重力は地球の約1700分の1です。体重60 kgの人がフォボスに立つと、重さは約35 g、卵1個よりも軽くなります。ジャンプすると、ゆっくりと高く飛び上がってしまうほどです。",
  },
  {
    title: "フォボスには、火星のかけらが積もっている",
    body: "火星に隕石がぶつかると、火星の砂や岩のかけらが宇宙に飛び散ります。火星のすぐ近くを回るフォボスには、もう1つの月ダイモスの100倍以上も、そのかけらが降り積もっていると考えられています。",
  },
  {
    title: "応援メッセージは、フォボスに残る",
    body: "「#グッドラックMMX」には、約5,000人から応援メッセージが届きました。メッセージはSDカードに記録して、カプセルとローバーに積んであります。カプセルの分は砂と一緒に地球へ戻り、ローバーの分はずっとフォボスに残ります。",
  },
  {
    title: "着陸する足の裏は、しま模様",
    body: "着陸脚の先の丸いパッドには、しま模様があります。飾りではなく、熱くなりすぎないように熱の伝わり方を調整するためと、降り立ったときに探査機とフォボスの電気の状態をそろえるための工夫です。",
  },
]

const COMPARISON = [
  { item: "行き先", hayabusa2: "小惑星リュウグウ", mmx: "火星の衛星フォボス" },
  { item: "大きさ", hayabusa2: "約0.9 km", mmx: "約27 × 22 × 18 km" },
  { item: "砂の採り方", hayabusa2: "一瞬だけ触れて採る（タッチ・アンド・ゴー）", mmx: "脚で降り立ち、表面に約2時間半とどまって採る" },
  { item: "持ち帰る量", hayabusa2: "目標0.1 g（実際は約5.4 g）", mmx: "目標10 g以上" },
  { item: "旅の期間", hayabusa2: "約6年（2014年〜2020年）", mmx: "約5年（2026年〜2031年度）" },
  { item: "ローバー", hayabusa2: "小型ローバー4台（うち1台は独仏製）", mmx: "IDEFIX（独仏）" },
]

const TIMELINE = [
  { when: "2015年6月", what: "JAXAがMMX計画を発表" },
  { when: "2020年2月", what: "正式なプロジェクトになる" },
  { when: "2023年12月", what: "H3ロケット試験機1号機の失敗を受け、打ち上げを2026年度に延期" },
  { when: "2026年4月", what: "探査機を種子島宇宙センターへ運び込む" },
  { when: "2026年10月20日", what: "打ち上げ成功", highlight: true },
  { when: "2027年8月ごろ", what: "火星のまわりに到着" },
  { when: "2028年終わり〜2029年初め", what: "ローバーをフォボスへ投下（見込み）" },
  { when: "2030年11月ごろ", what: "火星のまわりを出発" },
  { when: "2031年7月ごろ", what: "地球に帰還し、カプセルを回収" },
]

const GLOSSARY = [
  { term: "サンプルリターン", body: "天体の石や砂を採って、地球に持ち帰ること。地球の実験室の大型装置で、細かく分析できます。" },
  { term: "フォボス・ダイモス", body: "火星の2つの月。どちらもいびつな形の小さな天体で、フォボスのほうが大きく、火星に近いところを回っています。" },
  { term: "レゴリス", body: "天体の表面をおおう、砂や小石の層。MMXが持ち帰るのは、このレゴリスです。" },
  { term: "ローバー", body: "天体の表面を移動しながら調べる探査車。" },
  { term: "年度", body: "国や学校などで使う、4月から翌年3月までの1年の区切り。たとえば2031年度は、2031年4月から2032年3月までです。" },
  { term: "フライバイ", body: "天体に着陸したり、まわりを回ったりせず、そばを通り過ぎながら観測すること。" },
]

const SOURCES = [
  { label: "JAXA H3ロケット10号機によるMMX打上げ特設サイト", href: SPECIAL_SITE_URL },
  { label: "JAXA プレスリリース（2026年10月21日、初期クリティカル運用フェーズの終了）", href: "https://www.jaxa.jp/press/2026/10/20261021-1_j.html" },
  { label: "JAXA「火星衛星探査機(MMX)/H3ロケット10号機打上げライブ中継」（YouTube）", href: LAUNCH_VIDEO_URL },
  { label: "JAXA「火星衛星探査機(MMX)/H3ロケット10号機打上げ前ブリーフィング」（YouTube）", href: "https://www.youtube.com/live/bKxY9gIwpRs" },
  { label: "JAXA「火星衛星探査機(MMX)/H3ロケット10号機打上げ経過記者会見」（YouTube）", href: PRESS_VIDEO_URL },
  { label: "JAXA「フォボス・トラベラーズ・ガイド」第1回（YouTube）", href: "https://www.youtube.com/live/AxXhi2DXYWM" },
  { label: "JAXA「フォボス・トラベラーズ・ガイド」第2回（YouTube）", href: "https://www.youtube.com/live/S65VZwuWdw0" },
  { label: "NHK「火星衛星探査機『MMX』 火星へ向かう軌道に 打ち上げ成功」", href: "https://news.web.nhk/newsweb/na/nd-20261019de61814" },
  { label: "SPACE CONNECT「H3ロケット10号機、MMXの打ち上げに成功」", href: "https://space-connect.jp/mmx-h3f10-launch/" },
  { label: "JAXA MMXプレスキット（2026年9月）", href: "https://fanfun.jaxa.jp/countdown/mmx_h3f10/files/mmx_press-kit_ja_20260918.pdf" },
  { label: "JAXA 打上げ計画書（2026年8月20日）", href: "https://www.jaxa.jp/press/2026/08/files/jaxa20260820-1_01.pdf" },
  { label: "MMX公式サイト", href: MMX_SITE_URL },
  { label: "NASA/JPL Horizons（MMXの計画軌道）", href: "https://ssd.jpl.nasa.gov/horizons/" },
  { label: "尾崎ほか (2018)「火星衛星探査計画MMXの軌道設計」（第62回宇宙科学技術連合講演会）", href: "https://jxiv.jst.go.jp/index.php/jxiv/preprint/download/770/2268" },
  { label: "Pushparaj, Baresi & Kawakatsu「Phobos proximity orbital transfer analysis with applications to MMX mission」（JAXA）", href: "https://jaxa.repo.nii.ac.jp/record/48302/files/SA6000167011.pdf" },
  { label: "MMX公式サイト（よくある質問）", href: "https://www.mmx.jaxa.jp/faq/" },
  { label: "MMX公式サイト（サイエンス）", href: "https://www.mmx.jaxa.jp/science/" },
  { label: "ISAS MMX", href: "https://www.isas.jaxa.jp/missions/spacecraft/developing/mmx.html" },
  { label: "DLR MMX（ローバーIDEFIX）", href: "https://www.dlr.de/en/research-and-transfer/projects-and-missions/mmx" },
  { label: "CNES MMX", href: "https://cnes.fr/en/projects/mmx" },
  { label: "Kuramoto et al. (2022) Earth, Planets and Space", href: "https://doi.org/10.1186/s40623-021-01545-7" },
  { label: "Kameda et al. (2021) Earth, Planets and Space（OROCHI）", href: "https://doi.org/10.1186/s40623-021-01462-9" },
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
          MMX GUIDE
        </p>
        <h1>
          10月20日、
          <br />
          <em>火星の月</em>へ。
        </h1>
        <p className={styles.lead}>
          日本の探査機MMXが、火星の衛星フォボスの砂を持ち帰る5年の旅に出発しました。これから何が起きるのか、知っておきたいことをひとつのページにまとめました。
        </p>
        <p className={styles.asOf}>2026年10月23日時点の情報です</p>
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
            <span>打ち上げから帰還まで。そのうち約3年を火星のまわりで過ごす</span>
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
          02 <span>打ち上げ結果</span>
        </p>
        <h2 id="launch">打ち上げ、成功！</h2>
        <p className={styles.body}>
          MMXを載せたH3ロケット10号機は、予定どおりの時刻に打ち上げられました。H3ロケットが探査機を火星へ向かう軌道に送ったのは、今回が初めてです。
        </p>
        <dl className={styles.facts}>
          {LAUNCH_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.body} style={{ marginTop: 24 }}>
          打ち上げの瞬間は、JAXAのライブ中継の録画で見られます（打ち上げ10秒前から再生されます）。
          <br />
          <ExternalLink href={LAUNCH_VIDEO_URL}>打ち上げライブ中継（JAXA公式YouTube）</ExternalLink>
        </p>
        <p className={styles.body}>
          ロケットは八丈島と小笠原諸島のあいだの上空を通ったため、夜明け前の空で太陽に照らされたロケットが、関東など本州からも見えました。
        </p>
        <div className={styles.callout}>
          <strong>次の節目</strong>
          <p>
            約10か月かけて火星へ向かい、2027年8月ごろに火星のまわりに到着する予定です。到着のときは、エンジンを噴いてスピードを秒速約1 km落とし、火星の重力に捕まえてもらいます。決まった時刻にしかできない、旅の最初の大きな山場です。
          </p>
          <ExternalLink href={MMX_SITE_URL}>探査機の最新の状況（MMX公式サイト）</ExternalLink>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="route">
        <p className={styles.sectionLabel}>
          03 <span>火星への道のり</span>
        </p>
        <h2 id="route">MMXは、今ここ</h2>
        <p className={styles.body}>
          MMXは、太陽のまわりを大きく回りながら、約10か月かけて火星に追いつきます。地球からまっすぐ火星に向かうのではなく、地球と火星の動きに合わせて、燃料が少なくて済む道を通ります。
        </p>
        <figure className={styles.figure}>
          <MarsJourney />
          <figcaption>
            「行き」は太陽のまわりを北側から見た図で、オレンジの実線がこれまでの道のり、点線がこれからの道のりです。MMXの位置は、JAXAが打ち上げ前に計画した軌道（NASA/JPL Horizonsで公開）を、なめらかな曲線でつないで計算した目安です。地球と火星の位置は、公開されている軌道の数値から計算しています。「火星到着」は火星を中心に北極の側から見た図です。火星に最も近づくまではJAXAの計画軌道から計算し、そのあとの3回の噴射（MOI-1〜3）は、JAXAの軌道設計の論文（Ozaki et al. 2018）の方式と数値で計算した目安です。「フォボスのまわり」は、フォボスから見たQSOの大きさと周期を、論文（Pushparaj et al.）の値で描いています。どのQSOにいつ入るかは、まだ公開されていません。
          </figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="why">
        <p className={styles.sectionLabel}>
          04 <span>なぜフォボスなのか</span>
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
          「見た目は捕まった小惑星っぽいのに、軌道は衝突でできたっぽい」という、手がかりどうしが食い違う状態が続いています。2024年には、火星に近づいた小惑星が火星の強い重力で引きちぎられ、その破片の一部が捕まったという新しい説も出されました。
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
          05 <span>5年の旅</span>
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
          探査機は、行きの部分・フォボスで活動する部分・帰りの部分の3つが組み合わさった形をしています。使い終わった部分から切り離していく「三段式」で、打ち上げのときの重さは約4.5トンです。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="highlights">
        <p className={styles.sectionLabel}>
          06 <span>見どころ</span>
        </p>
        <h2 id="highlights">ここに注目</h2>

        <article className={styles.highlight}>
          <span className={styles.highlightNo}>1</span>
          <div>
            <h3>重力が地球の1700分の1の世界を走るローバー</h3>
            <p>
              本体が着陸する前に、ドイツとフランスが作ったローバー「IDEFIX（イデフィックス）」を降ろします。日本のチームは「閃き（ひらめき）」という日本語の愛称もつけています。重さは約25 kgありますが、フォボスの重力は地球の約1700分の1しかないため、地面にかかる重さはわずか15 gほどです。こんなに弱い重力の中を車輪で走るのは、世界で初めてです。
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

        <article className={styles.highlight}>
          <span className={styles.highlightNo}>4</span>
          <div>
            <h3>世界初の「火星のまわりからの持ち帰り」</h3>
            <p>
              火星のまわりから物を持ち帰った探査は、まだありません。中国の「天問3号」も、火星そのものから砂を持ち帰る計画で2031年ごろの帰還をめざしています。MMXは、日本が国際協力のもとで挑む、はやぶさ・はやぶさ2に続く3回目のサンプルリターンです。
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="trivia">
        <p className={styles.sectionLabel}>
          07 <span>小ネタ</span>
        </p>
        <h2 id="trivia">知ると、もっと楽しい</h2>
        <div className={styles.trivia}>
          {TRIVIA.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.callout}>
          <strong>遊んでみよう</strong>
          <p>JAXAの公式オンラインゲームでは、MMXの探査機を組み立てて、ミッションに挑戦できます。無料で、登録もいりません。</p>
          <ExternalLink href={GAME_URL}>MMX公式オンラインゲーム（JAXA）</ExternalLink>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`} aria-labelledby="compare">
        <p className={styles.sectionLabel}>
          08 <span>はやぶさ2とくらべると</span>
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
          09 <span>これからの予定</span>
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
        <p className={styles.note}>2027年以降は現在の計画です。運用の状況によって変わることがあります。</p>
      </section>

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="glossary">
        <p className={styles.sectionLabel}>
          10 <span>ことばの解説</span>
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

      <section className={`${styles.section} ${styles.light}`} aria-labelledby="join">
        <h2 id="join">MMXの旅を、一緒に見守ろう</h2>
        <p className={styles.body}>
          火星に着くまで約10か月、帰ってくるまで約5年。宇宙コミュニティのCosmo Base（コスモベース）では、MMXのニュースや「これってどういうこと？」という疑問を、気軽に話せます。
        </p>
        <a href="/join" className={styles.ctaButton}>
          Cosmo Baseに参加する
        </a>
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
