"use client";

import { useEffect, useState } from "react";
import Card from "@/app/components/ui/Card";
import { Users, Key, Clock } from "lucide-react";
import { formatDate } from "@/app/lib/utils";

interface Stats {
  userCount: number;
  activeKeyCount: number;
  recentUsers: {
    id: string;
    email: string;
    createdAt: string;
    role: string;
    emailVerified: string | null;
  }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) {
    return <p className="text-text-muted font-sans">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-text-primary mb-8">
        Admin Overview<span className="text-crimson">.</span>
      </h1>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card>
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-crimson" />
            <div>
              <p className="font-mono text-3xl text-text-primary">{stats.userCount}</p>
              <p className="font-sans text-sm text-text-muted">Total Users</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <Key className="h-8 w-8 text-gold" />
            <div>
              <p className="font-mono text-3xl text-text-primary">{stats.activeKeyCount}</p>
              <p className="font-sans text-sm text-text-muted">Active Beta Keys</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <Clock className="h-8 w-8 text-text-secondary" />
            <div>
              <p className="font-mono text-3xl text-text-primary">{stats.recentUsers.length}</p>
              <p className="font-sans text-sm text-text-muted">Recent Registrations</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Registrations */}
      <h2 className="font-sans text-lg font-semibold text-text-primary mb-4">Recent Registrations</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full font-sans text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-4 py-3 text-left font-medium text-text-muted">Email</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Role</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Verified</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">Joined</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentUsers.map((user) => (
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
                <td className="px-4 py-3 text-text-muted">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
