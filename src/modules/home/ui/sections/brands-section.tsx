"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import { Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  brandId?: string;
}

export const BrandsSection = ({ brandId }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-[100px] h-9 md:h-11 rounded-full" />
          <FilterCarousel isLoading data={[]} onSelect={() => {}} />
        </div>
      }
    >
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <BrandsSectionSuspense brandId={brandId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const BrandsSectionSuspense = ({ brandId }: Props) => {
  const router = useRouter();
  const [brands] = trpc.brands.getMany.useSuspenseQuery();

  const data = brands.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("brandId", value);
    } else {
      url.searchParams.delete("brandId");
    }

    router.push(url.toString(), { scroll: false });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        size="lg"
        variant="secondary"
        onClick={() => {}}
        className="max-md:hidden rounded-full"
        asChild
      >
        <div className="flex items-center gap-x-2">
          <Settings2 className="size-4" />
          <span>Filters</span>
        </div>
      </Button>
      <FilterCarousel value={brandId} data={data} onSelect={onSelect} />
    </div>
  );
};
