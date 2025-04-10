"use client";

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductCard } from "../components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductsSection = () => {
  return (
    <Suspense fallback={<ProductLoadingSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProductLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 content-start gap-x-6 gap-y-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-[283px] w-full" />
      ))}
    </div>
  );
};

export const ProductsSectionSuspense = () => {
  const [data] = trpc.home.getManyProducts.useSuspenseInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 content-start gap-x-6 gap-y-8">
      {data.pages
        .flatMap((page) => page.items)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};
