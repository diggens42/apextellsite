"use client";

import { useReducer, useEffect, useRef, useState } from "react";
import { formatDate } from "@/app/lib/utils";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

interface User {
  id: string;
  email: string;
  role: string;
  emailVerified: string | null;
  createdAt: string;
  betaKey: { key: string; isActive: boolean; expiresAt: string | null } | null;
}

interface PageData {
  users: User[];
  total: number;
  page: number;
  pages: number;
}

async function fetchUsers(search: string, role: string, page: number): Promise<PageData> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (role) params.set("role", role);
  params.set("page", String(page));
  const res = await fetch(`/api/admin/users?${params}`);
  return res.json();
}

export default function AdminUsersPage() {
  const [data, setData] = useReducer((_: PageData, next: PageData) => next, {
    users: [], total: 0, page: 1, pages: 1,
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const didLoad = useRef(false);

  useEffect(() => {
    if (!didLoad.current) {
      didLoad.current = true;
      fetchUsers(search, roleFilter, page).then(setData);
      return;
    }
    fetchUsers(search, roleFilter, page).then(setData);
  }, [search, roleFilter, page]);

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-text-primary mb-8">
        Users<span className="text-crimson">.</span>
        <span className="ml-3 font-mono text-lg text-text-muted">{data.total}</span>
      </h1>

      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          className="rounded-md border border-border bg-card px-4 py-3 text-text-primary font-sans text-sm cursor-pointer"
        >
          <option value="">All Roles</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full font-sans text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-4 py-3 text-left font-medium text-text-muted">Email</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Role</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Verified</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Beta Key</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Key Status</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Joined</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id} className="border-b border-border/50 hover:bg-card/50">
                <td className="px-4 py-3 text-text-primary">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                    user.role === "ADMIN" ? "bg-crimson/10 text-crimson" : "bg-border text-text-muted"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`h-2 w-2 inline-block rounded-full ${user.emailVerified ? "bg-emerald-400" : "bg-yellow-400"}`} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {user.betaKey?.key || "—"}
                </td>
                <td className="px-4 py-3">
                  {user.betaKey ? (
                    <span className={`text-xs ${user.betaKey.isActive ? "text-emerald-400" : "text-crimson-light"}`}>
                      {user.betaKey.isActive ? "Active" : "Revoked"}
                    </span>
                  ) : "—"}
                </td>
                <td className="px-4 py-3 text-text-muted">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="font-sans text-sm text-text-muted">
            {page} / {data.pages}
          </span>
          <Button variant="ghost" size="sm" disabled={page >= data.pages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
