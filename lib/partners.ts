export type PartnerType = "company" | "organization";

export interface Partner {
  id: string;
  name: string;
  furigana?: string; // ◀︎ 追加: ふりがな
  type: PartnerType;
  logo: string;
  description: string;
  detailedDescription: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  note?: string; // ◀︎ 追加: note
  otherLink1?: string; // ◀︎ 追加: そのほかリンク1
  otherLink2?: string; // ◀︎ 追加: そのほかリンク2
  otherLink3?: string; // ◀︎ 追加: そのほかリンク3
  email?: string;
  category: string;
  established?: string;
  activities: string;  
  achievements: string; 
  newsLink?: string;
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

export async function getPartners(): Promise<Partner[]> {
  const PARTNER_SPREADSHEET_BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqA4JrKGZvzaQCYQRVA_nrN_45CwpnuRyJp2PU8dtgs5qDqEbThvfDVkK_fKgFtLPDp0wwDW9BXTPL/pub?gid=522161586&single=true&output=csv";
  const BUILD_TIMESTAMP = Date.now();
  const GOOGLE_SHEET_CSV_URL = `${PARTNER_SPREADSHEET_BASE_URL}&_t=${BUILD_TIMESTAMP}`;
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("CSVの取得に失敗しました");
    
    const csvText = await res.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());
    
    // 英語のキー名と、Googleフォームそのままの日本語キー名の両方で探せるように拡張
    const getIdx = (key: string, jpKey?: string) => {
      let idx = headers.indexOf(key.toLowerCase());
      if (idx === -1 && jpKey) {
        idx = headers.indexOf(jpKey.toLowerCase());
      }
      return idx;
    };

    const idxId = getIdx("id");
    const idxName = getIdx("name", "企業・団体名");
    const idxFurigana = getIdx("furigana", "ふりがな"); // ◀︎ 追加
    const idxType = getIdx("type", "パートナー種別");
    const idxLogo = getIdx("logo", "ロゴ画像url");
    const idxDescription = getIdx("description", "団体紹介（50文字）");
    const idxDetailedDescription = getIdx("detaileddescription", "団体紹介（250文字）");
    const idxWebsite = getIdx("website", "snsリンク(hp)");
    const idxTwitter = getIdx("twitter", "snsリンク(x)");
    const idxFacebook = getIdx("facebook", "snsリンク(facebook)");
    const idxInstagram = getIdx("instagram", "snsリンク(instagram)");
    const idxNote = getIdx("note", "snsリンク(note)"); // ◀︎ 追加
    const idxOtherLink1 = getIdx("otherlink1", "snsリンク(そのほか①)"); // ◀︎ 追加
    const idxOtherLink2 = getIdx("otherlink2", "snsリンク(そのほか②)"); // ◀︎ 追加
    const idxOtherLink3 = getIdx("otherlink3", "snsリンク(そのほか③)"); // ◀︎ 追加
    const idxEmail = getIdx("email", "メールアドレス");
    const idxCategory = getIdx("category");
    const idxEstablished = getIdx("established");
    const idxActivities = getIdx("activities", "活動・事業内容");
    const idxAchievements = getIdx("achievements", "主な実績");
    const idxNewsLink = getIdx("newslink"); 

    const partners: Partner[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (idxId === -1 || !values[idxId]) continue;

      const safeGet = (idx: number) => (idx !== -1 && values[idx] !== undefined) ? values[idx] : "";

      partners.push({
        id: safeGet(idxId),
        name: safeGet(idxName),
        furigana: safeGet(idxFurigana) || undefined, // ◀︎ 追加
        type: (safeGet(idxType).includes("企業") || safeGet(idxType) === "company" ? "company" : "organization") as PartnerType,
        logo: safeGet(idxLogo),
        description: safeGet(idxDescription),
        detailedDescription: safeGet(idxDetailedDescription),
        website: safeGet(idxWebsite) || undefined,
        twitter: safeGet(idxTwitter) || undefined,
        facebook: safeGet(idxFacebook) || undefined,
        instagram: safeGet(idxInstagram) || undefined,
        note: safeGet(idxNote) || undefined, // ◀︎ 追加
        otherLink1: safeGet(idxOtherLink1) || undefined, // ◀︎ 追加
        otherLink2: safeGet(idxOtherLink2) || undefined, // ◀︎ 追加
        otherLink3: safeGet(idxOtherLink3) || undefined, // ◀︎ 追加
        email: safeGet(idxEmail) || undefined,
        category: safeGet(idxCategory),
        established: safeGet(idxEstablished),
        activities: safeGet(idxActivities),
        achievements: safeGet(idxAchievements),
        newsLink: safeGet(idxNewsLink) || undefined
      });
    }
    return partners;
  } catch (error) {
    console.error("パートナーデータの取得エラー:", error);
    return [];
  }
}

export async function getPartnerById(id: string): Promise<Partner | undefined> {
  const partners = await getPartners();
  return partners.find((p) => p.id === id);
}
