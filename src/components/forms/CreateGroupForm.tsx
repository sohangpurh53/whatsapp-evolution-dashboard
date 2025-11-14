import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiFormBase } from "./ApiFormBase";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { parseVcf, VCardContact } from "@/lib/vcard";
import { parseCsv, parseExcel } from "@/lib/importers";

interface CreateGroupFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const CreateGroupForm = ({ config }: CreateGroupFormProps) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState<string>("");
  const [contacts, setContacts] = useState<VCardContact[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const normalizePhone = (tel: string) => tel.replace(/[^\d]/g, "");

  const selectedNumbers = useMemo(
    () => Object.keys(selected).filter((n) => selected[n]),
    [selected]
  );

  const handleSubmit = async () => {
    const participantArray = participants
      .split(/[\n,;]+/)
      .map((p) => normalizePhone(p.trim()))
      .filter(Boolean);
    const union = Array.from(new Set([...participantArray, ...selectedNumbers]));
      
    const response = await fetch(
      `${config.baseUrl}/group/create/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          subject,
          description,
          participants: union,
        }),
      }
    );
    return response.json();
  };

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

  const toggleOne = (num: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [num]: checked }));
  };
  return (
    <ApiFormBase
      title="Create Group"
      description="Create a new WhatsApp group"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="subject">Group Name</Label>
        <Input
          id="subject"
          placeholder="My Group"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Group description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="participants">Participants (comma or line separated)</Label>
        <Textarea
          id="participants"
          placeholder="5531900000000, 5531911111111&#10;or one per line"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          rows={4}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        {participants.length ? `${participantArrayPreview(participants)} detected` : ""}
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
      </div>
    </ApiFormBase>
  );
};

function participantArrayPreview(input: string): string {
  const count = input
    .split(/[\n,;]+/)
    .map((p) => p.trim())
    .filter(Boolean).length;
  return `${count} participant${count === 1 ? "" : "s"}`;
}
