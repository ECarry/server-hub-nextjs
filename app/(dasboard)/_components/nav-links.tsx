"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/dashboard/products" },
  { name: "Posts", path: "/dashboard/posts" },
  { name: "Users", path: "/dashboard/users" },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Button
          key={link.path}
          variant="link"
          size="lg"
          className="px-0"
          asChild
        >
          <Link
            href={link.path}
            className={
              pathname === link.path
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            {link.name}
          </Link>
        </Button>
      ))}
    </>
  );
};
