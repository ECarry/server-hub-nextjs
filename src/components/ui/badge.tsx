import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        green:
          "border-transparent bg-lime-400 text-white [a&]:hover:bg-lime-400/90 focus-visible:ring-lime-400/20 dark:focus-visible:ring-lime-400/40 dark:bg-lime-400/70",
        draft:
          "border-transparent bg-zinc-100 text-zinc-600 [a&]:hover:bg-zinc-200/90 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/80",
        private:
          "border-transparent bg-purple-100 text-purple-700 [a&]:hover:bg-purple-100/90 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/20",
        progress:
          "border-transparent bg-blue-100 text-blue-700 [a&]:hover:bg-blue-100/90 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/20",
        public:
          "border-transparent bg-green-100 text-green-500 [a&]:hover:bg-green-100/90 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
