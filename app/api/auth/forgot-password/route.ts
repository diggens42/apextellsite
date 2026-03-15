import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/app/lib/db";
import { forgotPasswordSchema } from "@/app/lib/validations";
import { sendPasswordResetEmail } from "@/app/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ message: "If an account exists, a reset email has been sent." });
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        type: "PASSWORD_RESET",
        expiresAt,
      },
    });

    try {
      await sendPasswordResetEmail(user.email, token);
    } catch {
      // Don't expose email sending failures
    }

    return NextResponse.json({ message: "If an account exists, a reset email has been sent." });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
