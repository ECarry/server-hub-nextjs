/* eslint-disable @next/next/no-img-element */
import { Checkbox } from "@/components/ui/checkbox";
import { getFileUrl } from "@/modules/filesUpload/lib/utils";
import { ProductsGetManyOutput } from "@/modules/products/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ProductsGetManyOutput[number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original.id}`}
        className="flex items-center gap-2 group"
      >
        <img
          src={getFileUrl(row.original.brandLogoKey || "")}
          alt={row.original.brand}
          className="size-6 object-contain"
        />
        <p className="ml-2 group-hover:underline underline-offset-4">
          {row.original.brand}
        </p>
      </Link>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableHiding: false,
  },
  {
    accessorKey: "series",
    header: "Series",
    enableHiding: false,
  },
  {
    accessorKey: "model",
    header: "Model",
    enableHiding: false,
  },
  {
    accessorKey: "generation",
    header: "Generation",
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="text-muted-foreground px-1.5 truncate max-w-64">
        {row.original.description}
      </p>
    ),
    enableHiding: false,
  },
];
