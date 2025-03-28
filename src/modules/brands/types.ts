import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type BrandsGetManyOutput =
  inferRouterOutputs<AppRouter>["brands"]["getMany"];
