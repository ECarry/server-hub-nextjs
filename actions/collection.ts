"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateCollectionSchema, EditCollectionSchema } from "@/schemas";
import { Collection } from "@prisma/client";
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

export const editCollection = async (values: Partial<Collection>) => {
  const user = await currentUser();
  const { id, name, description } = values;

  if (!user) {
    return { error: "User does not exitd!" };
  }

  try {
    const collection = await db.collection.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        updateTime: new Date(),
      },
    });

    console.log(collection);
    return { success: "success" };
  } catch (error) {
    return { error: "error" };
  }
};
