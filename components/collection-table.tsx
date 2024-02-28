import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@prisma/client";

interface CollectionTableProps {
  collections: Collection[];
}

export function CollectionTable({ collections }: CollectionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full"> Collection name</TableHead>
          <TableHead className="text-left w-[280px]"> Last modified</TableHead>
          <TableHead className="text-left w-[280px]"> Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {collections.map((collection) => (
          <TableRow key={collection.id}>
            <TableCell className="font-medium">{collection.name}</TableCell>
            <TableCell className="text-right">
              {collection.updateTime.toDateString()}
            </TableCell>
            <TableCell className="text-right">
              {collection.createTime.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
