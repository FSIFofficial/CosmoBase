import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export type PartnerType = "company" | "organization";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  logo: string;
  description: string;
  detailedDescription: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  category: string;
  established: string;
  activities: string[];
  achievements: string[];
}

export const getPartners = (): Partner[] => {
  const filePath = path.join(process.cwd(), 'data/partners.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // CSVから読み込んだデータを型に合わせて整形
  return records.map((record: any) => ({
    ...record,
    // "item1|item2" という文字列を ["item1", "item2"] に変換
    activities: record.activities ? record.activities.split('|') : [],
    achievements: record.achievements ? record.achievements.split('|') : [],
    // 空文字の場合は undefined にする
    website: record.website || undefined,
    twitter: record.twitter || undefined,
    linkedin: record.linkedin || undefined,
    facebook: record.facebook || undefined,
    instagram: record.instagram || undefined,
    email: record.email || undefined,
  }));
};

export const getPartnerById = (id: string): Partner | undefined => {
  const partners = getPartners();
  return partners.find((p) => p.id === id);
};