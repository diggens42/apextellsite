import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { formatDate } from "@/app/lib/utils";
import Card from "@/app/components/ui/Card";
import { Key, Download, Calendar, Mail } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { betaKey: true },
  });

  if (!user) redirect("/auth/login");

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-text-primary mb-8">
        Dashboard<span className="text-crimson">.</span>
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Beta Key Card */}
        <Card className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center">
              <Key className="h-6 w-6 text-gold" />
            </div>
            <div className="flex-1">
              <h2 className="font-sans text-lg font-semibold text-text-primary">Your Beta Key</h2>
              {user.betaKey ? (
                <>
                  <p className="mt-3 font-mono text-2xl tracking-widest text-gold">
                    {user.betaKey.key}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-muted font-sans">
                    <span className={`inline-flex items-center gap-1.5 ${user.betaKey.isActive ? "text-emerald-400" : "text-crimson-light"}`}>
                      <span className={`h-2 w-2 rounded-full ${user.betaKey.isActive ? "bg-emerald-400" : "bg-crimson-light"}`} />
                      {user.betaKey.isActive ? "Active" : "Inactive"}
                    </span>
                    {user.betaKey.expiresAt && (
                      <span>Expires: {formatDate(user.betaKey.expiresAt)}</span>
                    )}
                  </div>
                </>
              ) : (
                <p className="mt-2 text-text-muted">No beta key assigned yet.</p>
              )}
            </div>
          </div>
        </Card>

        {/* Download Card */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg border border-border bg-elevated flex items-center justify-center">
              <Download className="h-5 w-5 text-text-secondary" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-text-primary">Download</h3>
              <p className="mt-1 text-sm text-text-muted">
                Desktop app downloads will be available soon. You&apos;ll be notified by email.
              </p>
            </div>
          </div>
        </Card>

        {/* Account Info Card */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-text-muted" />
              <div>
                <p className="font-sans text-sm text-text-muted">Email</p>
                <p className="font-sans text-sm text-text-primary">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-text-muted" />
              <div>
                <p className="font-sans text-sm text-text-muted">Member since</p>
                <p className="font-sans text-sm text-text-primary">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${user.emailVerified ? "bg-emerald-400" : "bg-yellow-400"}`} aria-hidden="true" />
              <p className="font-sans text-sm text-text-secondary">
                Email {user.emailVerified ? "verified" : "not verified"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
