"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFileUrl } from "@/modules/filesUpload/lib/utils";
import { trpc } from "@/trpc/client";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  productId: string;
}

export const ProductSection = ({ productId }: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductSectionSuspense productId={productId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProductSectionSuspense = ({ productId }: Props) => {
  const [data] = trpc.products.getOne.useSuspenseQuery({ id: productId });

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h1 className="text-3xl">
              {data.brand + " " + data.series + " " + data.model}
            </h1>
            <Badge variant="secondary">{data.visibility}</Badge>
          </div>
          <div className="flex items-center gap-x-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Created:</span>{" "}
              {format(new Date(data.createdAt), "d MMM, yyyy")}
            </p>
            <p className="text-muted-foreground text-sm">・</p>
            <p className="text-sm">
              <span className="text-muted-foreground">Last Updated:</span>{" "}
              {formatDistanceToNow(data.updatedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <Button variant="destructive">Delete</Button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          {/* IMAGE */}
          <div>
            <Image
              src={getFileUrl(data.imageKey || "")}
              alt={data.model}
              width={200}
              height={200}
              className="object-contain rounded-lg"
            />
          </div>

          {/* DESCRIPTION */}
          <div></div>
        </div>
      </div>
    </div>
  );
};
