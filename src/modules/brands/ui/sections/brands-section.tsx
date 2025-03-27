"use client";

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const BrandsSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <BrandsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const BrandsSectionSuspense = () => {
  const [data] = trpc.brands.getMany.useSuspenseQuery();

  return (
    <div className="flex flex-col gap-y-4">{JSON.stringify(data, null, 2)}</div>
  );
};
