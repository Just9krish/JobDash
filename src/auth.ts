import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { loginSchema } from "./schema/auth.schema";
import { getUserByEmail } from "./repeated/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
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
});
