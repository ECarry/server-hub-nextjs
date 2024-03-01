"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateCollectionSchema, EditCollectionSchema } from "@/schemas";
import { Collection } from "@prisma/client";
import * as z from "zod";
import { revalidatePath } from "next/cache";

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
    await db.collection.create({
      data: {
        userId: user?.id,
        name,
        description,
      },
    });
    revalidatePath("/collections");
  } catch (error) {
    throw error;
  }

  return { success: "Create successful!" };
};

export const editCollection = async (values: Partial<Collection>) => {
  const user = await currentUser();
  const { id, name, description } = values;

  if (!user) {
    return { error: "User doesn't exist!" };
  }

  try {
    await db.collection.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        updateTime: new Date(),
      },
    });

    revalidatePath("/collections/[[collectionId]]", "page");
    return { success: "success" };
  } catch (error) {
    return { error: "error" };
  }
};

export const deleteCollection = async (id: string) => {
  if (!id) {
    return { error: "Collection ID is missing!" };
  }

  const collection = await db.collection.findFirst({
    where: {
      id,
    },
  });

  if (!collection) {
    return { error: "Collection doesn't exist!" };
  }

  await db.collection.delete({
    where: {
      id,
    },
  });

  return { success: `${collection.name} has been deleted.` };
};
