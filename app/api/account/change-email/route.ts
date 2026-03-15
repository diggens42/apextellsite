import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { changeEmailSchema } from "@/app/lib/validations";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = changeEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { email: parsed.data.email, emailVerified: null },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CHANGE_EMAIL",
        metadata: { oldEmail: user.email, newEmail: parsed.data.email },
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json({ message: "Email updated. Please verify your new email." });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
