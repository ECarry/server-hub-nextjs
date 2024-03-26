"use server";

import { getManufacturerByName } from "@/data/product";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CreateInfrastructureSchema,
  CreateManufacturerSchema,
} from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const CreateManufacturer = async (
  values: z.infer<typeof CreateManufacturerSchema>
) => {
  const validatedFields = CreateManufacturerSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  if (!user) {
    return { error: "Not logged in" };
  }

  if (user.role !== "ADMIN") {
    return { error: "Not authorized" };
  }

  const existingManufacturer = await getManufacturerByName(values.name);

  if (!!existingManufacturer) {
    return { error: "Manufacturer already exists" };
  }

  try {
    await db.manufacturer.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard", "layout");

    return { success: "Manufacturer created" };
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

export const CreateInfrastructure = async (
  values: z.infer<typeof CreateInfrastructureSchema>
) => {
  const validatedFields = CreateInfrastructureSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  if (!user) {
    return { error: "Not logged in" };
  }

  if (user.role !== "ADMIN") {
    return { error: "Not authorized" };
  }

  try {
    await db.infrastructure.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard", "layout");

    return { success: "Infrastructure created" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong!" };
  }
};
