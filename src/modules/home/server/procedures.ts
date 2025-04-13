import { db } from "@/db";
import {
  brands,
  productImage,
  products,
  productsCategories,
  productSeries,
} from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, or, eq, lt, desc, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export const homeRouter = createTRPCRouter({
  getManyProducts: baseProcedure
    .input(
      z.object({
        brandId: z.string().uuid().nullish(),
        categoryId: z.string().uuid().nullish(),
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input }) => {
      const { brandId, categoryId, cursor, limit } = input;

      const data = await db
        .select({
          ...getTableColumns(products),
          category: productsCategories.name,
          brand: brands.name,
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
        .where(
          and(
            eq(products.visibility, "public"),
            brandId ? eq(brands.id, brandId) : undefined,
            categoryId ? eq(productsCategories.id, categoryId) : undefined,
            cursor
              ? or(
                  lt(products.updatedAt, cursor.updatedAt),
                  and(
                    eq(products.updatedAt, cursor.updatedAt),
                    lt(products.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(products.updatedAt), desc(products.id))
        // Add 1 to the limit to check if there are more data
        .limit(limit + 1);

      const hasMore = data.length > limit;
      // Remove the last item if there is more data
      const items = hasMore ? data.slice(0, -1) : data;
      // Set the next cursor to the last item if there is more data
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
          }
        : null;

      return { items, nextCursor };
    }),
  getProductImages: baseProcedure
    .input(z.object({ productId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { productId } = input;

      if (!productId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const data = await db
        .select()
        .from(productImage)
        .where(eq(productImage.productId, productId));

      return data;
    }),
});
