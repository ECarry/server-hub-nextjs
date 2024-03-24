import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getOTPByEmail } from "./verification-otp";

export const generateOTP = async (email: string) => {
  const code = Math.floor(Math.random() * 900000) + 100000;
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingCode = await getOTPByEmail(email);

  if (existingCode) {
    await db.verificationCode.delete({
      where: {
        id: existingCode.id,
      },
    });
  }

  const verificationCode = await db.verificationCode.create({
    data: {
      email,
      code,
      expires,
    },
  });

  return verificationCode;
};

export const generatePasswordResetCode = async (email: string) => {
  const code = Math.floor(Math.random() * 900000) + 100000;
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingCode = await getPasswordResetTokenByEmail(email);

  if (existingCode) {
    await db.passwordResetToken.delete({
      where: {
        id: existingCode.id,
      },
    });
  }

  const verificationCode = await db.passwordResetCode.create({
    data: {
      email,
      code,
      expires,
    },
  });

  return verificationCode;
};
