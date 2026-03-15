import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/app/lib/db";
import { registerSchema } from "@/app/lib/validations";
import { sendVerificationEmail } from "@/app/lib/email";
import { createBetaKeyForUser } from "@/app/lib/beta-keys";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, referralSource } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        referralSource: referralSource || null,
      },
    });

    // Generate beta key
    await createBetaKeyForUser(user.id);

    // Create verification token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        type: "EMAIL_VERIFY",
        expiresAt,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, token);
    } catch {
      // Don't fail registration if email fails
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "REGISTER",
        metadata: { referralSource },
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json(
      { message: "Account created. Please check your email to verify." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
