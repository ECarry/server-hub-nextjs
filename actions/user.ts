"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileSchema, UserSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export const editProfile = async (values: z.infer<typeof ProfileSchema>) => {
  const validatedFields = ProfileSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Invalid password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  try {
    await db.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        ...values,
      },
    });

    return { success: "Profile updated!" };
  } catch (error) {
    return { error: "Updated error" };
  }
};

export const deleteUser = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const mvUser = await getUserById(values.id);

  if (!mvUser) {
    return { error: "User not found" };
  }

  if (dbUser.role !== "ADMIN" || dbUser.id !== mvUser.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.user.delete({
      where: {
        id: mvUser.id,
      },
    });

    revalidatePath("/dashboard/users", "page");
    return { success: "User deleted!" };
  } catch (error) {
    return { error: "Delete error" };
  }
};
