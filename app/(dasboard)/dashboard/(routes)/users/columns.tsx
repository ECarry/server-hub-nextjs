"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
