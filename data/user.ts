import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error) {
    return null;
  }
};

export const getNumberOfUsers = async (count: number) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        name: "asc",
      },
      take: count,
    });

    return users;
  } catch (error) {
    return [];
  }
};
