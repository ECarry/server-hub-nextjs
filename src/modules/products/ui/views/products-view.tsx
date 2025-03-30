"use client";

import { useState } from "react";
import { ProductCreateModal } from "../components/product-create-modal";
import { ProductsTableSection } from "../sections/products-table-section";

export const ProductsView = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <ProductCreateModal open={open} onOpenChange={setOpen} />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <ProductsTableSection />
        </div>
      </div>
    </div>
  );
};
