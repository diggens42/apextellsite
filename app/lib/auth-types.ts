import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
      emailVerified: Date | null;
    };
  }
}
