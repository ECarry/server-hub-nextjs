"use server";

import { generatePasswordResetToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendRestPasswordEmail } from "@/lib/mail";
import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "Email does not exist!" };
  }

  const resetPasswordToken = await generatePasswordResetToken(email);

  await sendRestPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Reset email sent!" };
};
