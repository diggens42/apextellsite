import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = "ApexTell <noreply@apextell.net>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${APP_URL}/auth/verify-email?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your ApexTell account",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f5f5f5;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to ApexTell</h1>
        <p style="color: #a3a3a3; line-height: 1.6;">Click the link below to verify your email address and activate your Closed Beta access.</p>
        <a href="${verifyUrl}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #dc2626; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Verify Email</a>
        <p style="color: #737373; font-size: 13px;">This link expires in 24 hours. If you didn't create an account, ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your ApexTell password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f5f5f5;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Password Reset</h1>
        <p style="color: #a3a3a3; line-height: 1.6;">Click the link below to reset your password.</p>
        <a href="${resetUrl}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #dc2626; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Reset Password</a>
        <p style="color: #737373; font-size: 13px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}

export async function sendBetaKeyEmail(email: string, betaKey: string) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Your ApexTell Beta Key",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f5f5f5;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Your Beta Key is Ready</h1>
        <p style="color: #a3a3a3; line-height: 1.6;">Your Closed Beta key for ApexTell:</p>
        <div style="margin: 24px 0; padding: 16px; background: #111111; border: 1px solid #222222; border-radius: 8px; text-align: center;">
          <code style="font-size: 20px; color: #d4af37; letter-spacing: 2px;">${betaKey}</code>
        </div>
        <p style="color: #a3a3a3; line-height: 1.6;">You can also find your key in your <a href="${APP_URL}/dashboard" style="color: #dc2626;">dashboard</a>.</p>
      </div>
    `,
  });
}
