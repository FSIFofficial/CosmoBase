"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// ニュース記事の型定義
type NewsArticle = {
  id: number
  title: string
  date: string
  category: "お知らせ" | "イベントレポート" | "メンバー紹介" | "コラム" | "パートナー情報"
  excerpt: string
  content: string
  image?: string
  featured?: boolean
}

// サンプルニュースデータ（フルコンテンツ付き）
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Cosmo Base コミュニティ正式オープンのお知らせ",
    date: "2025-01-04",
    category: "お知らせ",
    excerpt:
      "「宇宙を楽しむ」をテーマに、初心者から専門家まで誰もが宇宙に触れられるコミュニティ「Cosmo Base」が正式にオープンしました。",
    content: `
# Cosmo Base コミュニティ正式オープン

2025年1月4日、「宇宙を楽しむ」をテーマとした新しいコミュニティ「Cosmo Base」が正式にオープンしました。

## コミュニティの目的

Cosmo Baseは、宇宙に興味を持つすべての人が気軽に集まり、学び、交流できる場所を目指しています。初心者から専門家まで、学生から社会人、研究者から企業まで、あらゆるバックグラウンドの方々が参加できます。

## 主な活動内容

### 1. 学びの場
- 専門家による講演会やセミナー
- 初心者向けの勉強会
- オンライン天体観測会
- ワークショップやハンズオン

### 2. つながりの場
- Discordコミュニティでの交流
- 質問・相談チャンネル
- 定期的な交流イベント
- 他産業・他分野とのネットワーキング

### 3. 体験の場
- リアル観測会
- ロケット打ち上げ見学ツアー
- 企業訪問・施設見学
- コラボレーションプロジェクト

## 参加方法

参加は無料です。Discordコミュニティに参加するだけで、すぐに活動を始められます。詳しくは「参加方法」ページをご覧ください。

## 今後の展望

Cosmo Baseは、宇宙をより身近な選択肢にすることを目指しています。単発のイベントではなく、継続的なつながりを大切にし、宇宙を日常にする場所を提供していきます。

皆さまのご参加をお待ちしております！
    `,
    image: "/space-community-launch.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "【イベントレポート】冬の星座観測会 - 50名が参加",
    date: "2025-01-03",
    category: "イベントレポート",
    excerpt: "12月23日に多摩地域で開催した冬の星座観測会のレポートです。初心者から経験者まで50名が参加しました。",
    content: `
# 冬の星座観測会 イベントレポート

2024年12月23日、多摩地域にて「冬の星座観測会」を開催しました。当日は天候にも恵まれ、初心者から経験者まで50名もの方々にご参加いただきました。

## イベント概要

- **日時**: 2024年12月23日 18:00 - 21:00
- **場所**: 多摩地域（光害の少ない観測スポット）
- **参加者**: 50名（初心者30名、経験者20名）
- **観測対象**: オリオン座、プレアデス星団、オリオン大星雲など

## 当日の様子

### 18:00 - 受付・開会式
参加者全員が集合し、簡単な自己紹介タイム。「星空を見るのは初めて」という方から、「自分の望遠鏡を持参しました」という方まで、様々なバックグラウンドの参加者が集まりました。

### 18:30 - 星空レクチャー
天体物理学者の山田先生による、冬の星座についてのレクチャー。オリオン座の神話から、ベテルギウスやリゲルなどの一等星の特徴まで、わかりやすく解説していただきました。

### 19:00 - 観測開始
いよいよ望遠鏡を使った観測がスタート。大型望遠鏡3台、中型望遠鏡5台を用意し、順番に覗いていきました。

### 主な観測対象

**オリオン大星雲（M42）**
今回のメインターゲット。望遠鏡で見ると、淡い緑色の雲のような姿が美しく、多くの参加者から歓声が上がりました。

**プレアデス星団（すばる）**
肉眼でも見える星団ですが、望遠鏡で見るとその星の数に驚きの声が。青白く輝く若い星々の集まりです。

**木星と土星**
惑星観測も人気。特に土星の環を見たときの参加者の感動は忘れられません。「本当に環があるんだ！」という驚きの声が印象的でした。

## 参加者の声

> 「初めて望遠鏡で星を見ましたが、こんなに美しいとは思いませんでした。星雲の淡い光に感動しました」（20代・会社員）

> 「自分の望遠鏡を持っているものの、使い方がよくわからなかったのですが、今回のイベントで詳しく教えてもらえて助かりました」（30代・エンジニア）

> 「子どもと一緒に参加しましたが、スタッフの方々が丁寧に説明してくださり、とても楽しめました」（40代・保護者）

## 天体写真撮影講座も

後半は、スマートフォンや一眼レフカメラでの天体写真撮影ミニ講座も開催。実際に撮影した写真をその場でシェアし合い、盛り上がりました。

## 次回予告

次回の観測会は2月下旬に、春の銀河を観測する予定です。M87銀河をはじめ、おとめ座銀河団の数多くの銀河を観測します。詳細は後日お知らせしますので、ぜひご参加ください！

今回ご参加いただいた皆様、ありがとうございました。また一緒に星空を見上げましょう！
    `,
    image: "/stargazing-winter-constellation.jpg",
  },
  {
    id: 3,
    title: "新パートナー団体のご紹介 - 宇宙教育NPO「スターキッズ」",
    date: "2025-01-02",
    category: "パートナー情報",
    excerpt: "子どもたちへの宇宙教育に力を入れる NPO法人「スターキッズ」がCosmo Baseのパートナーに加わりました。",
    content: `
# 新パートナー団体のご紹介

Cosmo Baseに新しいパートナー団体が加わりました。子どもたちへの宇宙教育に情熱を注ぐNPO法人「スターキッズ」をご紹介します。

## スターキッズについて

NPO法人スターキッズは、2018年に設立された宇宙教育を専門とする非営利団体です。「すべての子どもたちに宇宙の夢を」をモットーに、全国各地で活動を展開しています。

### 主な活動内容

- **子ども向け天体観測会**: 月に1回、各地で開催
- **宇宙工作教室**: ペットボトルロケット、星座早見盤作りなど
- **出張授業**: 小中学校での宇宙教育プログラム
- **夏休み特別企画**: 天文台見学ツアー、サマーキャンプ

## 代表・鈴木様からのメッセージ

> 「子どもの頃に見た満天の星空が、私を天文学の道へと導きました。同じように、宇宙に触れることで未来の可能性を広げる子どもたちが増えればと思い、この活動を続けています。Cosmo Baseとのパートナーシップにより、より多くの子どもたちに宇宙の素晴らしさを届けられることを楽しみにしています」

## 今後の共同企画

Cosmo Baseとスターキッズは、以下のような共同企画を予定しています。

### 2月開催予定
**親子で楽しむ宇宙工作教室**
- 日時: 2026年2月22日（日）13:00-16:00
- 対象: 小学生とその保護者
- 内容: ペットボトルロケット製作と打ち上げ体験

### 3月開催予定
**春休み特別企画 - 天文台見学ツアー**
- 日時: 2026年3月下旬（日程調整中）
- 対象: 小中学生とその保護者
- 内容: プロの天文台を見学し、大型望遠鏡で昼間の天体観測

## 教育現場との連携も

スターキッズは学校教育との連携も積極的に進めており、Cosmo Baseのメンバーである宇宙関連企業や研究者の方々とのコラボレーションも計画中です。

「本物の宇宙開発に携わる方々の話を聞ける機会は、子どもたちにとってかけがえのない体験になります」と鈴木代表は語ります。

## 参加方法

スターキッズ主催・共催のイベントは、Cosmo Baseのイベントカレンダーでもお知らせします。コミュニティメンバーは優先的にご案内いたしますので、ぜひDiscordコミュニティにご参加ください。

次世代を担う子どもたちに、宇宙の魅力を伝える活動を、ぜひ一緒に応援しましょう！
    `,
  },
  {
    id: 4,
    title: "【メンバー紹介】天体物理学者・山田太郎さん「宇宙の謎を一緒に解き明かしましょう」",
    date: "2024-12-28",
    category: "メンバー紹介",
    excerpt:
      "Cosmo Baseのコアメンバーである天体物理学者・山田太郎さんにインタビュー。専門的な知識がなくても、疑問に思ったことを気軽に質問してほしいと語ります。",
    content: `
# メンバー紹介: 山田太郎さん

Cosmo Baseのコアメンバーである天体物理学者・山田太郎さんにインタビュー。研究の最前線にいながら、一般向けの宇宙普及活動にも熱心に取り組む山田さんの想いを伺いました。

## プロフィール

- **名前**: 山田太郎（やまだ たろう）
- **所属**: 国立天文台 理論研究部
- **専門**: ブラックホール物理学、高エネルギー天体物理学
- **学位**: 博士（理学）
- **趣味**: アマチュア天体観測、SF小説、登山

## 宇宙に魅せられたきっかけ

**Q: 宇宙に興味を持ったきっかけは？**

小学生の頃、父親に連れられて行った天文台で初めて土星を見たことがきっかけです。望遠鏡越しに見た土星の環の美しさに圧倒され、「この宇宙にはまだ知らないことがたくさんあるんだ」と感動しました。それから天文学の本を読み漁り、中学生の時には自分で望遠鏡を買ってもらって観測を始めました。

## ブラックホール研究の魅力

**Q: 現在の研究内容について教えてください**

私の専門はブラックホール物理学です。特に、ブラックホール周辺で起こる高エネルギー現象や、ブラックホール同士の合体に伴う重力波の研究をしています。

ブラックホールは「謎だらけ」なんです。何でも吸い込んでしまう天体として有名ですが、実は周囲に強力なジェットを放出したり、時空を歪めたりと、非常にダイナミックな現象を引き起こします。

2019年に史上初めてブラックホールの撮影に成功したことは記憶に新しいですが、まだまだわからないことだらけ。それがブラックホール研究の面白さでもあります。

## Cosmo Baseへの想い

**Q: Cosmo Baseに参加したきっかけは？**

研究だけでなく、一般の方々にも宇宙の面白さを伝えたいという想いがありました。学会発表や論文執筆も大切ですが、「宇宙って面白い！」と感じてもらえる人が増えることで、未来の研究者が育ったり、宇宙開発への理解が深まったりすると信じています。

Cosmo Baseは、そんな想いを持った人たちが集まっているコミュニティ。ここなら、専門家と一般の方が気軽に交流できると思い、参加を決めました。

**Q: どんな活動をしていく予定ですか？**

Discordコミュニティ内に「宇宙の不思議Q&A」というチャンネルを担当する予定です。どんな質問でも大歓迎！「ブラックホールに落ちたらどうなる？」「宇宙の果てには何がある？」といった素朴な疑問から、専門的な質問まで、できる限り丁寧にお答えします。

また、月に1回程度、オンライン講演会も開催予定です。最新の天文学研究成果をわかりやすく解説していきたいと思っています。

## 初心者の方へのメッセージ

**Q: 宇宙に興味はあるけど、知識がない...という方へ**

全然問題ありません！むしろ、知識がないからこそ持てる「素朴な疑問」が、時として研究の新しい視点につながることもあるんです。

「こんなこと聞いたら恥ずかしいかな」なんて思わずに、どんどん質問してください。私たち専門家は、皆さんの「なぜ？」を待っています。

宇宙は誰のものでもありません。興味を持ったその瞬間から、あなたも宇宙を探求する仲間です。Cosmo Baseで、一緒に宇宙の謎を解き明かしていきましょう！

## 最近のマイブーム

**Q: 最近ハマっていることは？**

実は最近、登山にハマっています。都会の光害から離れて、山頂で見る星空は格別です。先月も八ヶ岳に登って、天の川を撮影してきました。

あと、SF小説も好きで、最近は劉慈欣の『三体』シリーズを読み返しています。科学的にも考察されているSF作品は、研究のインスピレーションにもなるんですよ。

---

山田さんは毎週水曜日の夜、Discordコミュニティに登場予定です。ぜひ気軽に質問してみてくださいね！
    `,
    image: "/astronomer-portrait.jpg",
  },
  {
    id: 5,
    title: "【コラム】2025年注目の宇宙イベント - 皆既月食から火星探査まで",
    date: "2024-12-25",
    category: "コラム",
    excerpt: "2025年は宇宙ファンにとって見逃せないイベントが目白押し！主要な天文現象と宇宙開発トピックをまとめました。",
    content: `
# 2025年注目の宇宙イベント

2025年は宇宙ファンにとって見逃せないイベントが満載の年になりそうです。天文現象から宇宙開発まで、注目トピックをカレンダー形式でまとめました。

## 天文現象編

### 3月14日 - 皆既月食
今年最大の天文イベントの一つ。日本全国で観測可能な皆既月食です。月が地球の影に完全に隠れ、赤銅色に染まる神秘的な現象を楽しめます。

**観測のポイント:**
- 時間帯: 20:30頃から23:00頃（地域により若干異なる）
- 天候次第で肉眼でも十分観測可能
- 双眼鏡や望遠鏡があれば、さらに詳細に観察できます

Cosmo Baseでは、オンライン同時観測会を企画予定です！

### 8月12-13日 - ペルセウス座流星群
三大流星群の一つ。今年は月明かりの影響が少なく、好条件での観測が期待できます。

**予想観測数:**
- ピーク時: 1時間あたり50-60個
- 観測しやすい時間: 22:00以降
- 放射点: ペルセウス座（北東の空）

都会でも運が良ければ観測可能。Cosmo Baseでは、光害の少ない場所での観測会も企画します。

### 10月2日 - 金環日食（一部地域で観測可能）
残念ながら日本では観測できませんが、南米では金環日食が観測できます。オンラインライブ中継を予定している天文台も多いので、チェックしてみてください。

### 12月14-15日 - ふたご座流星群
年間最大の流星群。今年は新月に近く、絶好の観測条件です。

## 宇宙開発編

### アルテミス計画の進展
NASAのアルテミス計画が本格始動。2025年は有人月面着陸に向けた重要な試験飛行が予定されています。

**注目ポイント:**
- アルテミスII有人試験飛行（予定）
- 月軌道プラットフォーム「ゲートウェイ」の建設開始
- 月面着陸船の最終テスト

### 火星探査の新展開
複数の国・機関による火星探査ミッションが進行中。

**主なミッション:**
- NASAパーサヴィアランス: サンプル採取継続
- 中国天問2号: サンプルリターンミッション
- ESA ExoMars: 生命の痕跡探査

### 民間宇宙開発
SpaceXの Starship打ち上げ試験や、Blue Originの宇宙旅行商業化など、民間宇宙開発も目が離せません。

### 日本の宇宙開発
- JAXA 月面探査機「SLIM」後継機の開発状況
- H3ロケットの定期打ち上げ開始
- 有人宇宙船開発プロジェクトの進展

## Cosmo Baseでの企画

これらのイベントに合わせて、Cosmo Baseでは以下の企画を予定しています：

1. **天文現象オンライン同時観測会**
   - リアルタイムで一緒に観測
   - 専門家による解説付き
   - チャットで感想をシェア

2. **解説セミナー**
   - 各イベントの科学的背景を解説
   - Q&Aセッション

3. **リアル観測会**
   - 流星群、月食など
   - 望遠鏡の使い方講座も

4. **宇宙開発ウォッチング**
   - 打ち上げライブ視聴会
   - ミッション解説イベント

## カレンダーに登録しよう

見逃さないように、今のうちにカレンダーに登録しておきましょう！Cosmo BaseのDiscordコミュニティでは、各イベントの1週間前と前日にリマインド通知も行います。

2025年、宇宙を一緒に楽しみましょう！
    `,
  },
]

export default function NewsArticlePage() {
  const params = useParams()
  const articleId = Number.parseInt(params.id as string)
  const article = newsArticles.find((a) => a.id === articleId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!article) {
    return (
      <div className="min-h-screen bg-[#000033]">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-[#EEEEFF] mb-4">記事が見つかりません</h1>
            <Link href="/news">
              <Button className="bg-[#83CBEB] hover:bg-[#83CBEB]/80 text-[#000033]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ニュース一覧に戻る
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#000033]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 戻るボタン */}
          <Link href="/news" className="inline-flex items-center text-[#83CBEB] hover:text-[#83CBEB]/80 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ニュース一覧に戻る
          </Link>

          {/* 記事ヘッダー */}
          <div className="mb-8">
            <Badge className="bg-[#83CBEB]/30 text-[#EEEEFF] mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-serif text-[#EEEEFF] mb-4 text-balance">{article.title}</h1>
            <div className="flex items-center gap-2 text-[#EEEEFF]/60">
              <Calendar className="h-4 w-4" />
              <span className="font-sans text-sm">{article.date}</span>
            </div>
          </div>

          {/* アイキャッチ画像 */}
          {article.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* 記事本文 */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-[#EEEEFF]/90 font-sans leading-relaxed whitespace-pre-wrap"
              style={{ lineHeight: "1.8" }}
            >
              {article.content}
            </div>
          </div>

          {/* 記事下部のCTA */}
          <div className="mt-12 pt-8 border-t border-[#83CBEB]/20">
            <div className="bg-gradient-to-br from-[#83CBEB]/10 to-[#EEEEBB]/5 border border-[#83CBEB]/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-serif text-[#EEEEFF] mb-4">Cosmo Baseコミュニティに参加しませんか？</h3>
              <p className="text-[#EEEEFF]/70 font-sans mb-6 leading-relaxed">
                最新の宇宙ニュースやイベント情報をいち早くお届けします
              </p>
              <a href="https://discord.gg/TEnAD8Db8g" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#83CBEB] text-[#000033] hover:bg-[#83CBEB]/90 text-lg px-8 py-6 font-sans font-medium">
                  Discordコミュニティに参加する
                </Button>
              </a>
            </div>
          </div>

          {/* 関連記事 */}
          <div className="mt-12">
            <h3 className="text-2xl font-serif text-[#EEEEFF] mb-6">関連記事</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {newsArticles
                .filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.id}`}
                    className="block bg-[#000033] border border-[#83CBEB]/30 rounded-lg overflow-hidden hover:border-[#83CBEB] transition-colors group"
                  >
                    {relatedArticle.image && (
                      <Image
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <Badge className="bg-[#83CBEB]/30 text-[#EEEEFF] mb-2 text-xs">{relatedArticle.category}</Badge>
                      <h4 className="text-lg font-serif text-[#EEEEFF] mb-2 group-hover:text-[#83CBEB] transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[#EEEEFF]/60 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span className="font-sans">{relatedArticle.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
