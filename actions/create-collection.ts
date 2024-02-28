"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateCollectionSchema } from "@/schemas";
import * as z from "zod";

export const createCollection = async (
  values: z.infer<typeof CreateCollectionSchema>
) => {
  const validatedFields = CreateCollectionSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  if (!user) {
    return null;
  }

  const { name, description } = validatedFields.data;

  try {
    const collection = await db.collection.create({
      data: {
        userId: user?.id,
        name,
        description,
      },
    });

    console.log(collection);
  } catch (error) {
    throw error;
  }

  return { success: "Create successful!" };
};
