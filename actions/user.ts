"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas";
import * as z from "zod";

export const editProfile = async (values: z.infer<typeof ProfileSchema>) => {
  const validatedFields = ProfileSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
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
