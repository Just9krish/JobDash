import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter a email!" })
    .email({ message: "Please enter a valid email!" }),
  password: z.string({ required_error: "Please enter password!" }).min(1),
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
    gender: z.string({ required_error: "Please select gender!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match!",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
