import { db } from "@/lib/db";

export const getOTPByEmail = async (email: string) => {
  try {
    const verificationCode = await db.verificationCode.findFirst({
      where: {
        email,
      },
    });

    return verificationCode;
  } catch (error) {
    return null;
  }
};

export const getOTPByPin = async (code: number) => {
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
