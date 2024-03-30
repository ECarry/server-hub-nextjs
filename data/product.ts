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

export const getInfrastructures = async () => {
  try {
    const infrastructures = await db.infrastructure.findMany({
      include: {
        Series: true,
      },
    });

    return infrastructures;
  } catch (error) {
    console.log(error);
  }
};

export const getSeries = async () => {
  try {
    const series = await db.series.findMany({});

    return series;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProucts = async () => {
  try {
    const products = await db.product.findMany({});

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await db.product.findFirst({
      where: {
        slug,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};
