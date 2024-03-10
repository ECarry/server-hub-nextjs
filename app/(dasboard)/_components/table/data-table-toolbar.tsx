import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Search } from "lucide-react";

const DataTableToolbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="flex gap-x-4 items-center">
      <div className="grid grow">
        <div className="relative flex flex-col items-stretch">
          <Input
            className="rounded-full h-11 px-4 py-3 pl-9 rtl:pr-9 outline-none ring-inset focus:bg-primary-foreground focus:ring-2 focus:ring-primary-foreground disabled:cursor-not-allowed disabled:bg-primary-foreground"
            placeholder="Find products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="pointer-events-none absolute flex h-full items-center px-3">
            <Search size={16} />
          </div>
        </div>
      </div>
      {/* <span className="hidden w-[1px] bg-gray-200 md:block"></span> */}
      <Separator orientation="vertical" className="hidden md:block h-10" />
      <Button
        className="hidden md:flex px-4 gap-2 items-center"
        //onClick={() => onOpen("createCollection")}
      >
        <Plus size={16} />
        New Product
      </Button>
      <div className="md:hidden">
        <Button
          className="fixed bottom-5 left-[50%] translate-x-[-50%] px-4 flex gap-2 items-center"
          //onClick={() => onOpen("createCollection")}
        >
          <Plus size={16} />
          New Product
        </Button>
      </div>
    </div>
  );
};

export default DataTableToolbar;
