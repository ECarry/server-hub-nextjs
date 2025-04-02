"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { SeriesCreateModal } from "../../components/series-create-modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SeriesTableSection = () => {
  return (
    <Suspense fallback={<SeriesTableSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <SeriesTableSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const SeriesTableSectionSkeleton = () => {
  return (
    <div className="w-full flex-col justify-start space-y-6">
      <div className="flex items-center px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Series</h1>
        <div className="flex ml-auto items-center gap-2">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 mt-4">
        <div className="overflow-hidden rounded-lg border">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-8 w-24" />
                  </TableHead>
                ))}
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

const SeriesTableSectionSuspense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = trpc.series.getMany.useSuspenseQuery();

  return (
    <div className="w-full flex-col justify-start space-y-6">
      <SeriesCreateModal open={isOpen} onOpenChange={setIsOpen} />
      <div className="flex items-center px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Series</h1>
        <div className="flex ml-auto items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span className="hidden lg:inline">Add Series</span>
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
