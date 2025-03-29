"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { BrandCreateModal } from "../../components/brand-create-modal";

export const BrandsTableSection = () => {
  return (
    <Suspense fallback={<BrandsTableSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <BrandsTableSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const BrandsTableSectionSkeleton = () => {
  return <div className="h-96 animate-pulse bg-muted" />;
};

const BrandsTableSectionSuspense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = trpc.brands.getMany.useSuspenseQuery();

  return (
    <div className="w-full flex-col justify-start space-y-6">
      <BrandCreateModal open={isOpen} onOpenChange={setIsOpen} />
      <div className="flex items-center px-4 lg:px-6">
        <div className="flex ml-auto items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span className="hidden lg:inline">Add Brand</span>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 mt-4">
        <div className="overflow-hidden rounded-lg border">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};
