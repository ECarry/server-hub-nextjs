import { db } from "@/db";
import { adminProcedure, baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {
  brands,
  productSeries,
  seriesInsertSchema,
  seriesUpdateSchema,
} from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const seriesRouter = createTRPCRouter({
  create: adminProcedure
    .input(seriesInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const [existingSeries] = await db
        .select()
        .from(productSeries)
        .where(eq(productSeries.name, input.name))
        .limit(1);

      if (existingSeries) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Series already exists",
        });
      }

      const [newSeries] = await db
        .insert(productSeries)
        .values(input)
        .returning();

      return newSeries;
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
  getMany: baseProcedure.query(async () => {
    const data = await db
      .select({
        id: productSeries.id,
        name: productSeries.name,
        brandId: productSeries.brandId,
        brandName: brands.name,
        brandLogoKey: brands.logoImageKey,
      })
      .from(productSeries)
      .innerJoin(brands, eq(brands.id, productSeries.brandId))
      .orderBy(desc(productSeries.updatedAt));

    return data;
  }),
});
