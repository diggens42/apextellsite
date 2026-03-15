import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
    }

    // Audit log before deletion
    await prisma.auditLog.create({
      data: {
        action: "ACCOUNT_DELETED",
        metadata: { email: user.email },
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    // Cascade delete (betaKey, verificationTokens deleted via onDelete: Cascade)
    await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({ message: "Account deleted" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
