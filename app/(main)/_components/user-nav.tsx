import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/auth";
import { LucideUserRound } from "lucide-react";
import Link from "next/link";

export async function UserNav() {
  const user = await currentUser()

  return (
    <>
      {
        user
        ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.image || ''} alt="avatar" />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
                <form action={async() => {
                  'use server'

                  await signOut()
                }}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full h-full cursor-pointer">
                      Sign out
                    </button>
                  </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
          </DropdownMenu>
        )
        : (
          <Link href='/auth/login' className="flex items-center gap-2">
            <Button variant="outline" >
              Login
            </Button>
          </Link>
        )
      }
    </>
  )
}
