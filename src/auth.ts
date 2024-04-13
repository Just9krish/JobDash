import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { loginSchema } from "./schema/auth.schema";
import { getUserByEmail, getUserById } from "./repeated/user";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedField = loginSchema.safeParse(credentials);

        if (validatedField.success) {
          const { email, password } = validatedField.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const isPassMatched = await bcrypt.compare(password, user.password);

          if (isPassMatched) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      console.log("token", token);
      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.role = user.role;

      return token;
    },
    async session({ session, token }) {
      console.log("token", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    // async signIn({ user }) {

    //   if (!user.id) return false;

    //   console.log('user', user);

    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.isEmailVerified) {
    //     console.log('existingUser', existingUser);
    //     return false;
    //   }
    //   console.log("run");

    //   return true;
    // }
  },
});
