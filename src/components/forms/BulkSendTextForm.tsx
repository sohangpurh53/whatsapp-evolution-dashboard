import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ApiFormBase } from "./ApiFormBase";
import { parseVcf, VCardContact } from "@/lib/vcard";
import { parseCsv, parseExcel } from "@/lib/importers";

interface BulkSendTextFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const BulkSendTextForm = ({ config }: BulkSendTextFormProps) => {
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState<VCardContact[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const selectedNumbers = useMemo(
    () => Object.keys(selected).filter((n) => selected[n]),
    [selected]
  );

  useEffect(() => {
    if (!contacts.length) return;
    const initial: Record<string, boolean> = {};
    for (const c of contacts) initial[c.number] = selectAll;
    setSelected(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, selectAll]);

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
      const contacts = await parseExcel(buf);
      setContacts(contacts);
      return;
    }
    const text = await f.text();
    setContacts(parseVcf(text));
  };

  const toggleOne = (num: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [num]: checked }));
  };

  const handleSubmit = async () => {
    const toSend = selectedNumbers;
    const results: Array<{ number: string; ok: boolean; data?: any; error?: any }> = [];
    for (const number of toSend) {
      const indianNum = `91${number}`
      try {
        const res = await fetch(
          `${config.baseUrl}/message/sendText/${config.instance}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: config.apiKey,
            },
            body: JSON.stringify({ number:indianNum, text: message }),
          }
        );
        const data = await res.json();
        results.push({ number, ok: res.ok, data });
      } catch (error: any) {
        results.push({ number, ok: false, error: error?.message || String(error) });
      }
    }

    const successCount = results.filter((r) => r.ok).length;
    const failureCount = results.length - successCount;

    return {
      message: `Sent ${successCount}/${results.length} messages from ${fileName || "VCF"}`,
      total: results.length,
      successes: successCount,
      failures: failureCount,
      results,
    };
  };

  return (
    <ApiFormBase
      title="Bulk Send Text via VCF"
      description="Upload a .vcf file, select contacts, and send messages one by one"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vcf">(supported files csv, vcf, xlxs)</Label>
          <Input id="vcf" type="file" accept=".vcf,.csv,.xlsx,.xls,text/vcard,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={onFileChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
          />
        </div>

        {contacts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {selectedNumbers.length} selected / {contacts.length} parsed
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={(v) => setSelectAll(Boolean(v))}
                  id="selectAll"
                />
                <Label htmlFor="selectAll">Select all</Label>
              </div>
            </div>
            <Separator />
            <ScrollArea className="h-64 rounded-md border p-2">
              <div className="space-y-2">
                {contacts.map((c) => (
                  <div key={`${c.number}-${c.name || ""}"`} className="flex items-center justify-between">
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
      </div>
    </ApiFormBase>
  );
};