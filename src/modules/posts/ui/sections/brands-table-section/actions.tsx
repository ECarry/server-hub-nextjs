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
import { brandsSelectSchema } from "@/db/schema";
import { z } from "zod";
import { useState } from "react";
import { BrandUpdateModal } from "../../components/brand-update-modal";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

export const Actions = ({
  row,
}: {
  row: Row<z.infer<typeof brandsSelectSchema>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);

  // Get all brands data
  const { data: allBrands } = trpc.brands.getMany.useQuery(undefined, {
    enabled: !!brandId && isOpen,
  });
  
  // Find the current brand by id when the modal is open
  const currentBrand = allBrands?.find(brand => brand.id === brandId);

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
          <DropdownMenuItem onClick={() => {
            setBrandId(row.original.id);
            setIsOpen(true);
          }}>
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
      {currentBrand && (
        <BrandUpdateModal
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setBrandId(null); // Clear brandId when modal closes
          }}
          brand={currentBrand}
        />
      )}
    </>
  );
};
