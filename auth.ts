import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"
import { getUserById } from "@/data/user"
import { getAccountByUserId } from "@/data/account"

// https://authjs.dev/getting-started/typescript
declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"] 
  }
}

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      console.log({
        USER: user,
        ACCOUNT: account
      });
      
      const existingUser = await getUserById(user.id)

      if (!existingUser || !existingUser.emailVerified) return false
      
      return true
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await db.user.findUnique({ where: { id: token.sub }})

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(
        existingUser.id
      );
      
      token.isOAuth = !!existingAccount;
      token.role = existingUser.role
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
