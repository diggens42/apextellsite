import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { sendBetaKeyEmail } from "@/app/lib/email";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: { include: { betaKey: true } } },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (verificationToken.usedAt) {
      return NextResponse.json({ error: "Token already used" }, { status: 400 });
    }

    if (verificationToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // Mark token as used and verify email
    await prisma.$transaction([
      prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { usedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      }),
    ]);

    // Send beta key email
    if (verificationToken.user.betaKey) {
      try {
        await sendBetaKeyEmail(
          verificationToken.user.email,
          verificationToken.user.betaKey.key
        );
      } catch {
        // Non-critical
      }
    }

    return NextResponse.json({ message: "Email verified successfully" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
