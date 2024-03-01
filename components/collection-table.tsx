"use client";

import { useModal } from "@/hooks/use-modal-store";
import timeAgo from "@/lib/time-ago";
import { useRouter } from "next/navigation";
import { Collection } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

interface CollectionTableProps {
  collections: Collection[];
}

export function CollectionTable({ collections }: CollectionTableProps) {
  const { onOpen } = useModal();
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/collections/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-x-4 items-center">
        <div className="grid grow">
          <div className="relative flex flex-col items-stretch">
            <Input
              className="rounded-full h-11 px-4 py-3 pl-9 rtl:pr-9 outline-none ring-inset focus:bg-primary-foreground focus:ring-2 focus:ring-primary-foreground disabled:cursor-not-allowed disabled:bg-primary-foreground"
              placeholder="Find collections"
            />
            <div className="pointer-events-none absolute flex h-full items-center px-3">
              <Search size={16} />
            </div>
          </div>
        </div>
        {/* <span className="hidden w-[1px] bg-gray-200 md:block"></span> */}
        <Separator orientation="vertical" className="hidden md:block h-10" />
        <div>
          <Button
            className="px-4 flex gap-2 items-center"
            onClick={() => onOpen("createCollection")}
          >
            <Plus size={16} />
            New Collection
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto"> Collection name</TableHead>
            <TableHead className="text-center w-[280px]">
              Last modified
            </TableHead>
            <TableHead className="text-center w-[280px]"> Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.map((collection) => (
            <TableRow
              key={collection.id}
              className="cursor-pointer"
              onClick={() => handleClick(collection.id)}
            >
              <TableCell className="font-medium">{collection.name}</TableCell>
              <TableCell className="text-center">
                {timeAgo(collection.updateTime)}
              </TableCell>
              <TableCell className="text-center">
                {timeAgo(collection.createTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
