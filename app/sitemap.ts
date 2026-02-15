export const dynamic = 'force-static'

import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// ▼ CSVを読み込んでIDの配列（['1', '2', '3']）を返す便利関数
async function getIdsFromCsv(fileName: string): Promise<string[]> {
  // プロジェクトのルートディレクトリにある 'data' フォルダを探す設定
  const filePath = path.join(process.cwd(), 'data', fileName)
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const rows = fileContent.split('\n') // 行ごとに分割

    // 1行目（ヘッダー）を除外して、各行からIDを取り出す
    // ※CSVが「id, title...」という形式だと仮定して、カンマ(,)で区切った最初の要素を取得
    return rows
      .slice(1) // 1行目（ヘッダー）を捨てる
      .map(row => row.split(',')[0].trim()) // カンマ区切りの1つ目(ID)を取る
      .filter(id => id.length > 0) // 空行があれば除外
  } catch (e) {
    console.error(`CSV読み込みエラー: ${fileName}`, e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fsifofficial.github.io/CosmoBase'

  // ▼ 1. 固定ページのリスト
  const staticRoutes = [
    '',
    '/events',
    '/faq',
    '/join',
    '/manual',
    '/news',
    '/partner',
    '/partners',
    '/resources',
    '/resources/event',
    '/resources/events',
    '/resources/news',
    '/resources/technology',
    '/resources/ventures',
    '/value',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // ▼ 2. CSVからIDを取得（非同期処理）
  // ここで2種類のCSVを読み込みます
  const newsIds = await getIdsFromCsv('news.csv')      // 例: ニュース用
  const partnerIds = await getIdsFromCsv('partners.csv') // 例: パートナー用

  // ▼ 3. ニュース記事ページのURL生成
  const newsRoutes = newsIds.map((id) => ({
    url: `${baseUrl}/news/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // ▼ 4. パートナー詳細ページのURL生成
  const partnerRoutes = partnerIds.map((id) => ({
    url: `${baseUrl}/partners/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // ▼ 5. 全て合体させて返す
  return [...staticRoutes, ...newsRoutes, ...partnerRoutes]
}
