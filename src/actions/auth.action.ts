"use server";

import { SALT } from "@/lib/constant";
import {
  LoginInput,
  RegisterInput,
  loginSchema,
  registerSchema,
} from "@/schema/auth.schema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/repeated/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(data: LoginInput) {
  const validatedField = loginSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedField.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}

export async function register(data: RegisterInput) {
  const validatedField = registerSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, firstName, lastName, password, gender } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "This email is already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, SALT);

  await prisma?.user.create({
    data: {
      email,
      firstName,
      lastName,
      gender,
      password: hashedPassword,
    },
  });

  // TODO: Send verification mail

  return { success: "User created!" };
}
