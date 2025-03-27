import { db } from "@/db";
import { adminProcedure, baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { brands, brandsInsertSchema, brandsUpdateSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const brandsRouter = createTRPCRouter({
  create: adminProcedure
    .input(brandsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const [existingBrand] = await db
        .select()
        .from(brands)
        .where(eq(brands.name, input.name))
        .limit(1);

      if (existingBrand) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Brand already exists",
        });
      }

      const [newBrand] = await db.insert(brands).values(input).returning();

      return newBrand;
    }),
  update: adminProcedure
    .input(brandsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, brandLogo } = input;
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

      const [updatedBrand] = await db
        .update(brands)
        .set({
          name,
          description,
          brandLogo,
        })
        .where(eq(brands.id, id))
        .returning();

      return updatedBrand;
    }),
  delete: adminProcedure
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

      const [deletedBrand] = await db
        .delete(brands)
        .where(eq(brands.id, id))
        .returning();

      return deletedBrand;
    }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(brands);

    return data;
  }),
});
