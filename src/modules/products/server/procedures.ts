import { db } from "@/db";
import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {
  products,
  productsInsertSchema,
  productsUpdateSchema,
} from "@/db/schema";
import { eq, desc, lt, and, or } from "drizzle-orm";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  create: adminProcedure
    .input(productsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const [existingProduct] = await db
        .select()
        .from(products)
        .where(eq(products.name, input.name))
        .limit(1);

      if (existingProduct) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product already exists",
        });
      }

      const [newProduct] = await db.insert(products).values(input).returning();

      return newProduct;
    }),
  update: adminProcedure
    .input(productsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const [updatedProduct] = await db
        .update(products)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(products.id, id))
        .returning();

      return updatedProduct;
    }),
  remove: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const [deletedProduct] = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      return deletedProduct;
    }),
  getMany: adminProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const data = await db
        .select()
        .from(products)
        .where(
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
        .orderBy(desc(products.updatedAt))
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
});
