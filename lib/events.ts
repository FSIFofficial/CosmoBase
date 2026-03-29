export interface Event {
  id: string;
  title: string;
  date: Date;
  endDate?: Date | null;
  time: string;
  location: string;
  latlng?: string;
  type: string;
  difficulty: string;
  capacity: number;
  description: string;
  speaker?: string;
  organizer?: string;
  link?: string;
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

export async function getEvents(): Promise<Event[]> {
  // ▼▼▼ あなたのCSVのURLをここに貼り付けてください ▼▼▼
  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJU_Qq6TICMIAhDidiH2BYlBcZBvS_Uwy4wth9tT-02RYWkVP_AufdGo0PMAbAyrHKeZrE1x0laETY/pub?gid=0&single=true&output=csv";

  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("CSVの取得に失敗しました");
    
    const csvText = await res.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return [];

    // 🌟 魔法のコード：1行目のヘッダー名から、それぞれの列が「何番目」にあるかを自動判定！
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const getIdx = (key: string) => headers.indexOf(key.toLowerCase());

    const idxId = getIdx("id");
    const idxTitle = getIdx("title");
    const idxDate = getIdx("date");
    const idxEndDate = getIdx("endDate");
    const idxTime = getIdx("time");
    const idxLocation = getIdx("location");
    const idxLatlng = getIdx("latlng");
    const idxType = getIdx("type");
    const idxDifficulty = getIdx("difficulty");
    const idxCapacity = getIdx("capacity");
    const idxDescription = getIdx("description");
    const idxSpeaker = getIdx("speaker");
    const idxOrganizer = getIdx("organizer");
    const idxLink = getIdx("link");

    const events: Event[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      // IDがない行（空行など）はスキップ
      if (idxId === -1 || !values[idxId]) continue;

      // 欠損データがあってもエラーで落ちないようにする安全装置
      const safeGet = (idx: number) => (idx !== -1 && values[idx] !== undefined) ? values[idx] : "";

      events.push({
        id: safeGet(idxId),
        title: safeGet(idxTitle),
        date: safeGet(idxDate) ? new Date(safeGet(idxDate)) : new Date(),
        endDate: safeGet(idxEndDate) ? new Date(safeGet(idxEndDate)) : null,
        time: safeGet(idxTime),
        location: safeGet(idxLocation),
        latlng: safeGet(idxLatlng),
        type: safeGet(idxType),
        difficulty: safeGet(idxDifficulty),
        capacity: Number(safeGet(idxCapacity)) || 0,
        description: safeGet(idxDescription),
        speaker: safeGet(idxSpeaker),
        organizer: safeGet(idxOrganizer),
        link: safeGet(idxLink)
      });
    }
    return events;
  } catch (error) {
    console.error("イベントデータの取得エラー:", error);
    return [];
  }
}
