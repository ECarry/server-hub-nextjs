"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Product } from "@prisma/client";

import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const label = row.original.status;

      return (
        <>
          {label === "ACTIVE" ? (
            <Badge variant="outline">{label}</Badge>
          ) : (
            <Badge variant="secondary">{label}</Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "createTime",
    header: "Created at",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
