import { db } from "@/db";
import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {
  productSeries,
  documentsInsertSchema,
  seriesUpdateSchema,
  documents,
} from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const documentationRouter = createTRPCRouter({
  create: adminProcedure
    .input(documentsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const [newDocument] = await db
        .insert(documents)
        .values(input)
        .returning();

      return newDocument;
    }),
  update: adminProcedure
    .input(seriesUpdateSchema)
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

      const [updatedSeries] = await db
        .update(productSeries)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(productSeries.id, id))
        .returning();

      return updatedSeries;
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

      const [deletedSeries] = await db
        .delete(productSeries)
        .where(eq(productSeries.id, id))
        .returning();

      return deletedSeries;
    }),
  getMany: adminProcedure
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
        .from(documents)
        .where(eq(documents.productId, productId))
        .orderBy(desc(documents.updatedAt));

      return data;
    }),
});
