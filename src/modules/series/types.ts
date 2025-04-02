import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type SeriesGetManyOutput =
  inferRouterOutputs<AppRouter>["series"]["getMany"];
