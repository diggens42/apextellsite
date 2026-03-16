"use client";

import { useReducer, useEffect, useRef } from "react";
import { formatDate } from "@/app/lib/utils";
import Button from "@/app/components/ui/Button";

interface BetaKeyEntry {
  id: string;
  key: string;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  revokedAt: string | null;
  user: { email: string };
}

async function fetchKeys(): Promise<BetaKeyEntry[]> {
  const res = await fetch("/api/admin/beta-keys");
  const data = await res.json();
  return data.keys;
}

export default function AdminBetaKeysPage() {
  const [keys, setKeys] = useReducer((_: BetaKeyEntry[], next: BetaKeyEntry[]) => next, []);
  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;
    didLoad.current = true;
    fetchKeys().then(setKeys);
  }, []);

  async function reload() {
    const data = await fetchKeys();
    setKeys(data);
  }

  async function toggleKey(keyId: string, action: "revoke" | "activate") {
    await fetch("/api/admin/beta-keys", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyId, action }),
    });
    reload();
  }

  function exportCSV() {
    const header = "Key,Email,Active,Expires,Created\n";
    const rows = keys.map((k) =>
      `${k.key},${k.user.email},${k.isActive},${k.expiresAt || ""},${k.createdAt}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "beta-keys.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl tracking-wide text-text-primary">
          Beta Keys<span className="text-crimson">.</span>
          <span className="ml-3 font-mono text-lg text-text-muted">{keys.length}</span>
        </h1>
        <Button variant="gold" size="sm" onClick={exportCSV}>
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full font-sans text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th scope="col" className="px-4 py-3 text-left font-medium text-text-muted">Key</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-text-muted">User</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-text-muted">Status</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-text-muted">Expires</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-text-muted">Created</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-text-muted font-sans">
                  No beta keys found.
                </td>
              </tr>
            )}
            {keys.map((k) => (
              <tr key={k.id} className="border-b border-border/50 hover:bg-card/50">
                <td className="px-4 py-3 font-mono text-xs text-gold">{k.key}</td>
                <td className="px-4 py-3 text-text-primary">{k.user.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs ${k.isActive ? "text-emerald-400" : "text-crimson-light"}`}>
                    <span className={`h-2 w-2 rounded-full ${k.isActive ? "bg-emerald-400" : "bg-crimson-light"}`} />
                    {k.isActive ? "Active" : "Revoked"}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-muted">
                  {k.expiresAt ? formatDate(k.expiresAt) : "—"}
                </td>
                <td className="px-4 py-3 text-text-muted">{formatDate(k.createdAt)}</td>
                <td className="px-4 py-3">
                  {k.isActive ? (
                    <Button variant="danger" size="sm" onClick={() => toggleKey(k.id, "revoke")}>
                      Revoke
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => toggleKey(k.id, "activate")}>
                      Reactivate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
