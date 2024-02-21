"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const links = [
  { name: "Server", path: "/server" },
  { name: "Storage", path: "/storage" },
  { name: "Network", path: "/network" },
];

export const NavLinks = () => {
  const params = useParams<{ platform: string; feature: string }>();

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
            href={link.path + "/" + params.feature}
            className={
              link.path === `/${params.platform}`
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
