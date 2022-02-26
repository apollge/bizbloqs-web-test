import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .refine((value) => value !== "", { message: "Username Required" }),
  password: z
    .string()
    .refine((value) => value !== "", { message: "Password Required" }),
});

export type UserSchema = z.infer<typeof userSchema>;
