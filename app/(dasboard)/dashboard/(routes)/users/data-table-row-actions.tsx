"use client";

import { useTransition } from "react";
import { deleteUser } from "@/actions/user";
import { z } from "zod";
import { UserSchema } from "@/schemas";

import { Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { ShieldQuestion } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

const roles = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "User",
    value: "USER",
  },
];

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const task = UserSchema.parse(row.original);

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
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn(
              task.name === user?.name && "opacity-50 cursor-not-allowed",
              "p-2"
            )}
            disabled={task.name === user?.name}
          >
            <div
              className="flex justify-start items-center gap-x-2  group"
              //onClick={() => onOpen("deleteCollection", { collection })}
            >
              <ShieldQuestion className="size-5" />
              <span>Role</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.role}>
              {roles.map((role) => (
                <DropdownMenuRadioItem key={role.value} value={role.value}>
                  {role.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2" disabled={task.name === user?.name}>
          <div
            className="flex justify-start items-center gap-x-2  group"
            //onClick={() => onOpen("deleteCollection", { collection })}
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
}
