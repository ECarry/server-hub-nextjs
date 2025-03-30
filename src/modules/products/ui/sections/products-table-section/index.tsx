"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { ProductCreateModal } from "../../components/product-create-modal";

export const ProductsTableSection = () => {
  return (
    <Suspense fallback={<ProductsTableSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ProductsTableSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProductsTableSectionSkeleton = () => {
  return <p>Loading...</p>;
};

const ProductsTableSectionSuspense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = trpc.products.getMany.useSuspenseInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="w-full flex-col justify-start space-y-6">
      <ProductCreateModal open={isOpen} onOpenChange={setIsOpen} />
      <div className="flex items-center px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex ml-auto items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span className="hidden lg:inline">Add Product</span>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 mt-4">
        <div className="overflow-hidden rounded-lg border">
          {JSON.stringify(data, null, 2)}
        </div>
      </div>
    </div>
  );
};
