"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const links = [
  { name: "Servers", path: "/servers" },
  { name: "Storage", path: "/storage" },
  { name: "Networking", path: "/networking" },
];

export const NavLinks = () => {
  const params = useParams<{ category: string; manufacturer: string }>();

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
            href={link.path + "/" + params.manufacturer}
            className={
              link.path === `/${params.category}`
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
