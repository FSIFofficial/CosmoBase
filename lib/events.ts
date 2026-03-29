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
        i++; // ""（エスケープされたダブルクォーテーション）を1つに変換
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
      if (char === '\r') i++; // \r\n の場合はスキップ
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
  // ▼▼▼ ステップ1でコピーしたCSVのURLをここに貼り付けます ▼▼▼
  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJU_Qq6TICMIAhDidiH2BYlBcZBvS_Uwy4wth9tT-02RYWkVP_AufdGo0PMAbAyrHKeZrE1x0laETY/pub?gid=0&single=true&output=csv"

  try {
    // next: { revalidate: 60 } で、スプシの更新が最短60秒でサイトに自動反映されます
    const res = await fetch(GOOGLE_SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("CSVの取得に失敗しました");
    
    const csvText = await res.text();
    const rows = parseCSV(csvText);
    
    const events: Event[] = [];
    // 1行目はヘッダーなので、2行目（i=1）からループ処理
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      // id（1列目）が空の行や、データが足りない行はスキップ
      if (values.length < 10 || !values[0]) continue; 

      events.push({
        id: values[0],
        title: values[1],
        date: new Date(values[2]),
        endDate: values[3] ? new Date(values[3]) : null,
        time: values[4],
        location: values[5],
        latlng: values[6] || "",
        type: values[7],
        difficulty: values[8],
        capacity: Number(values[9]) || 0,
        description: values[10] || "",
        speaker: values[11] || "",
        organizer: values[12] || "",
        link: values[13] || ""
      });
    }
    return events;
  } catch (error) {
    console.error("イベントデータの取得エラー:", error);
    return [];
  }
}
