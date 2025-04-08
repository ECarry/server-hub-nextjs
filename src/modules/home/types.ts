import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type ProductsGetManyOutput =
  inferRouterOutputs<AppRouter>["home"]["getManyProducts"];

export type Product = ProductsGetManyOutput["items"][number];
