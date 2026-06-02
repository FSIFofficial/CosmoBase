import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  category: "お知らせ" | "イベントレポート" | "メンバー紹介" | "コラム" | "パートナー情報" | string;
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

  return records.map((record: any) => ({
    ...record,
    id: record.id, // ★ Number() での変換を削除し、文字列のまま保持
    featured: record.featured === 'true' || record.featured === 'TRUE',
    // 画像がない空文字の場合は undefined にする
    image: record.image === '' ? undefined : record.image,
  }));
};

// ★ 引数 id を string 型に変更
export const getNewsArticleById = (id: string): NewsArticle | undefined => {
  const articles = getNewsArticles();
  return articles.find((article) => article.id === id); // 文字列同士で比較
};
