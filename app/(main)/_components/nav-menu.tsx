import Link from "next/link";

import { Icons } from "@/components/icons";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/auth";
import { signOut } from "@/auth";
import Image from "next/image";

export async function NavMenu() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-8 md:w-16 flex items-center gap-2 cursor-pointer rounded-full">
          {user ? (
            <>
              <Image
                src={user.image || ""}
                alt="avatar"
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
              <Icons.menu className="size-4" />
            </>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-11 px-0 cursor-pointer data-[state=open]:bg-background "
            >
              <Icons.menu className="size-4" />
            </Button>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {user && (
          <DropdownMenuLabel className="font-normal select-none">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium leading-none">{user.name}</h1>
              <p className="text-sm leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="flex justify-start items-center gap-x-2" href="">
            <Icons.bookmark className="size-5" />
            <span>Collections</span>
          </Link>
        </DropdownMenuItem>

        {user && (
          <DropdownMenuItem asChild>
            <Link className="flex justify-start items-center gap-x-2" href="">
              <Icons.settings className="size-5" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className="flex justify-between items-center"
            href={""}
            target="_blank"
          >
            <span>Github</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
        {user && (
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <DropdownMenuItem asChild>
              <button type="submit" className="w-full h-full cursor-pointer">
                Log out
              </button>
            </DropdownMenuItem>
          </form>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
