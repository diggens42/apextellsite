import { prisma } from "./db";
import { generateBetaKey } from "./utils";

export async function createBetaKeyForUser(userId: string, expiresInDays = 90) {
  const key = generateBetaKey();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  return prisma.betaKey.create({
    data: {
      key,
      userId,
      isActive: true,
      expiresAt,
      activatedAt: new Date(),
    },
  });
}

export async function revokeBetaKey(keyId: string) {
  return prisma.betaKey.update({
    where: { id: keyId },
    data: {
      isActive: false,
      revokedAt: new Date(),
    },
  });
}

export function generateBulkKeys(count: number) {
  const keys: string[] = [];
  for (let i = 0; i < count; i++) {
    keys.push(generateBetaKey());
  }
  return keys;
}
