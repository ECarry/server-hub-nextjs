/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { getFileUrl } from "@/modules/filesUpload/lib/utils";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  productId: string;
}

export const ProductSection = ({ productId }: Props) => {
  return (
    <Suspense fallback={<ProductLoadingSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductsSectionSuspense productId={productId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProductLoadingSkeleton = () => {
  return <div>Loading...</div>;
};

const ProductsSectionSuspense = ({ productId }: Props) => {
  const [data] = trpc.product.getOne.useSuspenseQuery({
    id: productId,
  });

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-y-6">
        {/* Logo */}
        <div className="size-16 md:size-24 rounded-3xl overflow-hidden border p-2 flex items-center justify-center">
          <img
            src={getFileUrl(data?.brandLogoKey || "")}
            alt="logo"
            className="object-contain"
          />
        </div>
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <div className="text-3xl md:text-4xl font-bold">{data?.brand} — </div>
          <div className="text-3xl md:text-4xl font-bold">
            {data?.brandFullName} {data?.series} {data?.model}
          </div>
        </div>
        {/* Pro */}
        <div className="w-full h-11 flex items-center bg-muted rounded-2xl px-4 gap-2">
          <Badge>PRO</Badge>
          <span className="text-sm font-semibold">
            Get full access to — Upgrade to Pro
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-muted-foreground text-sm">Category</h3>
        <Link
          href=""
          className="font-semibold hover:underline underline-offset-2 capitalize"
        >
          {data?.category}
        </Link>
      </div>
    </div>
  );
};
