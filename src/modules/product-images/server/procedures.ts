import { db } from "@/db";
import { productImage } from "@/db/schema";
import { adminProcedure, baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { productImageInsertSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const productImageRouter = createTRPCRouter({
  create: adminProcedure
    .input(productImageInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { productId, imageKey, primary } = input;
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      if (!productId || !imageKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const [newImage] = await db
        .insert(productImage)
        .values({
          productId,
          imageKey,
          primary,
        })
        .returning();

      return newImage;
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

      const [deletedImage] = await db
        .delete(productImage)
        .where(eq(productImage.id, id))
        .returning();

      return deletedImage;
    }),
  getMany: baseProcedure
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
