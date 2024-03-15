import { newPassword } from "@/actions/new-password";
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
  name: z.optional(z.string()),
  description: z.optional(z.string()),
});

export const ProfileSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

// id: string;
// name: string | null;
// email: string | null;
// emailVerified: Date | null;
// image: string | null;
// password: string | null;
// role: $Enums.UserRole;
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  password: z.string().nullable(),
  role: z.enum(["USER", "ADMIN"]),
});
