"use server";

import { SALT } from "@/lib/constant";
import {
  ForgotPasswordInput,
  LoginInput,
  NewPasswordInput,
  RegisterInput,
  forgotPasswordSchema,
  loginSchema,
  newPasswordSchema,
  registerSchema,
} from "@/schema/auth.schema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/repeated/user";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import {
  getResetPasswordTokenByToken,
  getTwoFactorTokenByEmail,
  getVerificationTokenByToken,
} from "@/repeated/verificationToken";
import { isAfter, isBefore } from "date-fns";
import { getTwoFactorConfirmationByUserId } from "@/repeated/twoFactorConfirmation";

/**
 * Performs a login operation with the provided credentials.
 *
 * @param data - The login input data, including email and password.
 * @returns An object with either a success message indicating a successful login,
 *          or an error message indicating invalid credentials or other errors.
 */
export async function login(data: LoginInput) {
  const validatedField = loginSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    return { success: "Verification email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // TODO : verify code
      const twoAuthCode = await getTwoFactorTokenByEmail(existingUser.email);

      console.log(twoAuthCode);

      if (!twoAuthCode) {
        return { error: "Invalid code!" };
      }

      if (twoAuthCode.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = isBefore(new Date(twoAuthCode.expires), new Date());

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoAuthCode.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      return { twoAuth: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful!" };
  } catch (error) {
    console.log(error);

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

/**
 * Logs out the user by calling the signOut function.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export async function logout() {
  await signOut();
}

/**
 * Registers a new user.
 *
 * @param data - The registration data for the user.
 * @returns An object with either an error message or a success message.
 */
export async function register(data: RegisterInput) {
  console.log("Registering user", data);
  const validatedField = registerSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, firstName, lastName, password, isTwoFactorEnabled } =
    validatedField.data;

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
      password: hashedPassword,
      isTwoFactorEnabled,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  // TODO: Send verification mail

  return { success: "Confirmation email sent" };
}

/**
 * Verifies a token for email verification.
 *
 * @param {string} token - The verification token to be verified.
 * @returns {Object} - An object with either an 'error' or 'success' property.
 *                    - If the token is invalid, the 'error' property will be set to "Invalid verification link!".
 *                    - If the token is expired, the 'error' property will be set to "Verification link expired!".
 *                    - If the email does not exist, the 'error' property will be set to "Email does not exist!".
 *                    - If the token is valid and not expired, the 'success' property will be set to "Email verified!".
 */
export async function verifyToken(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid verification link!" };
  }

  // const isTokenExpired = isAfter(existingToken.expires, new Date());
  const isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Verification link expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingToken) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: {
      id: existingUser?.id,
    },
    data: {
      emailVerified: true,
      emailVerifiedAt: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified!" };
}

/**
 * Sends a reset password email to the user with the provided email address.
 *
 * @param {ForgotPasswordInput} data - The input data containing the email address.
 * @returns {Object} - An object indicating the result of the operation. If the operation is successful, the object will have a 'success' property with the value "Reset password email sent". If there is an error, the object will have an 'error' property with a corresponding error message.
 */
export async function forgotPassword(data: ForgotPasswordInput) {
  const validatedField = forgotPasswordSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  await generateResetToken(email);

  return { success: "Reset password email sent" };
}

/**
 * Updates the password for a user using a reset token.
 *
 * @param {Object} params - The parameters for the function.
 * @param {NewPasswordInput} params.data - The new password data.
 * @param {string | null} params.token - The reset token.
 * @returns {Object} - The result of the password update.
 * @property {string} success - Indicates that the password was successfully updated.
 * @property {string} error - Indicates an error occurred during the password update.
 *   - "Token is missing!" - If the reset token is missing.
 *   - "Invalid fields!" - If the new password data is invalid.
 *   - "Password does not match!" - If the password and confirm password do not match.
 *   - "Invalid Token!" - If the reset token is invalid.
 *   - "Token is expired!" - If the reset token is expired.
 *   - "Email does not exist!" - If the email associated with the reset token does not exist.
 */
export async function newPassword({
  data,
  token,
}: {
  data: NewPasswordInput;
  token: string | null;
}) {
  if (!token) {
    return { error: "Token is missing!" };
  }

  const validatedField = newPasswordSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword } = validatedField.data;

  if (password !== confirmPassword) {
    return { error: "Password does not match!" };
  }

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Token is expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, SALT);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.resetPasswordToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated!" };
}
