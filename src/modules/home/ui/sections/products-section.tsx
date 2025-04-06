"use client";

/* eslint-disable @next/next/no-img-element */
import { getFileUrl } from "@/modules/filesUpload/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const ProductsSection = () => {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
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
    <div className="p-4">
      {data.pages
        .flatMap((page) => page.items)
        .map((product) => (
          <div key={product.id}>
            <img
              src={getFileUrl(product.brandLogoKey ?? "")}
              alt={product.brand}
            />
            <h3>{product.model}</h3>
            <p>{product.description}</p>
          </div>
        ))}
    </div>
  );
};
