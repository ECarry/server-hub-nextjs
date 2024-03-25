"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateManufacturerSchema } from "@/schemas";
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
