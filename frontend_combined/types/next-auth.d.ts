import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      provider: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }

  interface AdapterUser {
    role: string;
  }
}
