export type VCardContact = {
  name?: string;
  number: string;
};

const normalizePhone = (tel: string) => tel.replace(/[^\d]/g, "");

export const parseVcf = (content: string): VCardContact[] => {
  const cards = content
    .split(/END:VCARD/)
    .map((c) => c.trim())
    .filter((c) => c.length);

  const contacts: VCardContact[] = [];

  for (const raw of cards) {
    const lines = raw.split(/\r?\n/);
    let name: string | undefined;
    const tels: string[] = [];

    for (const line of lines) {
      const l = line.trim();
      if (!l) continue;
      if (l.startsWith("FN:")) {
        name = l.slice(3).trim();
        continue;
      }
      if (l.startsWith("N:")) {
        if (!name) name = l.slice(2).trim();
        continue;
      }
      if (/^TEL/i.test(l) || /\.TEL:/i.test(l)) {
        const parts = l.split(":");
        const tel = parts[parts.length - 1].trim();
        const normalized = normalizePhone(tel);
        if (normalized) tels.push(normalized);
        continue;
      }
      const match = l.match(/item\d+\.(?:TEL|X-ABLabel):(.+)$/i);
      if (match && match[1]) {
        const normalized = normalizePhone(match[1]);
        if (normalized) tels.push(normalized);
      }
    }

    for (const tel of Array.from(new Set(tels))) {
      contacts.push({ name, number: tel });
    }
  }

  return contacts;
};