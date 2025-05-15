"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { BrandCreateModal } from "../../components/brand-create-modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  return (
    <div className="w-full flex-col justify-start space-y-6">
      <div className="flex items-center px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Brands</h1>
        <div className="flex ml-auto items-center gap-2">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 mt-4">
        <div className="overflow-hidden rounded-lg border">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
  <TableRow>
    {Array.from({ length: 5 }).map((_, index) => (
      <TableHead key={index}>
        <Skeleton className="h-8 w-24" />
      </TableHead>
    ))}
  </TableRow>
</TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 5 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-8 w-24" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandsTableSectionSuspense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = trpc.brands.getMany.useSuspenseQuery();

  return (
    <div className="w-full flex-col justify-start space-y-6">
      <BrandCreateModal open={isOpen} onOpenChange={setIsOpen} />
      <div className="flex items-center px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Brands</h1>
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
