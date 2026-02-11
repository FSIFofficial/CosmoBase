import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 型定義をここに移動
export type NewsArticle = {
  id: number;
  title: string;
  date: string;
  category: "お知らせ" | "イベントレポート" | "メンバー紹介" | "コラム" | "パートナー情報";
  excerpt: string;
  content: string;
  image?: string;
  featured?: boolean;
};

export const getNewsArticles = (): NewsArticle[] => {
  // CSVファイルのパスを指定
  const filePath = path.join(process.cwd(), 'data/news.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // CSVをパース
  const records = parse(fileContent, {
    columns: true, // 1行目をヘッダーとして扱う
    skip_empty_lines: true,
  });

  // 文字列として読み込まれるため、型変換を行う
  return records.map((record: any) => ({
    ...record,
    id: Number(record.id),
    featured: record.featured === 'true' || record.featured === 'TRUE',
    // 画像がない空文字の場合は undefined にする
    image: record.image === '' ? undefined : record.image,
  }));
};

export const getNewsArticleById = (id: number): NewsArticle | undefined => {
  const articles = getNewsArticles();
  return articles.find((article) => article.id === id);
};