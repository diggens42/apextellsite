import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mb-8 flex items-center gap-6 border-b border-border pb-4">
        <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">Admin</span>
        <Link href="/admin" className="font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Overview
        </Link>
        <Link href="/admin/users" className="font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Users
        </Link>
        <Link href="/admin/beta-keys" className="font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Beta Keys
        </Link>
      </div>
      {children}
    </div>
  );
}
