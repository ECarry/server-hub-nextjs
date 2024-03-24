"use server";

import { signIn } from "@/auth";
import { generateOTP } from "@/data/codes";
import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { getOTPByPin, getOTPByEmail } from "@/data/verification-otp";
import { db } from "@/lib/db";
import { sendOTPEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  LoginSchema,
  LoginWithCodeEmailSchema,
  LoginWithCodeSchema,
} from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" };
  } else if (!existingUser.password) {
    return { error: "Email in use!" };
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

  return { success: "Login successful!" };
};

export const loginWithOTPEmail = async (
  values: z.infer<typeof LoginWithCodeEmailSchema>
) => {
  const validatedFields = LoginWithCodeEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  const resetCode = await generateOTP(email);

  await sendOTPEmail(resetCode.email, resetCode.code);

  return { success: "Verification code sent!" };
};

export const loginWithOTP = async (
  values: z.infer<typeof LoginWithCodeSchema>,
  callbackUrl: string | null
) => {
  const validatedFields = LoginWithCodeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    await db.user.create({
      data: {
        email,
      },
    });
  }

  const existingCode = await getOTPByEmail(email);

  if (!existingCode) {
    return { error: "Code does not exist!" };
  }

  if (existingCode.code !== code) {
    return { error: "Invalid code!" };
  }

  const hasExpired = new Date(existingCode.expires) < new Date();

  if (hasExpired) {
    return { error: "Code has expired!" };
  }

  await db.verificationCode.delete({
    where: {
      id: existingCode.id,
    },
  });

  try {
    // TODO: OTP
    await signIn("otp", {
      email,
      code,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful!" };
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
};
