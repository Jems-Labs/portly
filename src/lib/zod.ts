import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be 20 characters or fewer" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string(),
});
export const loginSchema = z.object({
  email: z.string().email({message: "Please enter a valid email address"}),
  password: z.string()
})