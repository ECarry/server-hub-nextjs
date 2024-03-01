"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useModal } from "@/hooks/use-modal-store";
import { Collection } from "@prisma/client";

interface CollectionActionProps {
  collection: Collection;
}

const CollectionAction = ({ collection }: CollectionActionProps) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full z-50">
          <Icons.options className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <div
            className="flex justify-start items-center gap-x-2"
            onClick={() => onOpen("editCollection", { collection })}
          >
            <Icons.pen className="size-5" />
            <span>Edit collection</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div
            className="flex justify-start items-center gap-x-2  group"
            onClick={() => onOpen("deleteCollection", { collection })}
          >
            <Icons.trash className="size-5 text-red-500 group-hover:text-red-500" />
            <span className="text-red-500 group-hover:text-red-500">
              Delete
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionAction;
