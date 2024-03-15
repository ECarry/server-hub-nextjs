"use client";

import { useTransition } from "react";
import { deleteUser } from "@/actions/user";
import { z } from "zod";
import { UserSchema } from "@/schemas";
import { User } from "@prisma/client";

import { Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelte = (values: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      deleteUser(values).then((data) => {
        if (data.success) {
          toast({
            title: "User deleted",
            description: `User ${values.name} has been deleted`,
          });
        } else if (data.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: data.error,
          });
        }
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {isPending ? (
          <DropdownMenuItem disabled>Deleting...</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleDelte(row.original as User)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
