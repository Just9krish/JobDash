import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter a email!" })
    .email({ message: "Please enter a valid email!" }),
  password: z.string({ required_error: "Please enter password!" }).min(1),
  code: z.optional(z.string()),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Please enter a email!" })
      .email({ message: "Please enter a valid email!" }),
    password: z.string({ required_error: "Please enter password!" }).min(1),
    confirmPassword: z.string({
      required_error: "Please enter confirm password!",
    }),
    firstName: z.string({ required_error: "Please enter first name!" }),
    lastName: z.string({ required_error: "Please enter last name!" }),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match!",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Please enter a email!" })
    .email({ message: "Please enter a valid email!" }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const newPasswordSchema = z
  .object({
    password: z.string({ required_error: "Please enter a email!" }).min(1),
    confirmPassword: z.string({
      required_error: "Please enter confirm password!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match!",
    path: ["confirmPassword"],
  });

export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
