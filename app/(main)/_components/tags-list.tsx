"use client";

import { CarouselButtonsTags } from "@/components/carousel-buttons-tags";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function TagsList() {
  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant="secondary"
        onClick={() => {}}
        className="max-md:hidden rounded-full"
        asChild
      >
        <div className="flex items-center gap-x-2">
          <Icons.settings2 className="size-4" />
          <span>Filters</span>
        </div>
      </Button>

      <Separator orientation="vertical" className="max-md:hidden h-8" />
      <div className="flex-grow overflow-hidden">
        <CarouselButtonsTags />
      </div>
    </div>
  );
}
