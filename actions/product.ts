"use server";

import { getManufacturerByName } from "@/data/product";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CreateInfrastructureSchema,
  CreateManufacturerSchema,
  CreateSeriesSchema,
  productFormSchema,
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

export const CreateSeries = async (
  values: z.infer<typeof CreateSeriesSchema>
) => {
  const validatedFields = CreateSeriesSchema.safeParse(values);
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
    await db.series.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard", "layout");

    return { success: "Series created" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong!" };
  }
};

export const CreateProudct = async (
  values: z.infer<typeof productFormSchema>
) => {
  const validatedFields = productFormSchema.safeParse(values);
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

  const existingProuct = await db.product.findFirst({
    where: {
      slug: values.slug,
    },
  });

  if (!!existingProuct) {
    return { error: "Product already exists" };
  }

  try {
    await db.product.create({
      data: {
        name: values.name,
        slug: values.slug,
        description: values.description,
        seriesId: values.seriesId,
        status: values.status,
      },
    });

    revalidatePath("/dashboard", "layout");

    return { success: "Product created" };
  } catch (error) {
    console.log(error);

    return { error: "Something wrong!" };
  }
};
