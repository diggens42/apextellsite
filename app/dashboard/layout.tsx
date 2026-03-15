import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <div className="mb-8 flex items-center gap-6 border-b border-border pb-4">
        <Link
          href="/dashboard"
          className="font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/account"
          className="font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Account
        </Link>
      </div>
      {children}
    </div>
  );
}
