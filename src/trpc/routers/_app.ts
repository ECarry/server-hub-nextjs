import { createTRPCRouter } from "@/trpc/init";
import { brandsRouter } from "@/modules/brands/server/procedures";
import { filesUploadRouter } from "@/modules/filesUpload/server/procedures";

export const appRouter = createTRPCRouter({
  brands: brandsRouter,
  filesUpload: filesUploadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
