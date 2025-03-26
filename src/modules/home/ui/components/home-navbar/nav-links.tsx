"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const menus = [{ name: "Home", link: "/" }];

export const NavLinks = () => {
  return (
    <>
      {menus.map((menu) => (
        <Button
          key={menu.link}
          variant="link"
          size="lg"
          className="px-0"
          asChild
        >
          <Link
            href={menu.link}
            className={
              menu.link === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            {menu.name}
          </Link>
        </Button>
      ))}
    </>
  );
};
