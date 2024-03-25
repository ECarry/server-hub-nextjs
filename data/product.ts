import { db } from "@/lib/db";

export const getManufacturers = async () => {
  try {
    const manufacturers = await db.manufacturer.findMany({
      include: {
        infrastructures: true,
      },
    });

    return manufacturers;
  } catch (error) {
    console.log(error);
  }
};

export const getManufacturerByName = (name: string) => {
  try {
    const manufacturer = db.manufacturer.findFirst({
      where: {
        name: name,
      },
    });

    return manufacturer;
  } catch (error) {
    return null;
  }
};
