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
  facebook?: string;
  instagram?: string;
  email?: string;
  category: string;
  established?: string;
  activities: string;  
  achievements: string; 
}

// 説明文などに含まれる「改行」や「カンマ」を安全に処理するCSVパーサー
function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++; // エスケープされたダブルクォーテーション
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      row.push(cell);
      result.push(row);
      row = [];
      cell = '';
      if (char === '\r') i++;
    } else {
      cell += char;
    }
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    result.push(row);
  }
  return result;
}

// ▼ async関数に変更
export async function getPartners(): Promise<Partner[]> {
  // ▼▼▼ パートナー用スプレッドシートのCSV公開URL ▼▼▼
  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqA4JrKGZvzaQCYQRVA_nrN_45CwpnuRyJp2PU8dtgs5qDqEbThvfDVkK_fKgFtLPDp0wwDW9BXTPL/pub?gid=522161586&single=true&output=csv";

  try {
    // キャッシュを60秒に設定
    const res = await fetch(GOOGLE_SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("CSVの取得に失敗しました");
    
    const csvText = await res.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const getIdx = (key: string) => headers.indexOf(key.toLowerCase());

    const idxId = getIdx("id");
    const idxName = getIdx("name");
    const idxType = getIdx("type");
    const idxLogo = getIdx("logo");
    const idxDescription = getIdx("description");
    const idxDetailedDescription = getIdx("detaileddescription");
    const idxWebsite = getIdx("website");
    const idxTwitter = getIdx("twitter");
    const idxFacebook = getIdx("facebook");
    const idxInstagram = getIdx("instagram");
    const idxEmail = getIdx("email");
    const idxCategory = getIdx("category");
    const idxEstablished = getIdx("established");
    const idxActivities = getIdx("activities");
    const idxAchievements = getIdx("achievements");

    const partners: Partner[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (idxId === -1 || !values[idxId]) continue; // IDがない行はスキップ

      const safeGet = (idx: number) => (idx !== -1 && values[idx] !== undefined) ? values[idx] : "";

      partners.push({
        id: safeGet(idxId),
        name: safeGet(idxName),
        type: (safeGet(idxType) === "company" ? "company" : "organization") as PartnerType,
        logo: safeGet(idxLogo),
        description: safeGet(idxDescription),
        detailedDescription: safeGet(idxDetailedDescription),
        website: safeGet(idxWebsite) || undefined,
        twitter: safeGet(idxTwitter) || undefined,
        facebook: safeGet(idxFacebook) || undefined,
        instagram: safeGet(idxInstagram) || undefined,
        email: safeGet(idxEmail) || undefined,
        category: safeGet(idxCategory),
        established: safeGet(idxEstablished),
        activities: safeGet(idxActivities),
        achievements: safeGet(idxAchievements)
      });
    }
    return partners;
  } catch (error) {
    console.error("パートナーデータの取得エラー:", error);
    return [];
  }
}

// ▼ 非同期データ取得に合わせて async関数 に変更
export async function getPartnerById(id: string): Promise<Partner | undefined> {
  const partners = await getPartners();
  return partners.find((p) => p.id === id);
}
