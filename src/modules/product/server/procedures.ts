import { db } from "@/db";
import {
  brands,
  products,
  productsCategories,
  productSeries,
} from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { id } = input;

      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const [product] = await db
        .select({
          ...getTableColumns(products),
          category: productsCategories.name,
          brand: brands.name,
          brandFullName: brands.fullName,
          brandLogoKey: brands.logoImageKey,
          series: productSeries.name,
        })
        .from(products)
        .innerJoin(
          productsCategories,
          eq(products.categoryId, productsCategories.id)
        )
        .innerJoin(brands, eq(products.brandId, brands.id))
        .leftJoin(productSeries, eq(products.seriesId, productSeries.id))
        .where(and(eq(products.id, id), eq(products.visibility, "public")));

      return product;
    }),
});
