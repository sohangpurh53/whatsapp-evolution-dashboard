import { VCardContact } from "@/lib/vcard";
import * as XLSX from "xlsx";

const normalizePhone = (tel: string) => tel.replace(/[^\d]/g, "");

const splitCsv = (line: string, delimiter: string): string[] => {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && ch === delimiter) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
};

const headerIndex = (headers: string[], candidates: string[]): number => {
  const lower = headers.map((h) => h.toLowerCase());
  for (let i = 0; i < lower.length; i++) {
    for (const c of candidates) {
      if (lower[i].includes(c)) return i;
    }
  }
  return -1;
};

export const parseCsv = (content: string): VCardContact[] => {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length);
  if (lines.length === 0) return [];
  const first = lines[0];
  const delimiter = (first.match(/;/g)?.length || 0) > (first.match(/,/g)?.length || 0) ? ";" : ",";
  const headers = splitCsv(lines[0], delimiter);
  const iNumber = headerIndex(headers, ["number", "phone", "tel", "whatsapp", "msisdn"]);
  const iName = headerIndex(headers, ["name", "full name", "fullname", "contact", "fn"]);
  const contacts: VCardContact[] = [];
  for (let li = 1; li < lines.length; li++) {
    const cols = splitCsv(lines[li], delimiter);
    const rawNum = iNumber >= 0 ? cols[iNumber] || "" : cols[0] || "";
    const number = normalizePhone(rawNum);
    if (!number) continue;
    const name = iName >= 0 ? cols[iName] || undefined : undefined;
    contacts.push({ name, number });
  }
  return contacts;
};

export const parseExcel = async (buffer: ArrayBuffer): Promise<VCardContact[]> => {
  const wb = XLSX.read(buffer, { type: "array" });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) return [];
  const sheet = wb.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  if (!rows.length) return [];
  const headers: string[] = (rows[0] || []).map((h) => String(h || ""));
  const iNumber = headerIndex(headers, ["number", "phone", "tel", "whatsapp", "msisdn"]);
  const iName = headerIndex(headers, ["name", "full name", "fullname", "contact", "fn"]);
  const contacts: VCardContact[] = [];
  for (let ri = 1; ri < rows.length; ri++) {
    const row = rows[ri] || [];
    const rawNum = iNumber >= 0 ? String(row[iNumber] || "") : String(row[0] || "");
    const number = normalizePhone(rawNum);
    if (!number) continue;
    const name = iName >= 0 ? (row[iName] ? String(row[iName]) : undefined) : undefined;
    contacts.push({ name, number });
  }
  return contacts;
};