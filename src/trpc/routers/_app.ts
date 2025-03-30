import { createTRPCRouter } from "@/trpc/init";
import { brandsRouter } from "@/modules/brands/server/procedures";
import { filesUploadRouter } from "@/modules/filesUpload/server/procedures";
import { productCategoriesRouter } from "@/modules/product-categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";

export const appRouter = createTRPCRouter({
  brands: brandsRouter,
  filesUpload: filesUploadRouter,
  products: productsRouter,
  productCategories: productCategoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
