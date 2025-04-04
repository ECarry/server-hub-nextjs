import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { productsSelectSchema } from "@/db/schema";
import { z } from "zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

export const Actions = ({
  row,
}: {
  row: Row<z.infer<typeof productsSelectSchema>>;
}) => {
  const util = trpc.useUtils();
  const remove = trpc.brands.remove.useMutation({
    onSuccess: () => {
      toast.success("Brand deleted successfully");
      util.brands.getMany.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete brand");
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
            variant="destructive"
            onClick={() => remove.mutate({ id: row.original.id })}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
