"use client";

import { signOut, useSession } from "@/modules/auth/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthButton = () => {
  const router = useRouter();
  const [isSignOut, setIsSignOut] = useState<boolean>(false);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="hidden lg:flex flex-row items-center gap-3">
        <Button variant="ghost" size="lg" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button variant="default" size="lg" asChild>
          <Link href="/login">Create free account</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 hover:opacity-80 transition-opacity cursor-pointer">
          <AvatarImage
            src={session.user.image || "#"}
            alt="Avatar"
            className="object-cover"
          />
          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60  backdrop-blur p-[8px]">
        <div className="flex flex-col pt-2 px-2.5">
          <h1 className="truncate ">{session.user.name}</h1>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <DropdownMenuItem asChild>
            <button>
              <span className="w-full">
                <div className="flex items-center gap-2">
                  <Bookmark size={20} />
                  Saved
                </div>
              </span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              className="w-full"
              onClick={async () => {
                setIsSignOut(true);
                await signOut({
                  fetchOptions: {
                    onSuccess() {
                      router.push("/");
                    },
                  },
                });
                setIsSignOut(false);
              }}
              disabled={isSignOut}
            >
              <span className="w-full">
                {isSignOut ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <LogOut size={20} />
                    Sign Out
                  </div>
                )}
              </span>
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
