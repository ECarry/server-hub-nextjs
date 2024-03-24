import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import { LoginSchema, LoginWithCodeSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "otp",
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        code: { label: "Code", type: "number" },
      },
      async authorize(credentials) {
        const validatedFields = LoginWithCodeSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, code } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user) return null;
          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
