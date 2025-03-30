import { db } from "@/db";
import { productsCategories } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productCategoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(productsCategories);

    return data;
  }),
});
