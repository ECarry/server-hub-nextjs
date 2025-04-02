"use client";

import { useState } from "react";
import { SeriesCreateModal } from "../components/series-create-modal";
import { SeriesTableSection } from "../sections/series-table-section";

export const SeriesView = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <SeriesCreateModal open={open} onOpenChange={setOpen} />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SeriesTableSection />
        </div>
      </div>
    </div>
  );
};
