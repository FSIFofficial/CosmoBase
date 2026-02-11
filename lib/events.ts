import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export type EventType = "講演会" | "ワークショップ" | "観測会" | "交流会" | "オンライン";
export type DifficultyLevel = "初心者向け" | "中級者向け" | "上級者向け" | "全レベル";

export type Event = {
  id: number;
  title: string;
  date: Date; // Dateオブジェクトとして扱う
  time: string;
  location: string;
  type: EventType;
  difficulty: DifficultyLevel;
  capacity: number;
  description: string;
  speaker?: string;
  organizer?: string;
};

export const getEvents = (): Event[] => {
  const filePath = path.join(process.cwd(), 'data/events.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((record: any) => ({
    ...record,
    id: Number(record.id),
    capacity: Number(record.capacity),
    // 日付文字列をDateオブジェクトに変換 (例: "2026-01-15" -> Date obj)
    date: new Date(record.date),
    speaker: record.speaker || undefined,
    organizer: record.organizer || undefined,
  }));
};