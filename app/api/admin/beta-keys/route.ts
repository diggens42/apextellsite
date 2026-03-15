import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { createBetaKeyForUser } from "@/app/lib/beta-keys";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const keys = await prisma.betaKey.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } } },
  });

  return NextResponse.json({ keys });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, expiresInDays } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const existing = await prisma.betaKey.findUnique({ where: { userId } });
  if (existing) {
    return NextResponse.json({ error: "User already has a beta key" }, { status: 409 });
  }

  const key = await createBetaKeyForUser(userId, expiresInDays || 90);
  return NextResponse.json({ key }, { status: 201 });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { keyId, action } = await req.json();

  if (action === "revoke") {
    const key = await prisma.betaKey.update({
      where: { id: keyId },
      data: { isActive: false, revokedAt: new Date() },
    });
    return NextResponse.json({ key });
  }

  if (action === "activate") {
    const key = await prisma.betaKey.update({
      where: { id: keyId },
      data: { isActive: true, revokedAt: null },
    });
    return NextResponse.json({ key });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
