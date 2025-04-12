"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const CategoryNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-x-6">
      <Link
        href="/"
        className={cn(pathname === "/" && "underline underline-offset-4")}
      >
        All
      </Link>
      <Link
        href="/servers"
        className={cn(
          pathname === "/servers" && "underline underline-offset-4"
        )}
      >
        Servers
      </Link>
      <Link
        href="/storages"
        className={cn(
          pathname === "/storages" && "underline underline-offset-4"
        )}
      >
        Storages
      </Link>
      <Link
        href="/networking"
        className={cn(
          pathname === "/networking" && "underline underline-offset-4"
        )}
      >
        Networking
      </Link>
    </div>
  );
};
