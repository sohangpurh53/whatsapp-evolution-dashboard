import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";
import { parseVcf } from "@/lib/vcard";
import { parseCsv, parseExcel } from "@/lib/importers";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

interface CheckNumberFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const CheckNumberForm = ({ config }: CheckNumberFormProps) => {
  const [numbers, setNumbers] = useState("");
  const [contacts, setContacts] = useState<any>("")
  const [fileName, setFileName] = useState<any>("")
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);


  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (ext === "vcf") {
      const text = await f.text();
      setContacts(parseVcf(text));
      return;
    }
    if (ext === "csv") {
      const text = await f.text();
      setContacts(parseCsv(text));
      return;
    }
    if (ext === "xlsx" || ext === "xls") {
      const buf = await f.arrayBuffer();
      const c = await parseExcel(buf);
      setContacts(c);
      return;
    }
    const text = await f.text();
    setContacts(parseVcf(text));
  };
  const normalizePhone = (tel: string) => tel.replace(/[^\d]/g, "");
  const normalizePhoneImported = (tel: string) => {
    let num = tel.replace(/[^\d]/g, "").replace(/^0+/, "");
    return num.startsWith("91") ? num : "91" + num;
  };
  const selectedNumbers = useMemo(
    () => Object.keys(selected).filter((n) => selected[n]),
    [selected]
  );

  const handleSubmit = async () => {
    // const numberArray = numbers
    //   .split("\n")
    //   .map((n) => n.trim())
    //   .filter(Boolean);

    const numberArray = numbers
      .split("\n")
      .map((n) => normalizePhoneImported(n.trim()))
      .filter(Boolean);
    const selectedNumbersArray = selectedNumbers.map((p) => normalizePhoneImported(p.trim()))
    const union = Array.from(new Set([...numberArray, ...selectedNumbersArray]));

    const response = await fetch(
      `${config.baseUrl}/chat/whatsappNumbers/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ numbers: union }),
      }
    );
    return response.json();
  };

  const toggleOne = (num: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [num]: checked }));
  };
  return (
    <ApiFormBase
      title="Check WhatsApp Numbers"
      description="Verify if phone numbers are registered on WhatsApp"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="numbers">Phone Numbers (one per line)</Label>
        <Textarea
          id="numbers"
          placeholder="55999999999&#10;55988888888&#10;55977777777"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          rows={6}

        />
      </div>
      <Separator />
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="import">Import contacts (VCF/CSV/XLSX/XLS)</Label>
          <Input
            id="import"
            type="file"
            accept=".vcf,.csv,.xlsx,.xls,text/vcard,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={onFileChange}
          />
        </div>
      </div>
      {contacts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {Object.values(selected).filter(Boolean).length} selected / {contacts.length} parsed{fileName ? ` — ${fileName}` : ""}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectAll}
                onCheckedChange={(v) => {
                  const next = Boolean(v);
                  setSelectAll(next);
                  const m: Record<string, boolean> = {};
                  for (const c of contacts) m[c.number] = next;
                  setSelected(m);
                }}
                id="selectAll"
              />
              <Label htmlFor="selectAll">Select all</Label>
            </div>

          </div>

          <ScrollArea className="h-64 rounded-md border p-2">
            <div className="space-y-2">
              {contacts.map((c) => (
                <div key={`${c.number}-${c.name || ""}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={!!selected[c.number]}
                      onCheckedChange={(v) => toggleOne(c.number, Boolean(v))}
                      id={`chk-${c.number}`}
                    />
                    <Label htmlFor={`chk-${c.number}`} className="cursor-pointer">
                      {c.name ? `${c.name} — ${c.number}` : c.number}
                    </Label>
                  </div>
                  <Button variant="outline" type="button" size="sm" onClick={() => toggleOne(c.number, true)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </ApiFormBase>

  );
};
