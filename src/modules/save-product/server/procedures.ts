import { db } from "@/db";
import { saveProduct } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const saveProductRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const { user } = ctx;

      const [saved] = await db
        .insert(saveProduct)
        .values({
          userId: user.id,
          productId,
        })
        .returning();

      return saved;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;

      const [deleteSaved] = await db
        .delete(saveProduct)
        .where(
          and(
            eq(saveProduct.productId, productId),
            eq(saveProduct.userId, ctx.user.id)
          )
        )
        .returning();

      return deleteSaved;
    }),
});
