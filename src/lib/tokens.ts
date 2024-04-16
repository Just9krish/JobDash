import {
  getResetPasswordTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
} from "@/repeated/verificationToken";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { addHours, isAfter } from "date-fns";
import {
  sendResetPasswordEmail,
  sendTwoAuthEmail,
  sendVerificationEmail,
} from "./mail";
import crypto from "crypto";

/**
 * Generates a verification token for the given email.
 *
 * @param {string} email - The email for which to generate the verification token.
 * @returns {Promise<object>} - A promise that resolves to the generated verification token.
 * @throws {Error} - If there is an error generating the verification token.
 */
export const generateVerificationToken = async (email: string) => {
  const token = nanoid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Token expires in 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  // Check if there is an existing token and if it's valid
  if (existingToken && isAfter(new Date(existingToken.expires), new Date())) {
    // If there is a valid token, return it
    return existingToken;
  } else {
    // If there is no valid token, delete any existing token and create a new one
    if (existingToken) {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const verificationToken = await prisma.verificationToken.create({
      data: {
        email,
        vToken: token,
        expires,
      },
    });

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.vToken,
    );

    return verificationToken;
  }
};

/**
 * Generates a reset token for the given email address.
 *
 * @param email - The email address for which to generate the reset token.
 * @returns The generated reset token.
 */
export const generateResetToken = async (email: string) => {
  const token = nanoid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Token expires in 1 hour

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken && isAfter(new Date(existingToken.expires), new Date())) {
    return existingToken;
  } else {
    if (existingToken) {
      await prisma.resetPasswordToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const resetToken = await prisma.resetPasswordToken.create({
      data: {
        email,
        rToken: token,
        expires,
      },
    });

    await sendResetPasswordEmail(resetToken.email, resetToken.rToken);

    return resetToken;
  }
};

export const generateTwoFactorToken = async (email: string) => {
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken && isAfter(new Date(existingToken.expires), new Date())) {
    console.log(existingToken.token);
    return existingToken;
  } else {
    if (existingToken) {
      await prisma.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const token = crypto.randomInt(100_000, 1_000_000).toString();

    const expires = addHours(new Date(), 2);

    const twoFactorToken = await prisma.twoFactorToken.create({
      data: {
        email,
        expires,
        token: token,
      },
    });

    // await sendTwoAuthEmail(twoFactorToken.email, twoFactorToken.token);
    console.log(token);

    return twoFactorToken;
  }
};
