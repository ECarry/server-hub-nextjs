import { db } from "@/lib/db";

export const getVerificationCodeByEmail = async (email: string) => {
  try {
    const verificationCode = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationCode;
  } catch (error) {
    return null;
  }
};

export const getVerificationCodeByCode = async (code: number) => {
  try {
    const verificationCode = await db.verificationCode.findUnique({
      where: {
        code,
      },
    });

    return verificationCode;
  } catch (error) {
    return null;
  }
};
