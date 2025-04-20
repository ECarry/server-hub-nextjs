import { z } from "zod";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { saveProduct, user } from "@/db/schema";
import { eq, getTableColumns, isNotNull } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const usersRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { productId } = input;
      const { id: userId } = ctx.user;

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const savedProducts = db
        .$with("saved_products")
        .as(
          db
            .select()
            .from(saveProduct)
            .where(eq(saveProduct.productId, productId))
        );

      const [existingUser] = await db
        .with(savedProducts)
        .select({
          ...getTableColumns(user),
          savedProductCount: db.$count(
            savedProducts,
            eq(savedProducts.userId, user.id)
          ),
          productSaved: isNotNull(savedProducts.productId).mapWith(Boolean),
        })
        .from(user)
        .leftJoin(savedProducts, eq(savedProducts.userId, user.id))
        .where(eq(user.id, userId));

      if (!existingUser) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return existingUser;
    }),
});
