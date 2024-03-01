import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getCollectionsByUserId = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  try {
    const collections = await db.collection.findMany({
      where: {
        userId,
      },
      orderBy: {
        createTime: "desc",
      },
    });

    return collections;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionById = async (id: string) => {
  try {
    const collection = await db.collection.findFirst({
      where: {
        id,
      },
    });

    return collection ? collection : null;
  } catch (error) {}
};
