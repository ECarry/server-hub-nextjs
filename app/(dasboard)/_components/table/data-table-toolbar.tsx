import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Search } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder: string;
  showCreateButton: boolean;
}

export default function DataTableToolbar<TData>({
  table,
  searchPlaceholder,
  showCreateButton,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={cn("flex gap-x-0 items-center", showCreateButton && "gap-x-4")}
    >
      <div className="grid grow">
        <div className="relative flex flex-col items-stretch">
          <Input
            className="rounded-full h-11 px-4 py-3 pl-9 rtl:pr-9 outline-none ring-inset focus:bg-primary-foreground focus:ring-2 focus:ring-primary-foreground disabled:cursor-not-allowed disabled:bg-primary-foreground"
            placeholder={`Find ${searchPlaceholder}`}
            value={
              (table
                .getColumn(searchPlaceholder)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchPlaceholder)
                ?.setFilterValue(event.target.value)
            }
          />
          <div className="pointer-events-none absolute flex h-full items-center px-3">
            <Search size={16} />
          </div>
        </div>
      </div>
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
      <Separator
        orientation="vertical"
        className={cn(showCreateButton && "hidden md:block h-10 bg-gray-200")}
      />
      {showCreateButton && (
        <Button
          className="hidden md:flex px-4 gap-2 items-center"
          //onClick={() => onOpen("createCollection")}
        >
          <Plus size={16} />
          New Product
        </Button>
      )}
      {showCreateButton && (
        <div className="md:hidden">
          <Button
            className="fixed bottom-5 left-[50%] translate-x-[-50%] px-4 flex gap-2 items-center"
            //onClick={() => onOpen("createCollection")}
          >
            <Plus size={16} />
            New Product
          </Button>
        </div>
      )}
    </div>
  );
}
