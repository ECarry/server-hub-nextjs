"use client";

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductCard } from "../components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  brandId?: string;
  categoryId?: string;
}

export const ProductsSection = ({ brandId, categoryId }: Props) => {
  return (
    <Suspense fallback={<ProductLoadingSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductsSectionSuspense brandId={brandId} categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProductLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 content-start gap-x-6 gap-y-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-[283px] w-full" />
      ))}
    </div>
  );
};

export const ProductsSectionSuspense = ({ brandId, categoryId }: Props) => {
  const [data] = trpc.home.getManyProducts.useSuspenseInfiniteQuery(
    {
      limit: 10,
      brandId,
      categoryId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 content-start gap-x-6 gap-y-10">
      {data.pages
        .flatMap((page) => page.items)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};
