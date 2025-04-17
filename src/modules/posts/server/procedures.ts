import { db } from "@/db";
import { adminProcedure, baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { posts, postsInsertSchema, postsUpdateSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const postsRouter = createTRPCRouter({
  create: adminProcedure
    .input(postsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.user;

      if (role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const [existingPost] = await db
        .select()
        .from(posts)
        .where(eq(posts.title, input.title))
        .limit(1);

      if (existingPost) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post already exists",
        });
      }

      const [newPost] = await db.insert(posts).values(input).returning();

      return newPost;
    }),
  update: adminProcedure
    .input(postsUpdateSchema)
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

      const [updatedPost] = await db
        .update(posts)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id))
        .returning();

      if (!updatedPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return updatedPost;
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

      const [deletedPost] = await db
        .delete(posts)
        .where(eq(posts.id, id))
        .returning();

      if (!deletedPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return deletedPost;
    }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(posts);

    return data;
  }),
});
