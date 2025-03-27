"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { BrandCreateModal } from "../components/brand-create-modal";
import { BrandsSection } from "../sections/brands-section";

export const BrandsView = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <BrandCreateModal open={open} onOpenChange={setOpen} />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Brands</h1>
          <p className="text-xs text-muted-foreground">All brands</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <BrandsSection />
    </div>
  );
};
