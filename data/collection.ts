import { db } from "@/lib/db";

export const getCollectionByUserId = async (userId: string) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  try {
    const collections = await db.collection.findMany({
      where: {
        userId,
      },
    });

    return collections;
  } catch (error) {
    console.log(error);
  }
};
