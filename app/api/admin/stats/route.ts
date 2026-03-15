import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [userCount, activeKeyCount, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.betaKey.count({ where: { isActive: true } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, email: true, createdAt: true, role: true, emailVerified: true },
    }),
  ]);

  return NextResponse.json({ userCount, activeKeyCount, recentUsers });
}
