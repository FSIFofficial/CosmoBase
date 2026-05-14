import { Metadata } from 'next';
import Link from 'next/link';

// ==========================================
// 1. 静的ルートの生成（GitHub Pages対応の要）
// ==========================================
export function generateStaticParams() {
    return [{ type: 'RI' }, { type: 'DI' }, { type: 'RO' }, { type: 'DO' },];
}

// 🔥 これを追加: generateStaticParams で指定した4つ以外のURLは 404 Not Found にする
//export const dynamicParams = false;

// ==========================================
// 共通データ
// ==========================================
const RESULT_DATA: Record<string, any> = {
    RI: {
        title: "🔭 天文台トラベラー",
        icon: "🔭",
        catchcopy: "「宇宙、普通にロマンすぎない？」って思ってる人",
        explanation: "・難しい話はちょっと苦手\n・でも宇宙はめちゃくちゃ気になる\n・気づいたら宇宙の画像見てる",
        howToSpend: "👉 まずは“見るだけ”でOK",
        contents: ["毎日宇宙クイズ", "週刊宇宙ニュース", "Cosmo Baseで宇宙知っトク"],
        shareText: "宇宙、ロマンすぎない？って思ってる【天文台トラベラー】でした🔭 #CosmoBase宇宙タイプ診断",
        img: "RI.png",
        img_share: "RI_share.png",
        img_Xshare: "RI_Xshare.png",
        color: "#cbace4",
    },
    DI: {
        title: "🛰️ 人工衛星",
        icon: "🛰️",
        catchcopy: "「宇宙って色んな楽しみ方あるよね」って人",
        explanation: "・ニュースも気になる\n・雑談も好き\n・とりあえず全部ちょっとずつ見たい",
        howToSpend: "👉 気になるところからつまみ食いでOK",
        contents: ["週刊宇宙ニュース", "Cosmo Baseで宇宙教えて", "Cosmo Base Library"],
        shareText: "いろんな角度から宇宙楽しみたい【人工衛星】タイプでした🛰️ #CosmoBase宇宙タイプ診断",
        img: "DI.png",
        img_share: "DI_share.png",
        img_Xshare: "DI_Xshare.png",
        color: "#85c68b",
    },
    RO: {
        title: "🚀 ロケット打ち上げ",
        icon: "🚀",
        catchcopy: "「それ、実際に行けるの？」ってなる人",
        explanation: "・イベント見つけたら調べてる\n・気づいたら応募ページ見てる\n・とりあえず一歩踏みがち",
        howToSpend: "👉 小さくてもいいから1回動いてみる",
        contents: ["宇宙に行っといで", "Cosmo Base Event Database", "Cosmo Baseで宇宙教えて"],
        shareText: "気づいたら一歩踏み出してる【ロケット打ち上げ】でした🚀 #CosmoBase宇宙タイプ診断",
        img: "RO.png",
        img_share: "RO_share.png",
        img_Xshare: "RO_Xshare.png",
        color: "#EEEEBB",
    },
    DO: {
        title: "🌍 宇宙ステーション",
        icon: "🌍",
        catchcopy: "「それ、どういう仕組み？」ってなる人",
        explanation: "・ちゃんと理解したい\n・人に説明したくなる\n・気づいたら深掘りしてる",
        howToSpend: "👉 知識を“誰かに話す”と一気に楽しくなる",
        contents: ["Space Voyager 検定", "Cosmo Base Library", "宇宙のイベント行ってきた"],
        shareText: "気づいたら詳しくなってる【宇宙ステーション】でした🌍 #CosmoBase宇宙タイプ診断",
        img: "DO.png",
        img_share: "DO_share.png",
        img_Xshare: "DO_Xshare.png",
        color: "#83CBEB",
    }
};

type Props = {
    params: Promise<{ type: 'RI' | 'DI' | 'RO' | 'DO' }>
};

// ==========================================
// 2. OGPメタデータの動的生成（XのBot用）
// ==========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const type = resolvedParams.type.toUpperCase();
    const data = RESULT_DATA[type];

    // 🔥 安全対策：万が一データが存在しないURLが呼ばれたら、空のメタデータを返してエラーを防ぐ
    if (!data) {
        return {
            title: 'Cosmo Base 宇宙タイプ診断',
            description: 'タイプが見つかりません',
        };
    }

    // ⚠️ GitHub Pagesの公開URL（絶対パス）に必ず変更してください
    const siteUrl = 'https://cosmo-base.github.io/opening/';

    const ogImageUrl = `${siteUrl}/${data.img_Xshare}?v=2`;

    return {
        title: `${data.title} | Cosmo Base 宇宙タイプ診断`,
        description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。宇宙診断コンテンツ。',
        openGraph: {
            title: `${data.title} | Cosmo Base 宇宙タイプ診断`,
            description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。',
            url: `${siteUrl}/projects/space-type/result/${type}`,
            siteName: 'Cosmo Base',
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `宇宙タイプ診断結果: ${data.title}`, },],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} | Cosmo Base 宇宙タイプ診断`,
            description: '30秒の診断で、あなたが宇宙で活躍する未来がわかる。',
            images: [ogImageUrl],
        },
    };
}

// ==========================================
// 3. ページUI（シェアリンクから来た人向け）
// ==========================================
export default async function StaticResultPage({ params }: Props) {
    const resolvedParams = await params;
    const type = resolvedParams.type.toUpperCase();

    const data = RESULT_DATA[type];

    if (!data) return <div className="p-10 text-center text-white bg-[#0B0F19] min-h-screen">タイプが見つかりません</div>;

    // 現在のタイプ「以外」の3タイプを抽出
    const otherTypes = Object.keys(RESULT_DATA).filter(key => key !== type);

    return (
        <div className="min-h-screen bg-[#000033] text-white flex flex-col items-center justify-center p-6 font-sans">
            <img src="/opening/CB_type.png" alt="CBtype" className="w-50 pb-6 h-auto object-contain rounded-xl filter" />

            {/* メイン結果カード */}
            <div
                className="text-center mb-10 flex flex-col items-center p-6 rounded-2xl w-full max-w-md shadow-2xl border-4 border-white/20"
                style={{ backgroundColor: data.color }}
            >
                <div className="w-full flex items-center justify-center mb-6">
                    <img src={`/opening/${data.img}`} alt={data.title} className="w-full max-w-[450px] h-auto object-contain rounded-xl filter" />
                </div>

                <p className="font-bold text-sm  tracking-widest mb-2 text-[#000033]/70">この方の宇宙タイプは...</p>
                <h1 className="font-serif text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-[#000033]">{data.title}</h1>
                <div className="mb-6 text-center">
                    <span className="bg-[#000033] text-white px-4 md:px-5 py-2 rounded-full font-bold shadow-md inline-block whitespace-nowrap text-[clamp(12px,4vw,16px)] tracking-tight">
                        {data.catchcopy}
                    </span>
                </div>
            </div>

            {/* 診断誘導CTA */}
            <Link href="/projects/space-type" className="w-full max-w-sm mb-12">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold py-4 rounded-full text-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2">
                    🚀 自分も宇宙タイプを診断してみる
                </button>
            </Link>

            {/* 他のタイプ一覧セクション */}
            <div className="w-full max-w-md pb-10">
                <h2 className="text-lg font-bold text-center mb-6 text-gray-300">
                    他にもこんなタイプが！<br className="md:hidden" />（全4種類）
                </h2>
                <div className="flex flex-col gap-4">
                    {otherTypes.map(typeKey => {
                        const otherData = RESULT_DATA[typeKey];
                        return (
                            <div
                                key={typeKey}
                                className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4 relative overflow-hidden"
                            >
                                {/* アクセントラインにパステルカラーを適用 */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-2"
                                    style={{ backgroundColor: otherData.color }}
                                ></div>

                                <img className="w-25" src={`/opening/${otherData.img}`} />
                                <div>
                                    <h3 className="font-serif font-bold text-md text-[#EEEEFF]">{otherData.title} タイプ</h3>
                                    <p className="text-xs text-gray-400 mt-1">{otherData.catchcopy}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Link href="/projects/space-type" className="block mt-6 text-center">
                    <p className="text-sm text-blue-400 font-bold hover:underline">
                        あなたのタイプを診断する ›
                    </p>
                </Link>
            </div>
        </div>
    );
}
