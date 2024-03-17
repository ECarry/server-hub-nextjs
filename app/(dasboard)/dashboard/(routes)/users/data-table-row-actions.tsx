"use client";

import { UserSchema } from "@/schemas";
import { cn } from "@/lib/utils";

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
import { Icons } from "@/components/icons";
import { ShieldQuestion } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/hooks/use-modal-store";
import { useTransition } from "react";
import { changeRole } from "@/actions/user";
import { toast } from "@/components/ui/use-toast";

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
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const { onOpen } = useModal();

  const task = UserSchema.parse(row.original);

  const onRoleChange = (values: { id: string; role: "ADMIN" | "USER" }) => {
    startTransition(() => {
      changeRole(values).then((data) => {
        if (data.success) {
          toast({
            title: "Role change successfully",
          });
        } else if (data.error) {
          toast({
            variant: "destructive",
            title: data.error,
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
                <DropdownMenuRadioItem
                  key={role.value}
                  value={role.value}
                  className="cursor-pointer"
                  disabled={role.value === task.role}
                  onClick={() =>
                    onRoleChange({ id: task.id, role: role.value as any })
                  }
                >
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
            onClick={() => onOpen("deleteUser", { user: task })}
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
