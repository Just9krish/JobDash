import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a verification email to the specified email address.
 *
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the email.
 * @returns A Promise that resolves when the email is sent successfully.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.CLIENT_DOMAIN}/new-verification?token=${token}`;

  const d = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm you email",
    html: `<p>Click <a href="${verificationLink}">here</a> to confirm email.</p>`,
  });
};

/**
 * Sends a reset password email to the specified email address.
 *
 * @param email - The email address to send the reset password email to.
 * @param token - The token used for password reset.
 * @returns A Promise that resolves to the result of sending the email.
 */
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.CLIENT_DOMAIN}/new-password?token=${token}`;

  const d = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your passowrd",
    html: `<p>Click <a href="${verificationLink}">here</a> to reset your password.</p>`,
  });
};

/**
 * Sends a two-factor authentication email to the specified email address.
 *
 * @param email - The email address to send the email to.
 * @param token - The two-factor authentication token to include in the email.
 * @returns A Promise that resolves when the email is sent successfully.
 */
export const sendTwoAuthEmail = async (email: string, token: string) => {
  const d = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
