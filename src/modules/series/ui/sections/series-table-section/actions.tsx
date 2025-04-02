import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { SeriesUpdateModal } from "../../components/series-update-modal";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { SeriesGetManyOutput } from "@/modules/series/types";

export const Actions = ({ row }: { row: Row<SeriesGetManyOutput[number]> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seriesId, setSeriesId] = useState<string | null>(null);

  // Get all series data
  const { data: allSeries } = trpc.series.getMany.useQuery(undefined, {
    enabled: !!seriesId && isOpen,
  });

  // Find the current series by id when the modal is open
  const currentSeries = allSeries?.find((series) => series.id === seriesId);

  const util = trpc.useUtils();
  const remove = trpc.series.remove.useMutation({
    onSuccess: () => {
      toast.success("Series deleted successfully");
      util.series.getMany.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete series");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setSeriesId(row.original.id);
              setIsOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => remove.mutate({ id: row.original.id })}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {currentSeries && (
        <SeriesUpdateModal
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setSeriesId(null); // Clear seriesId when modal closes
          }}
          series={currentSeries}
        />
      )}
    </>
  );
};
