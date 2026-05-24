// src/lib/launches.ts
import { parse } from 'csv-parse/sync';

export type LaunchEvent = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  rocket: string;
  description: string;
  isLaunch: boolean; // カレンダーでの判定用フラグ
};

export async function getLaunches(): Promise<LaunchEvent[]> {
  // ▼ ここにスプレッドシートの「ウェブに公開(CSV)」のURLを入れます
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTJU_Qq6TICMIAhDidiH2BYlBcZBvS_Uwy4wth9tT-02RYWkVP_AufdGo0PMAbAyrHKeZrE1x0laETY/pub?gid=541859876&single=true&output=csv';
  
  try {
    // Next.jsのfetchでCSVを取得 (キャッシュ設定は用途に合わせて変更してください)
    const res = await fetch(CSV_URL, { 
      next: { revalidate: 3600 } // 1時間に1回データを最新化
    });
    
    if (!res.ok) {
      console.error('ロケット打ち上げCSVの取得に失敗しました');
      return [];
    }

    const fileContent = await res.text();
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    return records.map((record: any, index: number) => ({
      id: `launch-${index}`,
      title: record.title || '',
      date: new Date(record.date),
      time: record.time || '',
      location: record.location || '',
      rocket: record.rocket || '',
      description: record.description || '',
      isLaunch: true, 
    }));
  } catch (error) {
    console.error('CSVパースエラー:', error);
    return [];
  }
}
