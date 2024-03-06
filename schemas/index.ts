import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const PasswordSchema = z.object({
  password: z.string().min(6),
});

export const CreateCollectionSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  description: z.string(),
});

export const EditCollectionSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  description: z.string(),
});

export const ProfileSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
});
