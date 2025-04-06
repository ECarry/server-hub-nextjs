import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type ProductImagesGetManyOutput =
  inferRouterOutputs<AppRouter>["productImages"]["getMany"];
