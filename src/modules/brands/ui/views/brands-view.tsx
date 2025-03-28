"use client";

import { useState } from "react";
import { BrandsTableSection } from "../sections/brands-table-section";
import { BrandCreateModal } from "../components/brand-create-modal";

export const BrandsView = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <BrandCreateModal open={open} onOpenChange={setOpen} />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <BrandsTableSection onOpenCreateModal={() => setOpen(true)} />
        </div>
      </div>
    </div>
  );
};
