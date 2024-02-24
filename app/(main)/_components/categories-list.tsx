"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LinksProps {
  name: string;
  path: string;
  badge?: string;
}

const links: LinksProps[] = [
  { name: "DELL", path: "/dell" },
  { name: "HP", path: "/hp" },
  { name: "IBM", path: "/ibm" },
  { name: "HUAWEI", path: "/huawei", badge: "PRO" },
];

const CategoriesList = () => {
  const pathname = usePathname();
  const params = useParams<{ platform: string }>();

  return (
    <div className="flex gap-x-6 scrollbar-none overflow-x-auto -my-1 py-1">
      {links.map((link) => (
        <Link
          key={link.path}
          href={`/browse/${params.platform + link.path}`}
          className={cn(
            "flex items-center gap-x-2 whitespace-nowrap py-1 border-b-2 transition-colors ease-out focus-visible:ring-4 focus-visible:ring-ring",
            pathname === `/browse/${params.platform + link.path}`
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-primary"
          )}
        >
          <span>{link.name}</span>
          {link.badge ? (
            <Badge className="px-2 font-medium uppercase border-none">
              {link.badge}
            </Badge>
          ) : (
            ""
          )}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
