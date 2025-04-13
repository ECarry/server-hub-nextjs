"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-x-6">
          <Skeleton className="w-[100px] h-8 md:h-11" />
          <Skeleton className="w-[100px] h-8 md:h-11" />
          <Skeleton className="w-[100px] h-8 md:h-11" />
          <Skeleton className="w-[100px] h-8 md:h-11" />
        </div>
      }
    >
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: Props) => {
  const router = useRouter();
  const [categories] = trpc.productCategories.getMany.useSuspenseQuery();

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return (
    <div className="flex items-center gap-x-6">
      <Button
        variant="link"
        className={cn(
          "px-1 text-base cursor-pointer text-muted-foreground underline-offset-8",
          categoryId === undefined && "underline text-primary"
        )}
        onClick={() => onSelect(null)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="link"
          className={cn(
            "px-1 text-base capitalize cursor-pointer text-muted-foreground underline-offset-8",
            categoryId === category.id && "underline text-primary"
          )}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
