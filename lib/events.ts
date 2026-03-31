export interface Event {
  id: string;
  title: string;
  date: Date;
  endDate?: Date | null;
  time: string;
  location: string;
  lat?: string;
  lng?: string;
  type: string;
  difficulty: string;
  capacity: number;
  description: string;
  speaker?: string;
  organizer?: string;
  link?: string;
}

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
        i++;
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

function createSafeDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split(/[-/]/);
  if (parts.length >= 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T12:00:00+09:00`);
  }
  return new Date(dateStr);
}

export async function getEvents(): Promise<Event[]> {
  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJU_Qq6TICMIAhDidiH2BYlBcZBvS_Uwy4wth9tT-02RYWkVP_AufdGo0PMAbAyrHKeZrE1x0laETY/pub?gid=0&single=true&output=csv";

  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("CSVの取得に失敗しました");
    
    const csvText = await res.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const getIdx = (key: string) => headers.indexOf(key.toLowerCase());

    const idxId = getIdx("id");
    const idxTitle = getIdx("title");
    const idxDate = getIdx("date");
    const idxEndDate = getIdx("enddate");
    const idxTime = getIdx("time");
    const idxLocation = getIdx("location");
    // lat と lng に分かれました
    const idxLat = getIdx("lat");
    const idxLng = getIdx("lng");
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
      const safeGet = (idx: number) => (idx !== -1 && values[idx] !== undefined) ? values[idx] : "";

      const id = safeGet(idxId);
      const title = safeGet(idxTitle);
      const dateStr = safeGet(idxDate);

      if (!id || !title || !dateStr) continue;

      const parsedDate = createSafeDate(dateStr);
      if (!parsedDate || isNaN(parsedDate.getTime())) continue;

      events.push({
        id: id,
        title: title,
        date: parsedDate,
        endDate: createSafeDate(safeGet(idxEndDate)),
        time: safeGet(idxTime),
        location: safeGet(idxLocation),
        lat: safeGet(idxLat),
        lng: safeGet(idxLng),
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
